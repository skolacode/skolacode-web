//@flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchArticle } from '../../store/articles/actions';

import ArticleContent from '../../components/custom/ArticleContent';
import { Wrapper } from '../../components/ui/style';
import DataLoader from '../../components/custom/DataLoader';

type Props = {
	article: Object;
	fetchArticle: Function;
	match: {
		params: {
			id: string;
		}
	};
};

type State = {
	isLoading: boolean;
};

class ReadArticle extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		const { match: { params: { id } } } = this.props;

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
				{isLoading
					? (
						<DataLoader />
					) : (
						<Wrapper>
							<ArticleContent
								article={article}
								author={article.author}
							/>
						</Wrapper>
					)}
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
)(ReadArticle));
