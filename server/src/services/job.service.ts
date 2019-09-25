import { Job } from '../models/job.model';
import { getRepository } from 'typeorm';
import { BadRequestError } from '../utils/error-handler';

const PAGE_SIZE = 25;

export async function fetchJobs(page?: number | string): Promise<{ jobs: Job[], currentPage: number, lastPage: number, totalJobs: number }> {
  if (isNaN(+page) || +page < 0) {
    throw new BadRequestError(`Requested page ${page} is negative or not a number.`);
  }

  const currentPage: number = +page || 0;

  const repository = await getRepository(Job);

  const [ jobs, totalJobs ] = await Promise.all([
    repository.find({ skip: currentPage * PAGE_SIZE, take: (currentPage + 1) * PAGE_SIZE}),
    repository.count()
  ]);

  return {
    jobs,
    totalJobs,
    lastPage: totalJobs / PAGE_SIZE,
    currentPage
  }
}