import axios from 'axios';
import Cookies from 'js-cookie';
import { API_ROOT_URL } from './config';

const instance = axios.create({
	baseURL: API_ROOT_URL,
	timeout: 120000,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}
});

const api = (method, url, body) => {
	let customHeaders = {};
	const accessToken = Cookies.get('SKOLACODE-SID');
	
	if (accessToken) {
		customHeaders = {
			'Authorization': `Bearer ${accessToken}`,
		};
	}

	return instance(
		{
			method,
			url,
			data: body,
			headers: customHeaders,
		}
	).then(res => {
		console.log('RESPONSE => ', res.data);
		return Promise.resolve(res.data);
	}).catch(err => {
		console.error(JSON.stringify(err.response.data));
		return Promise.reject(err);
	});
};

const GET = (url, body = {}) => api('get', url, body);
const POST = (url, body = {}) => api('post', url, body);
const PATCH = (url, body = {}) => api('patch', url, body);
const PUT = (url, body = {}) => api('put', url, body);
const DELETE = (url, body = {}) => api('delete', url, body);

export default {
	GET,
	POST,
	PATCH,
	PUT,
	DELETE,
};