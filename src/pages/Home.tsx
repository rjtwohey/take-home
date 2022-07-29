import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton, IonItem } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>

        </IonToolbar>

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
