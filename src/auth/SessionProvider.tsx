import { IonSpinner } from "@ionic/react";
import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import { Session } from "../models";
import { Preferences } from '@capacitor/preferences';
import Axios from 'axios';
import { User } from '../models'
import getAuth from '../auth/auth';
import { useRef } from 'react';
import { IonicAuth } from '@ionic-enterprise/auth';

interface SessionState {
    user?: User;
    loading: boolean;
    error: string;
}

const initialState: SessionState = {
    user: undefined,
    loading: true,
    error: '',
};

export type SessionAction =
    | { type: 'CLEAR_SESSION' }
    | { type: 'RESTORE_SESSION'; user: User }
    | { type: 'LOGIN' }
    | { type: 'LOGIN_SUCCESS'; user: User }
    | { type: 'LOGIN_FAILURE'; error: string }
    | { type: 'LOGOUT' }
    | { type: 'LOGOUT_SUCCESS' }
    | { type: 'LOGOUT_FAILURE'; error: string };

const reducer = (state: SessionState = initialState, action: SessionAction): SessionState => {
    switch (action.type) {
        case 'CLEAR_SESSION':
            return { ...state, user: undefined };
        case 'RESTORE_SESSION':
            return { ...state, user: action.user };
        case 'LOGIN':
            return { ...state, loading: true, error: '' };
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false, user: action.user };
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: action.error };
        case 'LOGOUT':
            return { ...state, loading: true, error: '' };
        case 'LOGOUT_SUCCESS':
            return { ...state, loading: false, user: undefined };
        case 'LOGOUT_FAILURE':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};


export const SessionContext = createContext<{
    state: typeof initialState;
    dispatch: (action: SessionAction) => void;
    login: (mode: any) => Promise<void>; //Will use Identity Vault later    
    logout: () => Promise<void>;
    invalidate: () => Promise<void>;
    restoreSession: () => Promise<void>;
    getAccessToken: () => Promise<string | undefined>;
}>({
    state: initialState,
    dispatch: () => { },
    login: () => {
        throw new Error('Method not implemented');
    },
    logout: () => {
        throw new Error('Method not implemented');
    },
    invalidate: () => {
        throw new Error('Method not implemented');
    },
    restoreSession: () => {
        throw new Error('Method not implemented');
    },
    getAccessToken: () => {
        throw new Error('Method not implemented');
    },
});

export const SessionProvider: React.FC = ({ children }) => {
    const [initializing, setInitializing] = useState<boolean>(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { config } = getAuth();
    const authConnectRef = useRef<IonicAuth>(new IonicAuth({ ...config }))

    useEffect(() => {
        restoreSession().finally(() => setInitializing(false));
    }, []);


    const login = async (mode: any): Promise<void> => {
        setInitializing(false)
        //This will use identity vault later to verify that the user can access storage
        const auth = authConnectRef.current;
        try {
            await auth.login();
            const user = await getUserInfo();
            user && setInitializing(false);
            user && dispatch({ type: 'LOGIN_SUCCESS', user })
        } catch (e: any) {
            dispatch({ type: 'LOGIN_FAILURE', error: e.message });
        }
    }

    const getUserInfo = async (): Promise<User | undefined> => {
        const auth = authConnectRef.current;
        const idToken = await auth.getIdToken();
        if (!idToken) return;

        console.log(idToken);
        const { sub, firstName, lastName } = idToken;
        let email = idToken.email;
        if (idToken.emails instanceof Array) {
            email = idToken.emails[0];
        }

        const newUser: User = {
            id: sub, email, firstname: firstName, lastname: lastName
        }

        return newUser;
    };

    const logout = async () => {
        //todo
        const auth = authConnectRef.current;
        dispatch({ type: 'LOGOUT' });
        try {
            await auth.logout();
            dispatch({ type: 'LOGOUT_SUCCESS' })
        } catch (e: any) {
            dispatch({ type: 'LOGIN_FAILURE', error: e.message });
        }
    }

    const invalidate = async () => {
        //TODO
    }

    const restoreSession = useCallback(async () => {
        const auth = authConnectRef.current;
        try {
            const isAuthenticated = await auth.isAuthenticated();
            if (!isAuthenticated) return dispatch({ type: 'CLEAR_SESSION' })
            if (isAuthenticated) {
                const user = await getUserInfo();
                console.log(user)
                if (!user) throw new Error('No user information.');
                dispatch({ type: 'RESTORE_SESSION', user });
            }
        } catch (e) {
            dispatch({ type: 'CLEAR_SESSION' });
        }
    }, []);

    const getAccessToken = async (): Promise<string | undefined> => {
        const auth = authConnectRef.current;
        return auth.getAccessToken();
    }

    // const attemptSessionRestore = async () => {
    //     try {
    //         const {value: token} = await Preferences.get({key: 'auth-token'});
    //         if (!token) throw new Error('Token not found.');

    //         const headers = { Authorization: 'Bearer ' + token}
    //         const url = `${process.env.REACT_APP_DATA_SERVICE}/users/current`;
    //         const {data: user} = await Axios.get(url, {headers});
    //         dispatch({type: 'RESTORE_SESSION', session: {token, user}});
    //     } catch (error) {
    //         dispatch({type: 'CLEAR_SESSION'});
    //     }
    // }

    return (
        <SessionContext.Provider value={{ state, dispatch, login, logout, invalidate, restoreSession, getAccessToken }}>
            {initializing ? <IonSpinner name="dots" data-testid="initializing" /> : children}
        </SessionContext.Provider>
    );
};