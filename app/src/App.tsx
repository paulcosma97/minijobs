import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {briefcaseOutline, homeOutline, settingsOutline} from 'ionicons/icons';
import SettingsPage from './modules/settings/components/pages/SettingsPage';
import JobsPage from './modules/jobs/components/pages/JobsPage';
import HomePage from './modules/home/components/pages/HomePage';
import {store} from "./shared/state/store";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './shared/theme/variables.css';
import './shared/theme/overrides.css';
import {Provider} from "react-redux";

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet animated={true}>
                <Route path="/settings" component={SettingsPage} exact={true} />
                <Route path="/jobs" component={JobsPage} exact={true} />
                <Route path="/home" component={HomePage} />
                <Route path="*" render={() => <Redirect to="/home" />} exact={true} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={homeOutline} />
                </IonTabButton>
                <IonTabButton tab="jobs" href="/jobs">
                  <IonIcon icon={briefcaseOutline} />
                </IonTabButton>
                <IonTabButton tab="settings" href="/settings">
                  <IonIcon icon={settingsOutline} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      </Provider>

  )
};

export default App;
