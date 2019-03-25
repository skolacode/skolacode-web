//@flow
import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
	children: Node;
}

type State = {}

const NavigationContainer = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	border-bottom: 1px solid ${props => props.theme.primaryColor};
	height: 60px;
`;

const NavigationTable = styled.table`
	width: 100%;
	max-width: 800px;
	text-align: right;
	font-weight: bold;
	font-size: 16px;
	margin: auto;

	td {
		padding: 20px 0;
	}

	.nav {
		width: 150px;
	}
`;

const Container  = styled.div`
	width: 100%;
	margin: 60px auto 0;
`;

class Layout extends Component<Props, State> {
	render() {
		return (
			<div>
				<NavigationContainer>
					<NavigationTable>
						<tbody>
							<tr>
								<td style={{ textAlign: 'left' }}>
									<div>
										SKOLACODE.<span style={{ fontSize: 12 }}>COM</span>
									</div>
								</td>
								<td className="nav">
									<div>
										HOME
									</div>
								</td>
								<td className="nav">
									<div>
										ARTICLES
									</div>
								</td>
								<td className="nav">
									<div>
										COURSES
									</div>
								</td>
								<td className="nav">
									<div>
										CONTACT US
									</div>
								</td>
							</tr>
						</tbody>
					</NavigationTable>
				</NavigationContainer>
				<Container>
					{this.props.children}
				</Container>
			</div>
		);
	}
}

export default Layout;
