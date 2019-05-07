//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
	children: Node;
}

type State = {}

const NavigationContainer = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	border-bottom: 1px solid ${props => props.theme.thirdColor};
	height: 60px;
	background-color: ${props => props.theme.secondaryColor};
	z-index: 10;
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
		cursor: pointer;
	}

	.nav {
		width: 150px;
		:hover {
			opacity: 0.7;
		}
	}
`;

const Container  = styled.div`
	width: 100%;
	margin: 0px auto;
	padding-top: 60px;
	padding-bottom: 20px;
`;

const Footer = styled.footer`
	background-color: black;
	position: absolute;
  bottom: 0;
  width: 100%;
	height: 50px;
	color: ${props => props.theme.secondaryColor};
	
	.skolacode {
		text-align: center;
		font-family: 'Montserrat';
		letter-spacing: 5px;
		padding-top: 15px;
	}
`;

const NAVIGATION = [
	{
		name: 'HOME',
		link: '/',
	},
	{
		name: 'ARTICLES',
		link: '/articles',
	},
	{
		name: 'COURSES',
		link: '/courses',
	},
	{
		name: 'CONTACT US',
		link: '/contact-us',
	},
];

class Layout extends Component<Props, State> {
	render() {
		return (
			<div>
				<NavigationContainer>
					<NavigationTable>
						<tbody>
							<tr>
								<td style={{ textAlign: 'left', fontFamily: 'Montserrat', letterSpacing: 5 }}>
									<div>
										SKOLACODE.<span style={{ fontSize: 12 }}>COM</span>
									</div>
								</td>
								{NAVIGATION.map(each => (
									<td key={each.link} className="nav">
										<div>
											<Link to={each.link}>
												{each.name}
											</Link>
										</div>
									</td>
								))}
							</tr>
						</tbody>
					</NavigationTable>
				</NavigationContainer>
				<Container>
					{this.props.children}
				</Container>
				<Footer>
					<div className="skolacode">
						SKOLACODE.<span style={{ fontSize: 12 }}>COM</span>
					</div>
					<div style={{ fontSize: 10, textAlign: 'center' }}>
						<div>Icons made by <a style={{ color: '#fff' }} href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a style={{ color: '#fff' }} href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a style={{ color: '#fff' }} href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
					</div>
				</Footer>
			</div>
		);
	}
}

export default Layout;
