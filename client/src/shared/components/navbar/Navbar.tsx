import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';

type NavbarLink = { link: string; icon: string; key: string };

class Navbar extends React.Component<{ items: NavbarLink[] }> {
  computeMenuItems = () => {
    return this.props.items.map(item => (
      <Menu.Item key={item.key} style={{ width: '33.3%' }} id={item.key}>
        <NavLink activeClassName="test-class" to={item.link}>
          <Icon type={item.icon} style={{ fontSize: '1.5em' }} />
        </NavLink>
      </Menu.Item>
    ));
  };

  render() {
    return (
      <Menu mode="horizontal" id="navbar">
        {this.computeMenuItems()}
      </Menu>
    );
  }
}

export default Navbar;
