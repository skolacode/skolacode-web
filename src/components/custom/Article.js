//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

type Props = {
	article: Object;
}

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

	.description {
		font-size: 14px;
		margin-bottom: 15px;
	}

	.author {
		opacity: 0.7;
		font-size: 10px;
		text-transform: uppercase;
	}
`;

class Article extends Component<Props, {}> {
	render() {
		const { article } = this.props;
		return (
			<ArticleContainer>
				<div style={{ float: 'left', width: '25%' }}>
					<img src={article.headerImgUrl} alt="" style={{ width: '100%' }}/>
				</div>
				<div style={{ float: 'left', width: '75%', paddingLeft: 15 }}>
					<div className="title">
						{article.title}
					</div>
					<div className="line"/>
					<div className="description">
						{article.description}
					</div>
					<div className="author">
						{article.author.displayName} {moment(article.createdAt).format('DD MMMM YYYY')}
					</div>
				</div>
			</ArticleContainer>
		);
	}
}
export default Article;
