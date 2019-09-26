import { ListedJob } from '../models/listed-job.model';
import { getRepository } from 'typeorm';
import { BadRequestError } from '../utils/error-handler';

const PAGE_SIZE = 25;

export async function fetchListedJobs(page?: number | string): Promise<{ ListedJobs: ListedJob[], currentPage: number, lastPage: number, totalListedJobs: number }> {
  if (isNaN(+page) || +page < 0) {
    throw new BadRequestError(`Requested page ${page} is negative or not a number.`);
  }

  const currentPage: number = +page || 0;

  const repository = await getRepository(ListedJob);

  const [ ListedJobs, totalListedJobs ] = await Promise.all([
    repository.find({ skip: currentPage * PAGE_SIZE, take: (currentPage + 1) * PAGE_SIZE}),
    repository.count()
  ]);

  return {
    ListedJobs,
    totalListedJobs,
    lastPage: totalListedJobs / PAGE_SIZE,
    currentPage
  }
}