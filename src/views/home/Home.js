// @flow
import React, { Component } from 'react';

type Props = {}

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
		}
	}

	componentDidMount() {};

	handleNewTodo = (e: Event) => {
		const { value } = e.target;

		this.setState({
			newTodo: value,
		});
	}

	addNewTodo = () => {
		const { newTodo, todos } = this.state;
		if (newTodo) {
			todos.push(newTodo);
		}
		this.setState({
			newTodo: '',
			todos,
		});
	}

	render() {
		const { newTodo, todos } = this.state;
		return (
			<div>
				<div>
					<div style={{ padding: '20px 0' }}>
						Add Todo List
					</div>
					<div>
						<input
							value={newTodo}
							type="text"
							onChange={this.handleNewTodo}
						/>
						<button onClick={this.addNewTodo}>
							ADD
						</button>
					</div>

					<div>
						<ol>
							{todos.map(each => (
								<li>
									{each}
								</li>
							))}
						</ol>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;