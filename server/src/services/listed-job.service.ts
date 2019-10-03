import { ListedJob } from '../models/listed-job.model';
import { getRepository } from 'typeorm';
import { BadRequestError } from '../utils/error-handler';
import logger from './logger.service';

const PAGE_SIZE = 25;

export async function fetchListedJobs(page?: number | string): Promise<{ listedJobs: ListedJob[], currentPage: number, lastPage: number, totalListedJobs: number }> {
  logger.debug(`page: ${page}`)
  if (isNaN(+page) || +page < 0) {
    throw new BadRequestError(`Requested page ${page} is negative or not a number.`);
  }

  const currentPage: number = +page || 0;

  const repository = await getRepository(ListedJob);

  const [ listedJobs, totalListedJobs ] = await Promise.all([
    repository.find({ skip: currentPage * PAGE_SIZE, take: (currentPage + 1) * PAGE_SIZE, relations: [ 'packages', 'user', 'category' ]}),
    repository.count()
  ]);

  return {
    listedJobs,
    totalListedJobs,
    lastPage: Math.floor(totalListedJobs / PAGE_SIZE),
    currentPage
  }
}