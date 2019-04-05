//@flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Article } from '../../components/';
import { Wrapper, PageLabel } from '../../components/ui/style';
import { fetchUserPublishedArticles } from '../../store/articles/actions';

type Props = {
	user: Object;
	userPublishedArticles: Array<Object>;
	fetchUserPublishedArticles: Function;
}

type State = {
	isLoading: boolean;
	tab: string;
}

const User = styled.table`
	font-weight: bold;
	border-bottom: 2px solid ${props => props.theme.thirdColor};

	td {
		padding: 25px 0;
	}

	.label {
		opacity: 0.5;
		font-size: 14px;
		margin-bottom: 2.5px;
	}
	
	.value {
		font-size: 20px;
		margin-bottom: 10px;
	}
`;

const AvatarImage = styled.div`
	height: 150px;
	width: 150px;
	border: 1px solid ${props => props.theme.primaryColor};
	box-shadow: 10px 10px;
	border-radius: 100%;
	background-image: url(${props => props.src});
	background-position: center;
	background-size: cover;
`;

const Tab = styled.span`
	border: 1px solid ${props => props.theme.primaryColor};
	box-shadow: ${props => props.primary && `10px 10px ${props.theme.primaryColor}`};
	background-color: ${props => props.primary && props.theme.thirdColor};
	padding: 15px;
	font-weight: bold;
	cursor: pointer;
`;

const ArticlesTable = styled.table`
	td {
		padding: 50px 0;
		border-bottom: 1px solid ${props => props.theme.thirdColor};
	}
	tr {
		:last-child {
			td {
				border-bottom: none;
			}
		}
	}
`;

class Profile extends Component<Props, State> {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			tab: 'articles',
		};
	}

	componentDidMount() {
		this.props.fetchUserPublishedArticles({
			body: {},
			success: () => {
				this.setState({
					isLoading: false,
				});
			},
			error: () => {},
		});
	}

	onChangeTab = (val: string) => {
		this.setState({
			tab: val,
		});
	}

	render() {
		const { userPublishedArticles, user } = this.props;
		const { isLoading, tab } = this.state;

		const userInfo = [
			{
				label: 'Name',
				value: user.displayName,
			},
			{
				label: 'Email',
				value: user.email,
			},
			{
				label: 'Role',
				value: user.role,
			}
		];
		
		return (
			<div style={{ marginTop: 25 }}>
				<Wrapper>
					<PageLabel>
						PROFILE
					</PageLabel>
					<User>
						<tbody>
							<tr>
								<td style={{ width: 150 }}>
									<AvatarImage src={user.avatarUrl}/>
								</td>
								<td style={{ paddingLeft: 50 }}>
									{userInfo.map(each => (
										<div key={each.label}>
											<div key={each.label} className="label">
												{each.label}
											</div>
											<div className="value">
												{each.value}
											</div>
										</div>
									))}
								</td>
							</tr>
						</tbody>
					</User>
					<div style={{ margin: '50px 0 25px' }}>
						<div>
							<Tab
								primary={tab === 'articles'}
								style={{ marginRight: 20 }}
								onClick={() => this.onChangeTab('articles')}
							>
								ARTICLES
							</Tab>
							<Tab
								primary={tab === 'unpublished'}
								style={{ marginRight: 20 }}
								onClick={() => this.onChangeTab('unpublished')}
							>
								UNPUBLISHED ARTICLES
							</Tab>
							<Tab
								primary={tab === 'review'}
								onClick={() => this.onChangeTab('review')}
							>
								REVIEW ARTICLES
							</Tab>
						</div>
					</div>
					<div>
						{isLoading
							? (
								'Loading...'
							) : (
								<ArticlesTable>
									<tbody>
										{userPublishedArticles.map(each => (
											<tr key={each._id}>
												<td>
													<Link to={`/articles/${each._id}/read`}>
														<Article article={each}/>
													</Link>
												</td>
												<td style={{ width: 200, textAlign: 'right' }}>
													<div style={{ fontWeight: 'bold' }}>
														...
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</ArticlesTable>
							)}
					</div>
				</Wrapper>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { articlesReducer: { userPublishedArticles} } = state;

	return { userPublishedArticles };
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUserPublishedArticles: req => dispatch(fetchUserPublishedArticles(req)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Profile);
