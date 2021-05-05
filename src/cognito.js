var env = require('./env');
export var ACI = require('amazon-cognito-identity-js');
export var ACA = require('amazon-cognito-auth-js');
export var userPool = new ACI.CognitoUserPool({
    UserPoolId: env.AWS_COGNITO_USER_POOL_ID,
    ClientId: env.AWS_COGNITO_CLIENT_ID
});

export var OPENID_CONNECT = {
    ClientId: env.AWS_COGNITO_CLIENT_ID,
    AppWebDomain: env.AWS_COGNITO_APP_WEB_DOMAIN,
    RedirectUriSignIn: 'http://localhost:9001/idpresponse.html',
    RedirectUriSignOut: 'http://localhost:9001',
    TokenScopesArray: [
        'profile',
        'email',
        'openid',
        'aws.cognito.signin.user.admin',
        'phone'
    ],
    UserPoolId: env.AWS_COGNITO_USER_POOL_ID
}

export var COGNITO_HOSTED_LOGIN_URL = 'https://'
    + env.AWS_COGNITO_APP_WEB_DOMAIN
    + '/login?response_type=code&client_id='
    + env.AWS_COGNITO_CLIENT_ID
    + '&redirect_uri='
    + OPENID_CONNECT.RedirectUriSignIn

export var LINE_LOGIN_URL = 'https://'
    + env.AWS_COGNITO_APP_WEB_DOMAIN
    + '/oauth2/authorize?identity_provider=LINE&response_type=code&client_id='
    + env.AWS_COGNITO_CLIENT_ID
    + '&redirect_uri='
    + OPENID_CONNECT.RedirectUriSignIn
    + '&scope='
    + OPENID_CONNECT.TokenScopesArray.join(' ')
