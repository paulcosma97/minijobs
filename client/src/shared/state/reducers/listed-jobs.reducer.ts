import {ProfileData} from '../../../modules/user/state/profile.reducer';
import {ListedJobsActions, ListedJobsActionTypes} from '../actions/listed-jobs.action';

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
    case ListedJobsActionTypes.LISTED_JOBS_LOAD: {
      return {
        ...state,
        loading: true
      };
    }

    case ListedJobsActionTypes.LISTED_JOBS_LOAD_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }

    case ListedJobsActionTypes.LISTED_JOBS_LOAD_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}