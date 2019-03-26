import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import Home from './views/home/Home';
import Articles from './views/articles/Articles';

function AppRouter() {
	return (
		<Router>
			<Provider store={store}>
				<App>
					<Route path="/" exact component={Home} />
					<Route path="/articles" exact component={Articles} />
				</App>
			</Provider>
		</Router>
	);
}

export default AppRouter;