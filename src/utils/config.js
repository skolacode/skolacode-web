let API_ROOT_URL = 'http://localhost:8080/api/v1';

switch (window.location.host) {
	case 'sb-web.skolacode.com':
	case 'skolacode-sb-web.appspot.com':
		API_ROOT_URL = 'https://skolacode-sb-api.appspot.com/api/v1';
		break;

	case 'skolacode.com':
	case 'skolacode.appspot.com':
		API_ROOT_URL = 'https://api.appspot.com/api/v1';
		break;

	default:
		API_ROOT_URL = 'http://localhost:8080/api/v1';
		break;
}

export {
	API_ROOT_URL,
};