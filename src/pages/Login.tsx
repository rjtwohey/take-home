import { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import { Navigate } from "react-router-dom";
import { NavigationRoute } from 'workbox-routing';
import { useHistory } from 'react-router';
import  getAuth  from '../auth/auth';
import { useRef } from 'react';
import { IonicAuth } from '@ionic-enterprise/auth';
import './Login.css';
import { User } from '../models';
import { useSession } from '../auth/useSession';

const Login: React.FC = () => {
    // const [user, setUser] = useState<User | undefined>(undefined); //TODO make user type
    const history = useHistory();
    const {config} = getAuth();
    const authConnectRef = useRef<IonicAuth>(new IonicAuth({...config}))
    const {login, user} = useSession();

    const handleLogin = async () => {
        // history.replace('/home');\
        await login('blah');
        user && history.replace('/home')
    }

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
