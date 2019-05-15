let API_ROOT_URL = 'http://localhost:8080/api/v1';
let WEB_URL = 'http://localhost:3000';

switch (window.location.host) {
case 'sb-web.skolacode.com':
case 'skolacode-sb-web.appspot.com':
	API_ROOT_URL = 'https://skolacode-sb-api.appspot.com/api/v1';
	WEB_URL = `https://${window.location.host}`;
	break;

case 'skolacode.com':
case 'skolacode.appspot.com':
	API_ROOT_URL = 'https://api.appspot.com/api/v1';
	WEB_URL = `https://${window.location.host}`;
	break;

default:
	API_ROOT_URL = 'http://localhost:8080/api/v1';
	WEB_URL = `http://${window.location.host}`;
	break;
}

export {
	API_ROOT_URL,
	WEB_URL,
};