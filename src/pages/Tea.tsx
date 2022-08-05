import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem } from "@ionic/react";
import { useState, useEffect } from "react";
import { useSession } from "../auth/useSession";
import axios from "axios";
import { Tea } from '../models'
import { useHistory } from 'react-router';

const TeaPage: React.FC = () => {
    const [tea, setTea] = useState<Tea[] | null>(null);
    const [token, setToken] = useState<string | undefined>(undefined)
    const {user, getAccessToken, invalidate } = useSession();
    const history = useHistory();

    useEffect(() => {
        initializeData();
    }, [])

    const initializeData = async () => {
        const userToken = await getAccessToken();
        setToken(userToken);
        console.log(userToken);


        axios.get(`${process.env.REACT_APP_DATA_SERVICE}/tea-categories`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((res) => {
            console.log(res)
            setTea(res.data);
        }).catch(error => {
            console.log(error)
            if (error.message.includes('401')) {
                invalidate();
                history.replace('/login')
            }
        })
    }

    return (
        <IonContent>
            {tea && tea.map(t => {
                return (
                    <IonCard key={t.id}>
                        <IonCardHeader>
                            <IonCardTitle>{t.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem>{t.description}</IonItem>
                        </IonCardContent>
                    </IonCard>
                )
            })}
        </IonContent>
    )
}

export default TeaPage;