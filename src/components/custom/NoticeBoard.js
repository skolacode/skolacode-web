//@flow
import React, { Component } from 'react';
import styled from 'styled-components';

import padlock_icon from '../../assets/icons/padlock.png';

const Box = styled.div`
	text-align: center;
	border: 1px solid ${props => props.theme.primaryColor};
	padding: 30px;
	box-shadow: 10px 10px 0 ${props => props.theme.primaryColor};

	.img {
		img {
			width: 100%;
		}
		margin-bottom: 20px;
	}

	.text {
		opacity: 0.7;
	}
`;

class NoticeBoard extends Component<{}, {}> {
	render() {
		return (
			<Box>
				<div className="img">
					<img src={padlock_icon} alt="" />
				</div>
				<div className="text">
					This space are dedicated for sponser
				</div>
			</Box>
		);
	}
}

export default NoticeBoard;