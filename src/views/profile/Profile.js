//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import { Wrapper, PageLabel } from '../../components/ui/style';
import { fetchUserPublishedArticles, fetchUserUnpublishedArticles } from '../../store/articles/actions';
import UserArticles from './components/UserArticles';
import { WEB_URL } from '../../utils/config';
import DataLoader from '../../components/custom/DataLoader';

type Props = {
	user: Object;
	userPublishedArticles: Array<Object>;
	userUnpublishedArticles: Array<Object>;
	fetchUserPublishedArticles: Function;
	fetchUserUnpublishedArticles: Function;
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
	:hover {
		opacity: 0.85;
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

	async componentDidMount() {
		const { userPublishedArticles, userUnpublishedArticles } = this.props;

		if (userPublishedArticles.length === 0) {
			await this.props.fetchUserPublishedArticles({
				body: {},
				success: () => {},
				error: () => {},
			});
		}

		if (userUnpublishedArticles.length === 0) {
			this.props.fetchUserUnpublishedArticles({
				body: {},
				success: () => {
					this.setState({
						isLoading: false,
					});
				},
				error: () => {},
			});
		}

		if (userPublishedArticles.length !== 0 && userUnpublishedArticles.length !== 0) {
			this.setState({
				isLoading: false,
			});
		} else if (userUnpublishedArticles.length !== 0) {
			this.setState({
				isLoading: false,
			});
		}
	}

	onChangeTab = (val: string) => {
		this.setState({
			tab: val,
		});
	}

	render() {
		const { userPublishedArticles, userUnpublishedArticles, user } = this.props;
		const { isLoading, tab } = this.state;

		const userInfo = [
			{
				label: 'Name',
				value: user.displayName,
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
									<div style={{ marginTop: 30 }}>
										<Tab
											primary={false}
											style={{
												padding: 10,
												fontSize: 12,
												backgroundColor: '#000',
												color: '#fff',
											}}
											onClick={() => {
												Cookies.remove('SKOLACODE-SID');
												window.location.href = WEB_URL;
											}}
										>
											LOGOUT
										</Tab>
									</div>
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
							<Link
								style={{
									color: '#fff',
								}}
								to="/articles/new"
							>
								<Tab
									primary={false}
									style={{
										backgroundColor: '#000',
										boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
										borderRadius: 2,
									}}
								>
									+ NEW ARTICLE
								</Tab>
							</Link>
						</div>
					</div>
					<div>
						{isLoading
							? (
								<DataLoader style={{ marginTop: 75 }} width={50} />
							) : (
								<>
									{tab === 'articles'
										? (
											<UserArticles articles={userPublishedArticles} />
										) : (
											<UserArticles articles={userUnpublishedArticles} />
										)}
								</>
							)}
					</div>
				</Wrapper>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { articlesReducer: { userPublishedArticles, userUnpublishedArticles } } = state;

	return { userPublishedArticles, userUnpublishedArticles };
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUserPublishedArticles: req => dispatch(fetchUserPublishedArticles(req)),
		fetchUserUnpublishedArticles: req => dispatch(fetchUserUnpublishedArticles(req)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Profile);
