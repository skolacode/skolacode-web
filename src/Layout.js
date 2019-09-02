//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';
import { connect } from 'react-redux';

type Props = {
	children: Node;
	history: RouterHistory;
	userReducer: Object;
}

type State = {
	isPhoneNavigations: boolean;
}

const NavigationContainer = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	border-bottom: 1px solid ${props => props.theme.thirdColor};
	height: 60px;
	background-color: ${props => props.theme.secondaryColor};
	z-index: 10;
	transition: all 0.25s;
	overflow: hidden;

	.phone-nav-options {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		padding: 10px 0;
		:hover {
			opacity: 0.7;
		}
	}
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

	.nav > span {
		margin-left: 50px;
		padding: 10px 0;
		:hover {
			opacity: 0.7;
		}
	}

	.phone-nav {
		display: none;
	}

	@media only screen and (max-width: 800px) {
		.nav {
			display: none;
		}

		.phone-nav {
			display: initial;
		}
	}
`;

const Container  = styled.div`
	width: 100%;
	margin: 0px auto 50px;
	padding-top: 60px;
	padding-bottom: 20px;
`;

const ProfileImg = styled.div`
	background-color: #000;
	border-radius: 100%;
	width: 30px;
	height: 30px;
	margin-left: 25px;
	background-image: url(${props => props.src});
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
`;

const Footer = styled.footer`
	background-color: black;
	position: absolute;
  bottom: 0;
  width: 100%;
	height: 100px;
	color: ${props => props.theme.secondaryColor};
	overflow: hidden;
	
	.skolacode {
		text-align: center;
		font-family: 'Montserrat';
		letter-spacing: 5px;
		padding-top: 20px;
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
	constructor(props) {
		super(props);
		this.state = {
			isPhoneNavigations: false,
		};
	}


	onClickPhoneNav = () => {
		const { isPhoneNavigations } = this.state;
		this.setState({
			isPhoneNavigations: !isPhoneNavigations,
		});
	}

	render() {
		const { userReducer: { user }, history } = this.props;
		const { isPhoneNavigations } = this.state;
		return (
			<div style={{ overflow: 'hidden' }}>
				<NavigationContainer>
					<NavigationTable>
						<tbody>
							<tr>
								<td style={{ textAlign: 'left', fontFamily: 'Montserrat', letterSpacing: 5 }}>
									<div>
										SKOLACODE.<span style={{ fontSize: 12 }}>COM</span>
									</div>
								</td>
								<td className="nav">
									{NAVIGATION.map(each => (
										<span
											key={each.link}
											onClick={() => {
												history.push(each.link);
											}}
										>
											{each.name}
										</span>
									))}
								</td>
								<td className="phone-nav">
									<div
										style={{
											fontSize: 50, fontWeight: 'bold', textAlign: 'center'
										}}
										onClick={this.onClickPhoneNav}
									>
										=
									</div>
								</td>
								{user.displayName
									&& (
										<td>
											<Link to="/profile">
												<ProfileImg src={user.avatarUrl}/>
											</Link>
										</td>
									)}
							</tr>
						</tbody>
					</NavigationTable>
				</NavigationContainer>

				<NavigationContainer style={{ height: isPhoneNavigations ? 180 : 60, zIndex: 9, top: isPhoneNavigations ? 60 : 0 }}>
					{NAVIGATION.map(each => (
						<div
							className="phone-nav-options"
							key={each.link}
							onClick={() => {
								history.push(each.link);
							}}
						>
							{each.name}
						</div>
					))}
				</NavigationContainer>

				<Container>
					{this.props.children}
				</Container>
				
				<Footer>
					<div className="skolacode">
						SKOLACODE.<span style={{ fontSize: 12 }}>COM</span>
					</div>
					<div style={{ fontSize: 8, textAlign: 'center', marginTop: 20 }}>
						<div>Icons made by <a style={{ color: '#fff' }} href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a style={{ color: '#fff' }} href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a style={{ color: '#fff' }} href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
					</div>
				</Footer>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { userReducer } = state;
	return {
		userReducer,
	};
};

export default withRouter(connect(mapStateToProps)(Layout));
