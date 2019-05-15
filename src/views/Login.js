//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import type { LocationShape } from 'react-router-dom';
import queryString from 'query-string';

type Props = {
	location: LocationShape;
};

type State = {};

const Container = styled.div`
	background-color: ${props => props.theme.thirdColor};
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;

	.red-box {
		padding: 5px 10px;
		color: red;
		border: 1px solid red;
		font-size: 12px;
		margin-bottom: 15px;
	}

	.box {
		background-color: ${props => props.theme.secondaryColor};
		width: 400px;
		padding: 20px;
		border: 1px solid ${props => props.theme.primaryColor};
		box-shadow: 10px 10px;
		margin: 150px auto 20px;
		text-align: center;
		.skolacode {
			font-family: 'Montserrat';
			letter-spacing: 5px;
		}

		.info {
			margin: 15px 0 15px;
			font-size: 16px;
		}

		.btn {
			background-color: ${props => props.theme.primaryColor};
			color: ${props => props.theme.secondaryColor};
			font-size: 14px;
			padding: 10px 0;
			width: 200px;
			margin: 0 auto 10px;
			cursor: pointer;
		}
	}
`;

class Login extends Component<Props, State> {
	render() {
		const { location: { search } } = this.props;
		const { error } = queryString.parse(search);
		return (
			<Container>
				<div className="box">
					{error === 'unauthorize'
						&& (
							<div className="red-box">
								You are not authorized to Sign In
							</div>
						)}
					<div className="content">
						<div className="skolacode">
							SKOLACODE.<span style={{ fontSize: 12 }}>COM</span>
						</div>
						<div className="info">
							WELCOME
						</div>
					</div>
					<div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 20 }}>
						Only white listed user can Sign In.
					</div>
					<div
						className="btn"
						onClick={() => {
							window.location.href = 'http://localhost:8080/api/v1/oauth/github';
						}}
					>
						Sign In with GitHub
					</div>
					<div style={{ fontSize: 12 }}>
						We require social login to prevent abuse.
					</div>
				</div>
			</Container>
		);
	}
}

export default withRouter(Login);
