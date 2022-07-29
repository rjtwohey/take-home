import { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import { Navigate } from "react-router-dom";
import { NavigationRoute } from 'workbox-routing';
import { useHistory } from 'react-router';
import './Login.css';

const Login: React.FC = () => {
    const [user, setUser] = useState<Object | null>(null); //TODO make user type
    const history = useHistory();

    const handleLogin = () => {
        history.replace('/home');
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
