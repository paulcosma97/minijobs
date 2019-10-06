import { ListedJobPage } from "../reducers/listed-jobs.reducer";
import { ActionDispatcher } from "./index";
import smartFetch from "../../utils/smart-fetch";

export const LOAD_LISTED_JOBS = '[Listed Jobs] Load';

interface LoadListedJobsAction {
  type: typeof LOAD_LISTED_JOBS;
  payload: ListedJobPage;
}

export const loadListedJobs = (page = 0) => async (dispatch: ActionDispatcher) => {
  const jobsPage = await smartFetch
    .get<ListedJobPage>('/listed-job?page=' + page)
    .catch(() => null);

  dispatch({
    type: LOAD_LISTED_JOBS,
    payload: jobsPage
  });
};

export type ListedJobsActions = LoadListedJobsAction;