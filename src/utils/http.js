import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
	timeout: 120000,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}
});

const api = (method, url, body) => {
	const token = '';

	const customHeaders = {
		'Authorization': `Bearer ${token}`,
	};

	return instance(
		{
			method,
			url,
			data: body,
			headers: customHeaders,
		}
	).then(res => {
		console.log('RESPONSE => ', res);
		return res.data;
	}).catch(err => {
		console.error(err);
		return err;
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