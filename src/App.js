// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import { connect } from 'react-redux';

import './App.css';
import Layout from './Layout';
import { fetchUser } from './store/user/actions';

const theme = {
	primaryColor: '#000000',
	secondaryColor: '#ffffff',
	thirdColor: '#fdf2de',
};

type Props = {
	children: Node;
	location: Location;
	fetchUser: Function;
}

class App extends Component<Props, {}> {
	constructor(props) {
		super(props);
		const { location: { search } } = this.props;
		const { accessToken } = queryString.parse(search);

		if (accessToken) {
			Cookies.set('SKOLACODE-SID', accessToken);
		}
	}

	componentDidMount() {
		this.props.fetchUser({
			body: {},
			success: () => {},
			error: () => {},
		});
	}

	render() {
		return (
			<div className="App">
				<ThemeProvider theme={theme}>
					<Layout>
						{this.props.children}
					</Layout>
				</ThemeProvider>
			</div>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
	return {
		fetchUser: req => dispatch(fetchUser(req)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
