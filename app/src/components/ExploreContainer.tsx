import React, {useState} from 'react';
import './ExploreContainer.css';
import {IonButton, IonToast, isPlatform} from "@ionic/react";
import {Plugins} from "@capacitor/core";
import axios from 'axios';
import MJButton from "./MJButton";

interface ContainerProps {
  name: string;
}

declare var FB: any;

async function onSignIn(): Promise<any> {
    let token: string;
    if (isPlatform('desktop') || isPlatform('mobileweb')) {
        token = await webSignIn();
    } else {
        token = await mobileSignIn();
    }

    await axios.post('http://localhost:3000/users/login', {
        type: 'facebook',
        token
    }, {
        withCredentials: true
    })
}

async function webSignIn(): Promise<any> {
    return new Promise(res => {
        FB.login(function(response: any) {
            if (response.authResponse) {
                res(response.authResponse.accessToken)
            } else {
                res('{fail:true}');
            }
        });
    })

}

async function mobileSignIn(): Promise<any> {
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    if (result && result.accessToken) {
        localStorage.setItem('token', result.accessToken.token);

        return result.accessToken.token;
    }

    return '{fail:true}';
}


const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        <br/>
        <br/>
        <br/>
        <br/>

        <MJButton>My Day</MJButton>
        <MJButton styleType='secondary'>My Day</MJButton>
        <MJButton styleType='tertiary'>My Day</MJButton>
    </div>
  );
};

export default ExploreContainer;
