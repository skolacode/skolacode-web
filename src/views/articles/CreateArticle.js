//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown/with-html';

import { Wrapper, PageLabel } from '../../components/ui/style';

type State = {
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
		padding: 10px;
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

const Button = styled.span`
	margin-top: 10px;
	padding: 10px 15px;
	color: ${props => props.theme.secondaryColor};
	text-align: center;
	font-weight: bold;
	background-color: ${props => props.bgColor};
	font-size: 14px;
	position: relative;
	top: ${props => props.primary ? '5px' : '0'};
	cursor: pointer;
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

class CreateArticle extends Component<{}, State> {
	constructor() {
		super();
		this.state = {
			textAreaHeight: 0,
			headerImgUrl: '',
			title: '',
			description: '',
			content: '',
		};
	}
	render() {
		const { textAreaHeight, content } = this.state;
		return (
			<div style={{ marginTop: 25 }}>
				<Wrapper>
					<div style={{ display: 'table', width: '100%' }}>
						<div style={{ float: 'left', width: '40%' }}>
							<PageLabel>
								NEW ARTICLE
							</PageLabel>
						</div>
						<div style={{ float: 'left', width: '60%', textAlign: 'right' }}>
							<Button
								style={{ marginRight: 15 }}
								bgColor="#007FFF"
								primary
							>
								PREVIEW
							</Button>
							<Button
								style={{ marginRight: 15 }}
								bgColor="#FFA500"
								primary
							>
								SAVE
							</Button>
							<Button
								bgColor="#000"
								primary
							>
								SAVE & PUBLISH
							</Button>
						</div>
					</div>
					
					<Rules>
						<div>
							Guidelines:
						</div>
						<ul>
							<li>Markdown are supported for the content writing</li>
							<li>Make sure the content are not too short</li>
							<li>Make sure the delivered content are understandable by readers</li>
							<li>Make sure to credit the author if the content or image are not yours</li>
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

						<HeaderImg>
							<div className="label">
								Header Image
							</div>
							<div>
								<input
									type="text"
									placeholder="Header Image Url"
									style={{ maxWidth: 500, fontSize: 12 }}
								/>
							</div>
						</HeaderImg>
						<ContentContainer>
							<div className="label">
								Title
							</div>
							<div>
								<input
									type="text"
									placeholder="Title"
									style={{ fontSize: 30 }}
								/>
							</div>
						</ContentContainer>

						<ContentContainer>
							<div className="label">
								Description
							</div>
							<div>
								<input
									type="text"
									placeholder="Description"
									style={{ fontSize: 20 }}
								/>
							</div>
						</ContentContainer>

						<ContentContainer>
							<div className="label">
								Content
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
									ref={el => this.textAreaEl = el}
								/>
							</div>
						</ContentContainer>
						<div style={{ fontSize: 20 }}>
							<ReactMarkdown
								source={content}
								escapeHtml={false}
							/>
						</div>
					</Container>
				</Wrapper>
			</div>
		);
	}
}

export default CreateArticle;