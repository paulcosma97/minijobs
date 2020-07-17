import {isPlatform} from "@ionic/react";

export const isWebPlatform = () => isPlatform('desktop') || isPlatform('mobileweb');
export const isNativePlatform = () => !isWebPlatform();