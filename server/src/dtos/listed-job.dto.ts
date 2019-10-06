import { ListedJob } from '../models/listed-job.model';
import { getServedFileLink } from '../services/file.service';
import { UserDTO } from './user.dto';
import { ListedJobPackage } from '../models/listed-job-package.model';
import { Category } from '../models/category.model';
import { getRepository } from 'typeorm';

export class ListedJobDTO {
  id?: number;
  category: Category;
  name: string;
  description: string;
  pictures: string[];
  views: number;
  user: UserDTO;
  computedRating?: number;
  packages?: ListedJobPackage[];

    static from(listedJob: ListedJob): Promise<ListedJobDTO> {
        return (async () => {
          const dto: ListedJobDTO = {
            id: listedJob.id,
            name: listedJob.name,
            description: listedJob.description,
            pictures: await Promise.all(listedJob.pictureGUIDs.map(file => getServedFileLink(file.guid))),
            category: listedJob.category,
            computedRating: listedJob.computedRating,
            user: await UserDTO.from(listedJob.user),
            packages: listedJob.packages,
            views: (await getRepository(ListedJob).findOne(listedJob.id, { relations: [ 'lastViewedBy' ] })).lastViewedBy.length
          }

          return dto;
        })()
    }
}