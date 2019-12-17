import React, { FC } from 'react'
import { ListedJob } from '../../../../shared/state/reducers/listed-jobs.reducer'
import env from '../../../../environment.json';
import './item.css'
import { Avatar, Icon } from 'antd';

export interface ListedJobListItemProps {
    listedJob: ListedJob
}

const ListedJobListItem: FC<ListedJobListItemProps> = ({ listedJob }) => {
    return (
        <div className="listed-job-card">
            <div className="listed-job-card-header">
                <h3>Voi {listedJob.name}</h3>
            </div>

            <img src={env.baseUrl + listedJob.pictures[0]} alt={listedJob.name} />
            <Avatar src={env.baseUrl + listedJob.user.picture} />
            <span>{listedJob.user.firstName + ' ' + listedJob.user.lastName}</span>

            <div className="listed-job-card-container">


                <p className="listed-job-card-description">{listedJob.description}</p>

                <div className="price-list">
                    <span><Icon type="shopping" />{listedJob.packages[0].price} - {listedJob.packages.pop().price} RON</span>
                    <span><Icon type="eye" /> {listedJob.views} Viz.</span>
                    <span><Icon type="star" /> {listedJob.computedRating || '??'} (17)</span>
                </div>
            </div>
        </div>
    )
}

export default ListedJobListItem
