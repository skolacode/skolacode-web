import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import loginUser from './middleware/loginUser';

import Home from './views/home/Home';
import Login from './views/Login';
import Profile from './views/profile/Profile';
import Courses from './views/courses/Courses';
import ContactUs from './views/contact-us/ContactUs';

import Articles from './views/articles/Articles';
import CreateArticle from './views/articles/CreateArticle';
import ReadArticle from './views/articles/ReadArticle';
import EditArticle from './views/articles/EditArticle';

function AppRouter() {
	return (
		<Router>
			<Provider store={store}>
				<App>
					<Route path="/" exact component={Home} />
					<Route path="/profile" exact component={loginUser(Profile)} />
					<Route path="/login" exact component={Login} />
					<Route path="/courses" exact component={Courses} />
					<Route path="/contact-us" exact component={ContactUs} />

					<Route path="/articles" exact component={Articles} />
					<Route path="/articles/:id/read" exact component={ReadArticle} />
					<Route path="/articles/new" exact component={loginUser(CreateArticle)} />
					<Route path="/articles/:id/edit" exact component={loginUser(EditArticle)} />
				</App>
			</Provider>
		</Router>
	);
}

export default AppRouter;