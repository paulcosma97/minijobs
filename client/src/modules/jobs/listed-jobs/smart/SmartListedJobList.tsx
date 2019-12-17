import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../../../shared/state/store';
import JobList from '../components/ListedJobList';
import { LoadListedJobs } from '../../../../shared/state/actions/listed-jobs.action';
import { InfiniteScrollList } from '../../../../shared/components/infinite-scroll-list/InfiniteScrollList';
import ListedJobListItem from '../components/ListedJobListItem';

const SmartListedJobList: React.FC = () => {
    const { data: listedJobsData, loading: listedJobsLoading } = useSelector((state: State) => state.listedJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ ...new LoadListedJobs({ page: 0 }) });
        // eslint-disable-next-line
    }, []);

    if (listedJobsLoading) {
        return <React.Fragment />
    }

    return (
        <div>
            {/* <JobList jobs={listedJobsData.listedJobs} /> */}
            <InfiniteScrollList initialPage={1} lastPage={2} loading={false} onLoadPage={(page) => console.log('load', page)}>
                {listedJobsData.listedJobs.map(listedJob => <ListedJobListItem key={listedJob.id} listedJob={listedJob} />)}
            </InfiniteScrollList>

        </div>
    )
}

export default SmartListedJobList;
