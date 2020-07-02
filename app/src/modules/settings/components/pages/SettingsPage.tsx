import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../../../../components/ExploreContainer';
import './SettingsPage.css';
import {useTranslation} from "react-i18next";


const SettingsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t('module.settings.title')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{t('module.settings.title')}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Tab 1 page" />
            </IonContent>
        </IonPage>
    );
};

export default SettingsPage;
