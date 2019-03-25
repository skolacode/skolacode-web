// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TodoReducerType } from '../../store/todo/reducer';
import { setNewTodo } from '../../store/todo/actions';

type Props = {
	todoReducer: TodoReducerType;
	setNewTodo: Function;
}

type State = {
	newTodo: string;
	todos: Array<string>;
}

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
		const { todoReducer:  { todo } } = this.props; 
		const { newTodo } = this.state;
		return (
			<div>
				<div>Current Todo => {todo}</div>
				<div>
					<input value={newTodo} type="text" onChange={this.handleNewTodo}/>
					<button onClick={this.addNewTodo}>
						change
					</button>
				</div>
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