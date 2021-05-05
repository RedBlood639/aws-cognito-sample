var cognito = require('./cognito');
var util = require('./util');
var form = document.getElementById('FormConfirm');

export function init() {
    util.switchDisplayContainer('ConfirmContainer');
    form.addEventListener('submit', _handleForm, false);
}

function _handleForm(event) {
    event.preventDefault();
    _runCognito(
        document.getElementById('InputConfirmUserName').value,
        document.getElementById('InputConfirmCode').value,
    );
}

function _runCognito(name, code) {
    var userData = {Username: name, Pool: cognito.userPool};
    var cognitoUser = new cognito.ACI.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, _cognitoCallBack);
}

function _cognitoCallBack(err, result) {
    if (err) {
        alert(err.message || JSON.stringify(err));
        return;
    }
    console.log('call result: ' + result);
    window.location.hash = '#complete'
}
