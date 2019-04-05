//@flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ArticleEditor from './components/ArticleEditor';
import { fetchArticle } from '../../store/articles/actions';

type Props = {
	article: Object;
	match: {
		params: {
			id: string;
		}
	};
	fetchArticle: Function;
};

type State = {
	isLoading: boolean;
};

class EditArticle extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		const { id } = params;

		this.props.fetchArticle({
			body: {
				id,
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
		const { article } = this.props;
		const { isLoading } = this.state;
		return (
			<div>
				{!isLoading && <ArticleEditor isEditing={true} article={article}/>}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { articlesReducer: { article } } = state;
	return { article };
};

const mapDispatchToProps = dispatch => {
	return {
		fetchArticle: req => dispatch(fetchArticle(req)),
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditArticle));
