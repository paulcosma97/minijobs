import React from 'react'
import {Avatar, Icon, List} from 'antd';
import {ListedJob} from '../../../../shared/state/reducers/listed-jobs.reducer';
import env from '../../../../environment.json';

type JobListArgs = {
    jobs: ListedJob[];
}

const JobList: React.FC<JobListArgs> = ({jobs}) => {
    return (
        <List
            className="listed-jobs-list"
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 15,
            }}
            dataSource={jobs}
            renderItem={job => (
                <List.Item
                    key={job.id}
                    actions={[
                        <span><Icon type="shopping"/>{job.packages[0].price} - {job.packages.pop().price} RON</span>,
                        <span><Icon type="eye"/> {job.views}</span>,
                        <span><Icon type="star"/> {job.computedRating || '??'} (17)</span>
                        // <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                        // <IconText type="message" text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src={env.baseUrl + job.pictures[0]}
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={env.baseUrl + job.user.picture}/>}
                        title={<a href={''}>{''}</a>}
                        description={job.description}
                    />
                    Voi {job.name}
                </List.Item>
            )}
        />
    )
};

export default JobList;
