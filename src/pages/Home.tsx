import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton, IonItem } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { useSession } from '../auth/useSession';
import './Home.css';


//TODO guard this route
const Home: React.FC = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const history = useHistory();
  const {getAccessToken} = useSession();

  useEffect(() => {
    const initializeData = async () => {
      const userToken = await getAccessToken();
      setToken(userToken);
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonItem lines='none'>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
          <IonButton size='default' onClick={() => history.replace('/login')}>
            <IonIcon slot="icon-only" icon={logOutOutline} />
          </IonButton>
        </IonItem>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonItem lines='none'>
            <IonToolbar>
              <IonTitle size="large">Home</IonTitle>
            </IonToolbar>
            <IonButton size='default' onClick={() => history.replace('/login')}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonItem>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
