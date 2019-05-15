//@flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchArticle } from '../../store/articles/actions';

import data_icon from '../../assets/icons/data.png';
import ArticleContent from '../../components/custom/ArticleContent';
import { Wrapper } from '../../components/ui/style';

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
						<div style={{ marginTop: 50, textAlign: 'center' }}>
							<img src={data_icon} style={{ width: 100 }} alt=""/>
							<div style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#000' }}>
								Loading content...
							</div>
						</div>
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
