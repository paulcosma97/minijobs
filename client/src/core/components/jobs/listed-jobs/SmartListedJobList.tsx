import React, { Component } from 'react'
import { connect } from 'react-redux'
import { State } from '../../../../shared/state/store';
import { ListedJobsState } from '../../../../shared/state/reducers/listed-jobs.reducer';
import { loadListedJobs } from '../../../../shared/state/actions/listed-jobs.action';
import JobList from './ListedJobList';

export class SmartListedJobList extends Component<{ listedJobs: ListedJobsState, loadListedJobs?: typeof loadListedJobs }> {

  componentWillMount() {
    this.props.loadListedJobs();
  }

  render() {
    if (this.props.listedJobs.loading) {
      return <React.Fragment/>
    }

    return (
      <div>
      <JobList jobs={this.props.listedJobs.data.listedJobs} />
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  listedJobs: state.listedJobs
})
const mapDispatchToProps = {
  loadListedJobs  
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartListedJobList as any)
