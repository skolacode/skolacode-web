// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { TodoReducerType } from '../../store/todo/reducer';
import { setNewTodo } from '../../store/todo/actions';
import { Wrapper } from '../../components/style';

import data_icon from '../../assets/icons/data.png';
import padlock_icon from '../../assets/icons/padlock.png';

type Props = {
	todoReducer: TodoReducerType;
	setNewTodo: Function;
}

type State = {
	newTodo: string;
	todos: Array<string>;
}

const MainContent = styled.table`
	td {
		padding: 70px 0;
		color: ${props => props.theme.secondaryColor};
		font-weight: bold;
		.main {
			font-size: 35px;
			font-family: 'Montserrat', sans-serif;
			letter-spacing: 7.5px;
			span {
				font-size: 25px;
			}
		}

		.secondary {
			font-size: 20px;
			margin-bottom: 20px;
			font-weight: normal;
			line-height: 30px;
		}

		.button {
			background-color: ${props => props.theme.secondaryColor};
			padding: 10px 0;
			font-size: 18px;
			color: ${props => props.theme.primaryColor};
			text-align: center;
			width: 210px;
		}
	}
`;

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
			border-bottom: 1px solid #eee;
			:last-child {
				border-bottom: none;
			}
		}
	}

	.second {
		width: 250px;
		padding-left: 25px;

		.box {
			text-align: center;
			border: 1px solid ${props => props.theme.primaryColor};
			padding: 30px;
			box-shadow: 10px 10px 0 ${props => props.theme.primaryColor};

			.img {
				img {
					width: 100%;
				}
				margin-bottom: 20px;
			}

			.text {
				opacity: 0.7;
			}
		}
	}
`;

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

class Home extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			newTodo: '',
			todos: [],
		};
	}

	componentDidMount() {}

	handleNewTodo = (e: { target: { value: string } }) => {
		const { value } = e.target;
		this.setState({
			newTodo: value,
		});
	}

	addNewTodo = () => {
		this.props.setNewTodo(this.state.newTodo);
	}

	render() {
		return (
			<div>
				<div style={{ backgroundColor: '#000' }}>
					<Wrapper>
						<MainContent>
							<tbody>
								<tr>
									<td>
										<div className="main">SKOLACODE.<span>COM</span></div>
										<div className="secondary">
											A platform build focusing on students
											<div />
											and beginners. Get started by writing
											<div />
											your first tech article. 
										</div>
										<div className="button">
											Join Now
										</div>
									</td>
									<td style={{ width: 256, textAlign: 'right' }}>
										<img src={data_icon} alt="" style={{ width: '100%' }}/>
									</td>
								</tr>
							</tbody>
						</MainContent>
					</Wrapper>
				</div>
				<Wrapper>
					<div style={{ marginTop: 25 }}>
						<Content>
							<tbody>
								<tr>
									<td className="first">
										<div style={{ marginBottom: 25, fontSize: 25, fontWeight: 'bold' }}>
											LATEST ARTICLES
										</div>

										{[0,10,2,3,4,5].map(each => (
											<>
												<ArticleContainer key={each}>
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
												<div className="border-line"/>
											</>
										))}

									</td>
									<td className="second">
										<div className="box">
											<div className="img">
												<img src={padlock_icon} alt="" />
											</div>
											<div className="text">
												This space are dedicated for sponser
											</div>
										</div>
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
	const { todoReducer } = state;
	return {
		todoReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setNewTodo: newTodo => dispatch(setNewTodo(newTodo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);