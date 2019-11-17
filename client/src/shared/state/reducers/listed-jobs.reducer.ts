import {ProfileData} from '../../../modules/user/state/profile.reducer';
import {ListedJobsActions, LOAD_LISTED_JOBS} from '../actions/listed-jobs.action';

export interface ListedJob {
  category: {
    id: number,
    name: string
  },
  computedRating: number,
  description: string,
  id: number,
  name: string,
  packages: {
    id: number,
    price: number,
    description: string
  }[],
  pictures: string[],
  user: ProfileData,
  views: number
}

export interface ListedJobPage {
  currentPage: number,
  lastPage: number,
  listedJobs: ListedJob[],
  totalListedJobs: number,
}

export interface ListedJobsState {
  data?: ListedJobPage,
  loading: boolean
}

const initialState: ListedJobsState = {
  loading: true
};

export default function(state = initialState, action: ListedJobsActions) {
  switch (action.type) {
    case LOAD_LISTED_JOBS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
}