import { ListedJobPage } from "../reducers/listed-jobs.reducer";

export enum ListedJobsActionTypes {
  LISTED_JOBS_LOAD = '[Listed Jobs] Load',
  LISTED_JOBS_LOAD_SUCCESS = '[Listed Jobs] Load Success',
  LISTED_JOBS_LOAD_FAILURE = '[Listed Jobs] Load Failure',
}

export class LoadListedJobs {
  type: typeof ListedJobsActionTypes.LISTED_JOBS_LOAD = ListedJobsActionTypes.LISTED_JOBS_LOAD;

  constructor(public payload: { page: number }) { }
}

export class LoadSuccessListedJobs {
  type: typeof ListedJobsActionTypes.LISTED_JOBS_LOAD_SUCCESS = ListedJobsActionTypes.LISTED_JOBS_LOAD_SUCCESS;
  
  constructor(public payload: ListedJobPage) { }
}

export class LoadFailureListedJobs {
  type: typeof ListedJobsActionTypes.LISTED_JOBS_LOAD_FAILURE = ListedJobsActionTypes.LISTED_JOBS_LOAD_FAILURE;
}

export type ListedJobsActions = LoadListedJobs | LoadSuccessListedJobs | LoadFailureListedJobs;