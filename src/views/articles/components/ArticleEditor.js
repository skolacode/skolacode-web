//@flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { UserReducerType } from '../../../store/user/reducer';
import { Wrapper, PageLabel, Button } from '../../../components/ui/style';
import { createArticle, editArticle } from '../../../store/articles/actions';
import ArticleContent from '../../../components/custom/ArticleContent';

type Props ={
	isEditing: boolean;
	article: Object;
	history: RouterHistory;
	createArticle: Function;
	editArticle: Function;
	userReducer: UserReducerType;
}

type State = {
	isLoading: boolean;
	isSaving: boolean;
	isRequired: boolean;
	isPreview: boolean;
	textAreaHeight: number;
	headerImgUrl: string;
	title: string;
	description: string;
	content: string;
}

const Rules = styled.div`
	width: 600px;
	padding: 10px;
	background-color: ${props => props.theme.thirdColor};
	margin-bottom: 25px;

	div {
		font-weight: bold;
	}

	ul {
		margin-left: 25px;
	}
`;

const Container = styled.div`
	.label {
		margin-bottom: 10px;
		font-weight: bold;
	}

	input {
		width: 100%;
		padding: 10px;
		border: 1px solid ${props => props.theme.primaryColor};
		outline: none;
		:focus {
			outline: none;
		}
	}

	textarea {
		font-size: 20px;
		width: 100%;
		border: 1px solid ${props => props.theme.primaryColor};
		resize: none;
		min-height: 300px;
		padding: 20px;
		outline: none;
		:focus {
			outline: none;
		}
	}
`;

const Menu = styled.table`
	background-color: ${props => props.theme.secondaryColor};
	margin-bottom: 20px;

	td {
		padding: 15px;
		background-color: #eee;
	}
`;

const HeaderImg = styled.div`
	margin-bottom: 20px;
	.upload-button {
		padding: 5px 0;
		border: 1px solid ${props => props.theme.primaryColor};
		margin-bottom: 5px;
		width: 100px;
		text-align: center;
		font-size: 12px;
		font-weight: bold;
		background-color: ${props => props.theme.thirdColor};
		cursor: pointer;
		:hover {
			background-color: ${props => props.theme.secondaryColor};
		}
	}
`;

const ContentContainer = styled.div`
	margin-bottom: 20px;
`;

class ArticleEditor extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isSaving: false,
			isRequired: false,
			isPreview: false,
			textAreaHeight: 0,
			headerImgUrl: '',
			title: '',
			description: '',
			content: '',
		};
	}

	async componentDidMount() {
		const { isEditing, article } = this.props;

		if (isEditing) {
			await this.setState({
				isLoading: false,
				title: article.title,
				description: article.description,
				headerImgUrl: article.headerImgUrl,
				content: article.content,
			});

			await this.setState({
				textAreaHeight: this.textAreaEl.scrollHeight,
			});
		} else {
			this.setState({
				isLoading: false,
			});
		}
	}

	handleChange = (e, key) => {
		this.setState({
			[key]: e.target.value,
		});
	} 

	onHandleAction = (isPublished) => {
		const { isEditing, article, history } = this.props;
		const { headerImgUrl, title, description, content, isSaving } = this.state;

		let body = {
			headerImgUrl,
			title,
			description,
			content,
			isPublished,
			tags: [],
		};

		const requiredFields = [headerImgUrl, title, description, content];

		let isRequired = false;

		this.setState({
			isRequired: false,
		});

		for (let i = 0; i < requiredFields.length; i += 1) {
			if (requiredFields[i] === '') {
				isRequired = true;
				break;
			}
		}

		if (isRequired) {
			this.setState({
				isRequired: true,
			});
		}
		
		if(!isSaving && !isRequired) {
			this.setState({
				isSaving: true,
			});

			if (isEditing) {
				this.props.editArticle({
					body: {
						id: article._id,
						data: body,
					},
					success: () => {
						history.push(`/articles/${article._id}/read`);
					},
					error: () => {
						this.setState({
							isSaving: false,
						});
					},
				});
			} else {
				this.props.createArticle({
					body,
					success: (articleId) => {
						history.push(`/articles/${articleId}/read`);
					},
					error: () => {
						this.setState({
							isSaving: false,
						});
					},
				});
			}
		}
	}

	render() {
		const { isEditing, article, userReducer: { user } } = this.props;
		const { 
			textAreaHeight, headerImgUrl, title, description, content, isSaving, isRequired, isPreview,
		} = this.state;
		return (
			<div style={{ marginTop: 25 }}>
				<Wrapper>
					<div style={{ display: 'table', width: '100%' }}>
						<div style={{ float: 'left', width: '40%' }}>
							<PageLabel>
								NEW ARTICLE
							</PageLabel>
						</div>
						<div style={{ float: 'left', width: '60%', textAlign: 'right', opacity: isSaving ? 0.5 : 1 }}>
							<Button
								style={{ marginRight: 15 }}
								bgColor="#007FFF"
								primary
								onClick={() => {
									this.setState({
										isPreview: !isPreview,
									});
								}}
							>
								{isPreview ? 'EDITOR' : 'PREVIEW'}
							</Button>
							<Button
								style={{ marginRight: 15 }}
								bgColor="#FFA500"
								primary
								onClick={() => this.onHandleAction(false)}
							>
								{(isEditing && article.isPublished) ? 'UNPUBLISH' : 'SAVE'}
							</Button>
							<Button
								bgColor="#000"
								primary
								onClick={() => this.onHandleAction(true)}
							>
								{(isEditing && article.isPublished) ? 'SAVE' : 'SAVE & PUBLISH'}
							</Button>
						</div>
					</div>

					{isPreview
						? (
							<ArticleContent
								article={{
									headerImgUrl,
									title,
									description,
									content,
									createdAt: Date.now()
								}}
								author={user}
							/>
						) : (
							<>
							<Rules>
								<div>
									Guidelines:
								</div>
								<ul>
									<li>Markdown are supported for the content writing</li>
									<li>Make sure the content are not too short</li>
									<li>Make sure the delivered content are understandable by readers</li>
									<li>Make sure to credit the author if the content or image are not yours</li>
									<li>All fields are required</li>
								</ul>
							</Rules>

							<Container>
								<Menu>
									<tbody>
										<tr>
											<td style={{ width: 100, paddingRight: 10 }}>
												<Button
													bgColor="#000"
													primary={false}
												>
													UPLOAD
												</Button>
											</td>
											<td>
												<input
													type="text"
													disabled
													style={{ width: '100%' }}
													placeholder="Uploade image or directly paste the url in the editor"
												/>
											</td>
										</tr>
									</tbody>
								</Menu>

								{isRequired
									&& (
										<div style={{ fontSize: 20, marginBottom: 20, backgroundColor: 'red', padding: '5px 10px', color: '#fff' }}>
											<em>All fields are required</em>
										</div>
									)}

								<HeaderImg>
									<div className="label">
										* Header Image
									</div>
									<div>
										<input
											type="text"
											placeholder="Header Image Url"
											style={{ maxWidth: 500, fontSize: 12 }}
											onChange={(e) => this.handleChange(e, 'headerImgUrl')}
											value={headerImgUrl}
										/>
									</div>
								</HeaderImg>
								<ContentContainer>
									<div className="label">
										* Title
									</div>
									<div>
										<input
											type="text"
											placeholder="Title"
											style={{ fontSize: 30 }}
											onChange={(e) => this.handleChange(e, 'title')}
											value={title}
										/>
									</div>
								</ContentContainer>

								<ContentContainer>
									<div className="label">
										* Description
									</div>
									<div>
										<input
											type="text"
											placeholder="Description"
											style={{ fontSize: 20 }}
											onChange={(e) => this.handleChange(e, 'description')}
											value={description}
										/>
									</div>
								</ContentContainer>

								<ContentContainer>
									<div className="label">
										* Content
									</div>
									<div>
										<textarea
											type="text"
											placeholder="Start typing here (markdown supported)"
											style={{ height: textAreaHeight }}
											onChange={(e) => {
												this.setState({
													content: e.target.value,
													textAreaHeight: this.textAreaEl.scrollHeight,
												});
											}}
											value={content}
											ref={el => this.textAreaEl = el}
										/>
									</div>
								</ContentContainer>
							</Container>
							</>
						)}
				</Wrapper>
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

const mapDispatchToProps = dispatch => {
	return {
		createArticle: req => dispatch(createArticle(req)),
		editArticle: req => dispatch(editArticle(req)),
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(ArticleEditor));