//@flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Article } from '../../../components';
import { Button } from '../../../components/ui/style';

type Props = {
	articles: Array<Object>;
};

type State = {};

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

class UserArticles extends Component<Props, State> {
	render() {
		const { articles } = this.props;

		return (
			<ArticlesTable>
				<tbody>
					{articles.map(each => (
						<tr key={each._id}>
							<td>
								<Link to={`/articles/${each._id}/read`}>
									<Article article={each}/>
								</Link>
							</td>
							<td style={{ width: 200, textAlign: 'right' }}>
								<div style={{ fontWeight: 'bold' }}>
									<Link to={`/articles/${each._id}/edit`}>
										<Button bgColor="#FFA500">
											EDIT
										</Button>
									</Link>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</ArticlesTable>
		);
	}
}

export default UserArticles;
