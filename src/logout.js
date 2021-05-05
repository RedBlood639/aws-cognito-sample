require("aws-sdk/dist/aws-sdk");
var AWS = window.AWS;
var util = require('./util');
var cognito = require('./cognito');

export function init() {
    util.switchDisplayContainer('LogoutContainer');
    var cognitoUser = cognito.userPool.getCurrentUser();
    if (cognitoUser) {
        if (AWS.config.credentials && AWS.config.credentials.clearCachedId) {
            AWS.config.credentials.clearCachedId();
        }
        cognitoUser.signOut();
    }
}