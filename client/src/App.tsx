import 'antd/dist/antd.css';
import './style.css';
import React from 'react';
import {Icon} from 'antd';
import {Provider} from 'react-redux';
import {store} from './shared/state/store';
import ApplicationRouter from './shared/components/router/ApplicationRouter';

window.addEventListener('beforeinstallprompt', (e: any) => {
  console.log(e);
  e.prompt();
});

const OfflineOverlay: React.FC<any> = () => {
  return (
    <div
      className="text-center"
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: '#00000040',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      <Icon type="loading" style={{ fontSize: '5em', marginTop: '35vh' }} />{' '}
      <br />
      Se cauta o conexiune...
    </div>
  );
};

class App extends React.Component {
  state = {
    isOnline: window.navigator.onLine
  };

  componentWillMount() {
    window.addEventListener('offline', () => {
      this.setState({
        isOnline: false
      });
    });
    window.addEventListener('online', () => {
      this.setState({
        isOnline: true
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.isOnline || <OfflineOverlay />}
        <ApplicationRouter />
      </Provider>
    );
  }
}

export default App;
