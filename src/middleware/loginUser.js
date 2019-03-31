//@flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { fetchUser } from '../store/user/actions';


// This function takes a component...
function loginUser(WrappedComponent) {
	class LoginUser extends Component {
		constructor(props) {
			super(props);
			this.state = {
				isLoading: true,
			};
		}

		componentDidMount() {
			console.log(this.props);
			const { user, history } = this.props;
			const accessToken = Cookies.get('SKOLACODE-SID');

			if (accessToken) {
				if (!user._id) {
					this.props.fetchUser({
						body: {},
						success: () => {
							this.setState({
								isLoading: false,
							});
						},
						error: () => {
							history.push('/login?error=failed');
						},
					});
				} else {
					this.setState({
						isLoading: false,
					});
				}
			} else {
				history.push('/');
			}
		}

		componentWillUnmount() {
			this.setState({
				isLoading: true,
			});
		}

		render() {
			return (
				!this.state.isLoading && <WrappedComponent user={this.props.user} />
			);
		}
	}

	const mapStateToProps = state => {
		const { userReducer: { user } } = state;
		return { user };
	};
	
	const mapDispatchToProps = dispatch => {
		return {
			fetchUser: req => dispatch(fetchUser(req)),
		};
	};
	
	return withRouter(connect(
		mapStateToProps,
		mapDispatchToProps,
	)(LoginUser));
}

export default loginUser;