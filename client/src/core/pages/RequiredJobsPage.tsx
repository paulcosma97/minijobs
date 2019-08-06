import React from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router';
import smartFetch from '../../shared/utils/smart-fetch';

export default class RequiredJobsPage extends React.Component {
  selected = false;

  componentDidMount() {
    document
      .querySelectorAll('.ant-menu-item-selected')
      .forEach(item => item.classList.remove('ant-menu-item-selected'));
    document
      .querySelector(`#required-jobs`)
      .classList.add('ant-menu-item-selected');
  }

  render() {
    return (
      // <Container fluid={false}>
      <span>required jobs page</span>
      // </Container>
    );
  }
}
