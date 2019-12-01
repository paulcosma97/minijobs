import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {State} from '../../../../shared/state/store';
import JobList from '../components/ListedJobList';
import { LoadListedJobs } from '../../../../shared/state/actions/listed-jobs.action';

const SmartListedJobList: React.FC = () => {
    const { data, loading } = useSelector((state: State) => state.listedJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ ...new LoadListedJobs({ page: 0 }) });
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <React.Fragment/>
    }

    return (
        <div>
            <JobList jobs={data.listedJobs}/>
        </div>
    )
}

export default SmartListedJobList;
