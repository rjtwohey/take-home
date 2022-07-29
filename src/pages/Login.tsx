import { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import { Navigate } from "react-router-dom";
import { NavigationRoute } from 'workbox-routing';
import { useHistory } from 'react-router';
import  getAuth  from '../auth/auth';
import { useRef } from 'react';
import { IonicAuth } from '@ionic-enterprise/auth';
import './Login.css';

const Login: React.FC = () => {
    const [user, setUser] = useState<Object | null>(null); //TODO make user type
    const history = useHistory();
    const {config} = getAuth();
    const authConnectRef = useRef<IonicAuth>(new IonicAuth({...config}))

    const handleLogin = async () => {
        // history.replace('/home');\
        const auth = authConnectRef.current;
        console.log(config, auth);
        console.log(`${process.env.REACT_APP_CLIENT_ID}`)
        try {
            await auth.login();
            const user = await getUserInfo();
            console.log(user);
            history.replace('/home');
        } catch (e: any) {
            console.log('there was an error!', e);
        }
    }

    const getUserInfo = async (): Promise<Object | undefined> => {
        const auth = authConnectRef.current;
        const idToken = await auth.getIdToken();
        if (!idToken) return;

        console.log(idToken);
        const { sub, firstName, lastName } = idToken;
        let email = idToken.email;
        if (idToken.emails instanceof Array) {
            email = idToken.emails[0];
        }

        return { id: sub, email, firstName, lastName };
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar style={{padding: 20}} color='light'>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Login</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position='floating'>Username</IonLabel>
                            <IonInput type='email' placeholder='Insert username...'></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position='floating'>Password</IonLabel>
                            <IonInput type='password' placeholder='Insert password...'></IonInput>
                        </IonItem>
                            <IonButton className='login-btn' expand="full" onClick={handleLogin}>Login</IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;
