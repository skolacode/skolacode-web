// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { TodoReducerType } from '../../store/todo/reducer';
import { setNewTodo } from '../../store/todo/actions';
import { Wrapper } from '../../components/ui/style';

import data_icon from '../../assets/icons/data.png';
import { ArticleWithNoticeBoard } from '../../components';

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
		color: ${props => props.theme.primaryColor};
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
			border: 1px solid ${props => props.theme.primaryColor};
			box-shadow: 10px 10px;
			cursor: pointer;
			transition: all 0.25s;

			:hover {
				box-shadow: 5px 5px;
			}
		}
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
				<div style={{ backgroundColor: '#fdf2de' }}>
					<Wrapper>
						<MainContent>
							<tbody>
								<tr>
									<td>
										<div className="main">SKOLACODE.<span>COM</span></div>
										<div className="secondary">
											A platform build focusing on students
											<div />
											and beginners. Get started by checking
											<div />
											out the courses we offer.
										</div>

										<Link to="/courses">
											<div className="button">
												Courses
											</div>
										</Link>
									</td>
									<td style={{ width: 256, textAlign: 'right' }}>
										<img src={data_icon} alt="" style={{ width: '100%' }}/>
									</td>
								</tr>
							</tbody>
						</MainContent>
					</Wrapper>
				</div>
				<ArticleWithNoticeBoard title="LATEST ARTICLES"/>
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