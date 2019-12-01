import S3 from 'aws-sdk/clients/s3';
import { File } from '../models/file.model';
import { getRepository } from 'typeorm';
import fs from 'fs';
import fetch from 'node-fetch';
import { NotFoundError } from '../utils/error-handler';
import uuid from 'uuid';
import env from '../configs/env';

const s3 = new S3({
  accessKeyId: env.aws.credentials.accessKey,
  secretAccessKey: env.aws.credentials.secretAccessKey
});

export async function getFile(guid: string): Promise<File> {
  const file = await getRepository(File).findOne({ where: { guid } });

  if (!file) {
    throw new NotFoundError(`Could not find file ${guid}.`);
  }

  return file;
}

async function getFileByGuidOrEntity(file: string | File): Promise<File> {
  if (typeof file !== 'string') {
    return file;
  }

  return getFile(file);
}

export async function getFileLink(file: string | File): Promise<string> {
  const found = await getFileByGuidOrEntity(file);
  return env.aws.s3.bucket.userStorageUrl + '/' + found.path;
}

export async function getServedFileLink(file: string | File): Promise<string> {
  const guid = typeof file === 'string' ? file : file.guid;
  return '/file/' + guid;
}

export async function uploadFile(filePath: string, remotePath: string): Promise<File> {
  const fileExists = (f: string) => new Promise(resolve => fs.exists(f, resolve));

  let stream: any;

  if (!(await fileExists(filePath))) {
    stream = await fetch(filePath).then(res => res.buffer());
  } else {
    stream = fs.createReadStream(filePath);
  }

  const file: File = {
    guid: uuid.v4(),
    path: encodeURIComponent(remotePath)
  };

  const [ savedFile ] = await Promise.all([
    getRepository(File).save(file),
    s3.putObject({ Bucket: env.aws.s3.bucket.name, Key: remotePath, Body: stream }).promise()
  ]);

  
  return savedFile;
}

export async function deleteFile(file: string | File): Promise<void> {
  const found = await getFileByGuidOrEntity(file);
  await Promise.all([
    s3.deleteObject({ Bucket: env.aws.s3.bucket.name, Key: found.path }).promise(),
    getRepository(File).delete(found)
  ]);
}