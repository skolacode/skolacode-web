//@flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import ReactMarkdown from 'react-markdown/with-html';

import { fetchArticle } from '../../store/articles/actions';
import { Wrapper } from '../../components/ui/style';

type Props = {
	article: Object;
	fetchArticle: Function;
	match: {
		params: {
			id: string;
		}
	};
};

type State = {
	isLoading: boolean;
};

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

	blockquote {
		border-left: 10px solid ${props => props.theme.thirdColor};
		padding-left: 20px;
		opacity: 0.6;
		font-family: 'Open Sans';
		margin: 30px 0;
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

class ReadArticle extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		const { match: { params: { id } } } = this.props;

		this.props.fetchArticle({
			body: {
				id,
			},
			success: () => {
				this.setState({
					isLoading: false,
				});
			},
			error: () => {},
		});
	}

	render() {
		const { article } = this.props;
		const { isLoading } = this.state;
		return (
			<div>
				{isLoading
					? (
						'Loading...'
					) : (
						<div style={{ paddingBottom: 100 }}>
							<div>
								<HeaderImg src={article.headerImgUrl} alt="" style={{ width: '100%' }}/>
							</div>
							<Wrapper style={{ margin: '0 auto', border: '0px solid black', maxWidth: 900 }}>
								{/* <div>
									<img src={article.headerImgUrl} alt="" style={{ width: '100%' }}/>
								</div> */}
								<Container style={{ padding: '0 50px' }}>
									<div className="title">
										{article.title}
									</div>
									<div className="description">
										{article.description}
									</div>
									<div className="author">
										<div style={{ width: 70 }}>
											<img className="avatar" src={article.author.avatarUrl} alt="" />
										</div>
										<div className="name">
											{article.author.displayName} {moment(article.createdAt).format('DD MMMM YYYY')}
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
					)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { articlesReducer: { article } } = state;

	return { article }; 
};

const mapDispatchToProps = dispatch => {
	return {
		fetchArticle: req => dispatch(fetchArticle(req)),
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(ReadArticle));
