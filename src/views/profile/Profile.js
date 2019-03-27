//@flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { Wrapper } from '../../components/ui/style';
import Article from '../../components/custom/Article';

type State = {
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

class Profile extends Component<{}, State> {
	constructor() {
		super();
		this.state = {
			tab: 'articles',
		};
	}

	onChangeTab = (val) => {
		this.setState({
			tab: val,
		});
	}

	render() {
		const { tab } = this.state;

		const userInfo = [
			{
				label: 'Name',
				value: 'Ahmad Ibrahim',
			},
			{
				label: 'Email',
				value: 'aibrahim3546@gmail.com',
			},
			{
				label: 'Role',
				value: 'Master',
			}
		];
		
		return (
			<div style={{ marginTop: 25 }}>
				<Wrapper>
					<User>
						<tbody>
							<tr>
								<td style={{ width: 150 }}>
									<AvatarImage src="https://avatars0.githubusercontent.com/u/31366174?s=460&v=4"/>
								</td>
								<td style={{ paddingLeft: 50 }}>
									{userInfo.map(each => (
										<>
											<div key={each.label} className="label">
												{each.label}
											</div>
											<div className="value">
												{each.value}
											</div>
										</>
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
								YOUR ARTICLES
							</Tab>
							<Tab
								primary={tab === 'unpublished'}
								onClick={() => this.onChangeTab('unpublished')}
							>
								UNPUBLISHED ARTICLES
							</Tab>
						</div>
					</div>
					<div>
						<ArticlesTable>
							<tbody>
								{[0,1,1,1,23,0].map(each => (
									<tr>
										<td>
											<Article />
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
					</div>
				</Wrapper>
			</div>
		);
	}
}

export default Profile;
