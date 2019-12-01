import { ListedJobsActionTypes, LoadSuccessListedJobs, LoadFailureListedJobs, LoadListedJobs } from "../actions/listed-jobs.action";
import { takeEvery, call, put } from "@redux-saga/core/effects";
import { ListedJobPage } from "../reducers/listed-jobs.reducer";
import smartFetch from "../../utils/smart-fetch";

export function* watchLoadListedJobs() {
    yield takeEvery<LoadListedJobs>(ListedJobsActionTypes.LISTED_JOBS_LOAD, function* ({ payload }) {
        try {
            const jobs: ListedJobPage = yield call(() => smartFetch.get<ListedJobPage>('/listed-job?page=' + payload.page));
            yield put({ ...new LoadSuccessListedJobs(jobs) });
        } catch (e) {
            yield put({ ...new LoadFailureListedJobs() });
        }
    });
}