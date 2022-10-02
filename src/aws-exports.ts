const config = {
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_AWS_REGION,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_USER_POOL_ID,

        // OPTIONAL - Amazon Cognito Identity Pool ID
        // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: process.env.REACT_APP_COGNITO_DOMAIN,
            scope: [
                "phone",
                "email",
                "profile",
                "openid",
                "aws.cognito.signin.user.admin",
            ],
            redirectSignIn: process.env.REACT_APP_WEB_CLIENT_REDIRECT_URL + "signin",
            redirectSignOut: process.env.REACT_APP_WEB_CLIENT_REDIRECT_URL + "signout",
            responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
        cookieStorage: {
            domain: 'localhost',
            secure: false,
            sameSite: 'lax',
            path: '/',
        }
    },
};

export default config;
