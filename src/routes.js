import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import Home from './views/home/Home';
import Articles from './views/articles/Articles';
import Profile from './views/profile/Profile';

function AppRouter() {
	return (
		<Router>
			<Provider store={store}>
				<App>
					<Route path="/" exact component={Home} />
					<Route path="/articles" exact component={Articles} />

					<Route path="/profile" exact component={Profile} />
				</App>
			</Provider>
		</Router>
	);
}

export default AppRouter;