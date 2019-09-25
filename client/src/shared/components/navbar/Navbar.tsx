import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

type NavbarLink = { link: string; icon: string; key: string };

class Navbar extends React.Component<{ items: NavbarLink[] }> {
  state = {
    selectedMenu: this.getCurrentItemKey()
  };

  componentWillMount() {
    this.watchActiveLink();
  }

  getCurrentItemKey() {
    const item = this.props.items.find(it => window.location.href.includes(it.link));
    if (!item) {
      return 'profile'
    }

    return item.key;
  }

  watchActiveLink() {
    window.addEventListener('popstate', () => {
      const item = this.props.items.find(it =>
        window.location.href.includes(it.link)
      );

      // mark item as selected
      if (!item) {
        return;
      }

      this.setState({
        selectedMenu: item.key
      });
    });
  }

  computeMenuItems = () => {
    return this.props.items.map(item => (
      <Menu.Item key={item.key} id={item.key}>
        <NavLink to={item.link}>
          <Icon type={item.icon} style={{ fontSize: '1.5em' }} />
        </NavLink>
      </Menu.Item>
    ));
  };

  render() {
    return (
      <Menu
        key={new Date().getTime()}
        mode="horizontal"
        id="navbar"
        selectedKeys={[this.state.selectedMenu]}
      >
        {this.computeMenuItems()}
      </Menu>
    );
  }
}

export default Navbar;
