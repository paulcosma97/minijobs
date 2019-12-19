import React, { FC } from 'react'
import { ListedJob } from '../../../../shared/state/reducers/listed-jobs.reducer'
import env from '../../../../shared/environment';
import './item.css'
import { Avatar, Icon } from 'antd';

export interface ListedJobListItemProps {
    listedJob: ListedJob
}

const ListedJobListItem: FC<ListedJobListItemProps> = ({ listedJob }) => {
    return (
        <div className="listed-job-card">
            <img src={env.baseUrl + listedJob.pictures[0]} alt={listedJob.name} />

            <div className="listed-job-card-container">
                <h3>Voi {listedJob.name}</h3>

                <p className="listed-job-card-description">{listedJob.description}</p>
                <div style={{ textAlign: 'right' }}>{listedJob.user.firstName + ' ' + listedJob.user.lastName}</div>

                <div className="price-list">
                    <div><Icon type="shopping" />{listedJob.packages[0].price} - {listedJob.packages.pop().price} RON</div>
                    <div><Icon type="eye" /> {listedJob.views} Viz.</div>
                    <div><Icon type="star" /> {listedJob.computedRating || '??'} (17)</div>
                </div>
            </div>
        </div>
    )
}

export default ListedJobListItem
