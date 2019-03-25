import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Home from './views/home/Home';
import store from './store';

function AppRouter() {
	return (
		<Router>
			<Provider store={store}>
				<App>
					<Route path="/" exact component={Home} />
				</App>
			</Provider>
		</Router>
	);
}

export default AppRouter;