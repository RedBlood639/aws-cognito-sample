var cognito = require('./cognito');

export function init() {
    onLoad();
}

function onLoad() {
    var auth = initCognitoSDK();
    var curUrl = window.location.href;
    auth.parseCognitoWebResponse(curUrl);
}

// refs: node_modules/amazon-cognito-auth-js/sample/index.html
function initCognitoSDK() {
    var auth = new cognito.ACA.CognitoAuth(cognito.OPENID_CONNECT);
    auth.userhandler = {
        onSuccess: function(result) {
            console.log(result);
            alert("Sign in success");
            window.location = '/';
        },
        onFailure: function(err) {
            console.log(err);
            alert("Error!");
        }
    };
    return auth;
}