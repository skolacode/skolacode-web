//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Article from './Article';
import NoticeBoard from './NoticeBoard';
import { Wrapper, PageLabel, Button } from '../ui/style';
import { fetchPublishedArticles } from '../../store/articles/actions';
import DataLoader from './DataLoader';

type Props = {
	title: string;
	publishedArticles: Array<Object>;
	publishedArticlesCursor: Number;
	fetchPublishedArticles: Function;
}

type State = {
	isLoading: boolean;
}

const Content = styled.table`
	tr {
		vertical-align: top;
	}

	.first {
		.border-line {
			padding-bottom: 30px;
			margin-bottom: 40px;
			height: 1px;
			width: 100%;
			border-bottom: 1px solid ${props => props.theme.thirdColor};
			:last-child {
				border-bottom: none;
			}
		}
	}

	.second {
		width: 250px;
		padding-left: 25px;
	}

	@media only screen and (max-width: 800px) {
		.first {
			padding: 0 20px 30px;
		}
		.second {
			display: none;
		}
	}
`;

class ArticleWithNoticeBoard extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		if (this.props.publishedArticles.length === 0) {
			this.props.fetchPublishedArticles({
				success: () => {
					this.setState({
						isLoading: false,
					});
				},
				error: () => {},
			});
		}
	}

	onClickLoadMore = () => {
		const { publishedArticlesCursor } = this.props;

		this.setState({
			isLoading: true,
		});

		this.props.fetchPublishedArticles({
			body: {
				cursor: publishedArticlesCursor,
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
		const { title, publishedArticles, publishedArticlesCursor } = this.props;
		return (
			<div>
				<Wrapper>
					<div style={{ marginTop: 25 }}>
						<Content>
							<tbody>
								<tr>
									<td className="first">
										<PageLabel>
											{title}
										</PageLabel>

										{publishedArticles.length === 0 && this.state.isLoading
											? (
												<DataLoader width={50} />
											) : (
												publishedArticles.map(each => (
													<div key={each._id}>
														<Link to={`/articles/${each._id}/read`}>
															<Article article={each}/>
															<div className="border-line"/>
														</Link>
													</div>
												))
											)}		

										{publishedArticlesCursor !== 0
											&& (
												<>
												{this.state.isLoading
													? (
														<DataLoader
															width={25} 
															style={{ marginTop: 10 }}
															textStyle={{ fontSize: 15, marginTop: 10 }}
														/>
													) : (
														<div style={{ textAlign: 'center' }}>
															<Button
																onClick={this.onClickLoadMore}
															>
																Load more...
															</Button>
														</div>
													)}
												</>
											)}
									</td>
									<td className="second">
										<NoticeBoard />
									</td>
								</tr>
							</tbody>
						</Content>
					</div>
				</Wrapper>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const {
		articlesReducer: { publishedArticles, publishedArticlesCursor }
	} = state;

	return {
		publishedArticles,
		publishedArticlesCursor,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPublishedArticles: req => dispatch(fetchPublishedArticles(req)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ArticleWithNoticeBoard);
