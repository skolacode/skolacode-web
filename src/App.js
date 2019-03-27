// @flow
import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import './App.css';
import Layout from './Layout';

const theme = {
	primaryColor: '#000000',
	secondaryColor: '#ffffff',
	thirdColor: '#fdf2de',
};

type Props = {
	children: Node;
}

class App extends Component<Props, {}> {
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

export default App;
