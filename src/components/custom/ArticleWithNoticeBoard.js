//@flow
import React, { Component } from 'react';
import styled from 'styled-components';

import Article from './Article';
import NoticeBoard from './NoticeBoard';
import { Wrapper } from '../ui/style';

type Props = {
	title: string;
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
	render() {
		return (
			<div>
				<Wrapper>
					<div style={{ marginTop: 25 }}>
						<Content>
							<tbody>
								<tr>
									<td className="first">
										<div style={{ marginBottom: 25, fontSize: 25, fontWeight: 'bold' }}>
											{this.props.title}
										</div>

										{[0,10,2,3,4,5].map(each => (
											<>
												<Article key={each} />
												<div className="border-line"/>
											</>
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

export default ArticleWithNoticeBoard;
