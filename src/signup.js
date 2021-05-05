var cognito = require('./cognito');
var util = require('./util');
var form = document.getElementById('FormSignup');

export function init() {
    util.switchDisplayContainer('SignupContainer');
    form.addEventListener('submit', _handleForm, false);
}

function _handleForm(event) {
    event.preventDefault();
    _runCognito(
        document.getElementById('InputUserName').value,
        document.getElementById('InputEmail').value,
        document.getElementById('InputPhone').value,
        document.getElementById('InputPassword').value
    );
}

function _runCognito(username, mail, phone, password) {
    var attributeList = [
        new cognito.ACI.CognitoUserAttribute({Name: 'email', Value: mail}),
        new cognito.ACI.CognitoUserAttribute({Name: 'phone_number', Value: phone})
    ];

    cognito.userPool.signUp(username, password, attributeList, null,
        _cognitoCallBack
    );
}

function _cognitoCallBack(err, result) {
    if (err) {
        alert(err.message || JSON.stringify(err));
        return;
    }
    var cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    window.location.hash = '#confirm'
}
