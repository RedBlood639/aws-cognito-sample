var login = require('./login');
var signup = require('./signup');
var confirm = require('./confirm');
var complete = require('./complete');
var logout = require('./logout');
var util = require('./util');
var oidc = require('./oidc');

function rooter() {
    if (window.location.pathname === '/') {
        switch (window.location.hash) {
            case '#':
            case '':
                login.init();
                break;
            case '#signup':
                signup.init();
                break;
            case '#confirm':
                confirm.init();
                break;
            case '#complete':
                complete.init();
                break;
            case '#logout':
                logout.init();
                break;
            default:
                util.switchDisplayContainer('LoginContainer');
                break;
        }
    } else if (window.location.pathname === '/idpresponse.html') {
        oidc.init(); 
    } else{
        alert('404');
        window.location = '/';
    }
}

window.onhashchange = rooter;
window.onload = rooter;