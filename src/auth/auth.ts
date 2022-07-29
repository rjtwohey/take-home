import { IonicAuthOptions } from '@ionic-enterprise/auth';
import { isPlatform } from '@ionic/core';

export default (): { config: IonicAuthOptions } => {
    const isNative = isPlatform('hybrid');

    const config: IonicAuthOptions = {
        authConfig: 'cognito',
        clientID: `${process.env.REACT_APP_CLIENT_ID}`,
        clientSecret: `${process.env.REACT_APP_CLIENT_SECRET}`,
        discoveryUrl: `${process.env.REACT_APP_DISCOVERY_URL}`,
        scope: 'openid email profile',
        audience: '',
        redirectUri: isNative ? 'msauth://login' : 'http://localhost:8100/login',
        logoutUrl: isNative ? 'msauth://login' : 'http://localhost:8100/login',
        platform: isNative ? 'capacitor' : 'web',
        iosWebView: isNative ? 'private' : undefined,
        androidToolbarColor: isNative ? '#337ab7' : undefined
    }

    return {config};
}