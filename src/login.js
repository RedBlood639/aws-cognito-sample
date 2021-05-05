require("aws-sdk/dist/aws-sdk");
var AWS = window.AWS;
var env = require('./env');
var cognito = require('./cognito');
var util = require('./util');
var form = document.getElementById('FormLogin');

export function init() {
    var cognitoUser = cognito.userPool.getCurrentUser();
    if (cognitoUser) {
        _showUserPage();
    } else {
        util.switchDisplayContainer('LoginContainer');
        form.addEventListener('submit', _handleForm, false);
        _setCognitoLoginLink();
        _setLineLoginLink();
    }
    window.console.log(cognitoUser);
}

function _handleForm(event) {
    event.preventDefault();
    _runCognito(
        document.getElementById('InputLoginUserName').value,
        document.getElementById('InputLoginPassword').value
    );
}

function _runCognito(username, password) {
    var authenticationData = { Username: username, Password: password };
    var userData = { Username: username, Pool: cognito.userPool };
    var authenticationDetails = new cognito.ACI.AuthenticationDetails(authenticationData);
    var cognitoUser = new cognito.ACI.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.idToken.jwtToken;
            // var accessToken = result.getAccessToken().getJwtToken();
            _showUserPage();
            _getCredentials(accessToken);
        },
        onFailure: function (err) {
            alert(err.message || JSON.stringify(err));
        },
        mfaRequired: function (codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code', '');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
}

function _showUserPage() {
    util.switchDisplayContainer('UserPageContainer');
    document.getElementById('username').innerText = cognito.userPool.getCurrentUser().username
}

function _getCredentials(accessToken) {
    AWS.config.region = env.AWS_REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: env.AWS_ID_POOL_ID,
        Logins: {
            ['cognito-idp.' + env.AWS_REGION + '.amazonaws.com/' + env.AWS_COGNITO_USER_POOL_ID]: accessToken
        }
    });

    AWS.config.credentials.get(function (err) {
        if (err) {
            window.console.log(err);
        } else {
            console.log('Successfully logged!');
        }
    });
}

function _setCognitoLoginLink() {
    document.getElementById('CognitoLink').href = cognito.COGNITO_HOSTED_LOGIN_URL
}

function _setLineLoginLink() {
    document.getElementById('LineLoginLink').href = cognito.LINE_LOGIN_URL
}
