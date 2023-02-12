import React, {useEffect, useState} from 'react';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {Amplify, Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        Hub.listen('auth', ({payload: {event, data}}) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser();
                    getAccessToken();
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });
        getUser();
        getAccessToken();
    }, []);

    const getUser = async () => {
        await Auth.currentAuthenticatedUser()
            .then(user => setUser(user))
            .catch(() => console.log('Not signed in'));
    }

    const getAccessToken = async () => {
        await Auth.currentSession()
            .then(data => setAccessToken(data.getAccessToken().getJwtToken()))
            .catch(() => console.log('Not signed in'));
    }

    return (
        <div>
            {/*<p>User: <br/> {user ? JSON.stringify(user) : 'None'}</p>*/}
            <p>AccessToken: <br/> {accessToken ? accessToken : 'None'}</p>
            {user ? (
                <button onClick={() => Auth.signOut()}>Sign Out</button>
            ) : (
                <>
                    <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Cognito})}>
                        Federated Sign In
                    </button>
                    <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})}>
                        Sign In with google
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
