// @flow
import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import './App.css';

const theme = {
	primaryColor: '#000000',
	secondaryColor: '#ffffff',
};

type Props = {
	children: Node;
}

class App extends Component<Props, {}> {
	render() {
		return (
			<div className="App">
				<div>
					<ThemeProvider theme={theme}>
						{this.props.children}
					</ThemeProvider>
				</div>
			</div>
		);
	}
}

export default App;
