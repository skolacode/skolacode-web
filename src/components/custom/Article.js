//@flow
import React, { Component } from 'react';
import styled from 'styled-components';

import data_icon from '../../assets/icons/data.png';

const ArticleContainer = styled.div`
	display: table;

	.title {
			font-weight: bold;
			font-size: 16px;
			margin-bottom: 5px;
		}

	.line {
		height: 5px;
		width: 70px;
		background-color: ${props => props.theme.primaryColor};
		margin-bottom: 10px;
	}

	.content {
		font-size: 14px;
		margin-bottom: 15px;
	}

	.author {
		opacity: 0.7;
		font-size: 10px;
		text-transform: uppercase;
	}
`;

class Article extends Component<{}, {}> {
	render() {
		return (
			<ArticleContainer>
				<div style={{ float: 'left', width: '25%' }}>
					<img src={data_icon} alt="" style={{ width: '100%' }}/>
				</div>
				<div style={{ float: 'left', width: '75%', paddingLeft: 15 }}>
					<div className="title">
						SQL vs NoSql
					</div>
					<div className="line"/>
					<div className="content">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
					</div>
					<div className="author">
						IBRAHIM 9 MARCH 2019
					</div>
				</div>
			</ArticleContainer>
		);
	}
}
export default Article;
