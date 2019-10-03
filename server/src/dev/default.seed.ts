import { User, defaultPermissionMask } from "../models/user.model";
import { getRepository, getConnection } from "typeorm";
import logger from "../services/logger.service";
import { ListedJob } from "../models/listed-job.model";
import { Category } from "../models/category.model";
import { UserRating } from "../models/user-rating.model";
import { ListedJobPackage } from "../models/listed-job-package.model";
import { File } from "../models/file.model";
import { FileGUID } from "../models/file-guid.model";

export async function seedDatabase() {
  logger.debug("Seeding database...");

  await getConnection().synchronize(true);

  userSeed = await getRepository(User).save(userSeed);
  categorySeed1 = await getRepository(Category).save(categorySeed1);
  categorySeed2 = await getRepository(Category).save(categorySeed2);
  listedJobSeed = await getRepository(ListedJob).save(listedJobSeed);
  userRatingSeed = await getRepository(UserRating).save(userRatingSeed);
  listedJobPackageSeed = await getRepository(ListedJobPackage).save(listedJobPackageSeed);
  fileSeed = await getRepository(File).save(fileSeed);
  fileGUIDSeed = await getRepository(FileGUID).save(fileGUIDSeed);

  logger.debug('Database seed complete');
}

let fileSeed: File[] = [
  { id: 1, guid: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', path: 'user/folder/testt.jpg' }
];

let userSeed: User[] = [
  { id: 1, firstName: 'Alex', lastName: 'Cseh', email: 'alex.cseh@gmail.com', permissionMask: defaultPermissionMask, pictureGUID: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' },
  { id: 2, firstName: 'Andrei', lastName: 'Katona', email: 'andrei.katona@gmail.com', permissionMask: defaultPermissionMask, pictureGUID: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' }
];

let categorySeed1: Category[] = [
  { id: 1, name: 'Arte' },
  { id: 2, name: 'Tehnologie' },
  { id: 3, name: 'Munca fizica' },
]

let categorySeed2 = [
  { id: 4, name: 'Arte plastice', parent: categorySeed1[0] /** Arte */},
  { id: 5, name: 'Arte pictoresti', parent: categorySeed1[0] /** Arte */ },
  { id: 6, name: 'Programare si IT', parent: categorySeed1[1] /** Tehnologie */ },
  { id: 7, name: 'Hardware', parent: categorySeed1[1] /** Tehnologie */ }
];

let listedJobSeed: ListedJob[] = [
  { id: 1, category: categorySeed2[2] /** Programare si IT */, name: 'crea o pagina web', description: 'my description', user: userSeed[1] /** Katona */, pictureGUIDs: [], computedRating: 4.5 },
  { id: 2, category: categorySeed2[2] /** Programare si IT */, name: 'face tema ta la engleza', description: 'my description 2', user: userSeed[0] /** Alex */, pictureGUIDs: [] }
]

let listedJobPackageSeed: ListedJobPackage[] = [
  { id: 1, description: 'Lorem ipsum dolorem bla dum con carne', price: 100, listedJob: listedJobSeed[0] },
  { id: 2, description: 'Lorem ipsum dolorem bla dum con carne', price: 150, listedJob: listedJobSeed[0] },
  { id: 3, description: 'Lorem ipsum dolorem bla dum con carne', price: 250, listedJob: listedJobSeed[0] },
  { id: 4, description: 'Lorem ipsum dolorem bla dum con carne', price: 10, listedJob: listedJobSeed[1] },
  { id: 5, description: 'Lorem ipsum dolorem bla dum con carne', price: 15, listedJob: listedJobSeed[1] },
  { id: 6, description: 'Lorem ipsum dolorem bla dum con carne', price: 25, listedJob: listedJobSeed[1] },
]

let userRatingSeed: UserRating[] = [
  { id: 1, ratedBy: userSeed[0] /** Alex */, rating: 4.5, user: userSeed[1] /** Katona */ },
]

let fileGUIDSeed: FileGUID[] = [
  { id: 1, guid: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', job: listedJobSeed[0] },
  { id: 2, guid: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', job: listedJobSeed[1] },
]
