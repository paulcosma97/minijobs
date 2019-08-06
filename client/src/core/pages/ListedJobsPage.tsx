import React from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router';
import smartFetch from '../../shared/utils/smart-fetch';

export default class ListedJobsPage extends React.Component {
  componentDidMount() {
    document
      .querySelectorAll('.ant-menu-item-selected')
      .forEach(item => item.classList.remove('ant-menu-item-selected'));
    document
      .querySelector(`#listed-jobs`)
      .classList.add('ant-menu-item-selected');
  }

  render() {
    return (
      // <Container fluid={false}>
      <span>enlisted jobs page</span>
      // </Container>
    );
  }
}
