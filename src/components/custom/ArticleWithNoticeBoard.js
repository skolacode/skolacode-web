//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Article from './Article';
import NoticeBoard from './NoticeBoard';
import { Wrapper, PageLabel } from '../ui/style';
import { fetchPublishedArticles } from '../../store/articles/actions';

type Props = {
	title: string;
	fetchPublishedArticles: Function;
}

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
	}
`;

class ArticleWithNoticeBoard extends Component<Props, {}> {
	componentDidMount() {
		this.props.fetchPublishedArticles({
			success: () => {

			},
			error: () => {},
		});
	}

	render() {
		return (
			<div>
				<Wrapper>
					<div style={{ marginTop: 25 }}>
						<Content>
							<tbody>
								<tr>
									<td className="first">
										<PageLabel>
											{this.props.title}
										</PageLabel>

										{[0,10,2,3,4,5].map(each => (
											<div key={each}>
												<Article />
												<div className="border-line"/>
											</div>
										))}

									</td>
									<td className="second">
										<NoticeBoard />
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
	const {
		articlesReducer: { articles }
	} = state;

	return {
		articles
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPublishedArticles: req => dispatch(fetchPublishedArticles(req)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ArticleWithNoticeBoard);
