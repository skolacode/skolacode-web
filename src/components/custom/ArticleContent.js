//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactMarkdown from 'react-markdown/with-html';

import { Wrapper } from '../../components/ui/style';

type Props = {
	article: Object;
	author: Object;
};

type State = {};

const HeaderImg = styled.div`
	height: 500px;
	width: 100%;
	background-image: url(${props => props.src});
	background-position: center;
	background-size: cover;
`;


const Container = styled.div`
	margin: 25px 0;
	
	.title {
		font-size: 30px;
		font-weight: bold;
		margin-bottom: 15px;
	}

	.description {
		font-size: 20px;
		opacity: 0.75;
		margin-bottom: 15px;
	}

	.author {
		margin: 35px 0;
		display: table;
		width: 100%;
		font-size: 14px;

		div {
			float: left;
		}

		.avatar {
			height: 70px;
			width: 70px;
			border: 1px solid ${props => props.theme.primaryColor};
			border-radius: 100%;
		}

		.name {
			text-transform: uppercase;
			padding: 25px 0 0 15px;
			opacity: 0.6;
		}
	}
`;

const Content = styled.div`
	font-size: 20px;
	opacity: 0.9;
	line-height: 1.58;
	letter-spacing: -.003em;
	font-family: 'Times New Roman', Times, serif;

	p {
		margin: 30px 0;
	}

	ol, ul {
		margin-left: 40px;
	}

	pre {
		background-color: ${props => props.theme.primaryColor};
		color: ${props => props.theme.secondaryColor};
		padding: 30px;
		border-radius: 10px;
		margin: 30px 0;
	}

	pre > code {
		border-radius: 0;
		padding: 0;
		background-color: transparent;
		color: ${props => props.theme.secondaryColor};
	}

	blockquote {
		border-left: 10px solid ${props => props.theme.thirdColor};
		padding-left: 20px;
		opacity: 0.6;
		font-family: 'Open Sans';
		margin: 30px 0;
	}

	code {
		background-color: #ddd;
		padding: 0 10px;
		border-radius: 3px;
	}

	.link {
		color: #0000EE;
		text-decoration: underline;
		cursor: pointer;
	}
`;

const LinkRenderer = (props) => {
	return (
		<span
			className="link"
			onClick={() => {
				console.log('props => ', props);
				const i = props.href.indexOf('http');
				if (i !== -1) {
					window.location.href = props.href;
				}
			}}
		>
			{props.children}
		</span>
	);
};

class ArticleContent extends Component<Props, State> {
	componentDidMount() {}

	render() {
		const { article, author } = this.props;
		return (
			<div style={{ paddingBottom: 100 }}>
				<div>
					<HeaderImg src={article.headerImgUrl} alt="" style={{ width: '100%' }}/>
				</div>
				<Wrapper style={{ margin: '0 auto' }}>
					<Container style={{ padding: '0 25px' }}>
						<div className="title">
							{article.title}
						</div>
						<div className="description">
							{article.description}
						</div>
						<div className="author">
							<div style={{ width: 70 }}>
								<img className="avatar" src={author.avatarUrl} alt="" />
							</div>
							<div className="name">
								{author.displayName} {moment(article.createdAt).format('DD MMMM YYYY')}
							</div>
						</div>
						<Content>
							<ReactMarkdown
								source={article.content}
								escapeHtml={false}
								renderers={{link: LinkRenderer}}
							/>
						</Content>
					</Container>
				</Wrapper>
			</div>
		);
	}
}

export default ArticleContent;
