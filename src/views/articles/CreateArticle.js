//@flow
import React, { Component } from 'react';
import ArticleEditor from './components/ArticleEditor';

type Props = {};

type State = {};

class CreateArticle extends Component<Props, State> {
	render() {
		return (
			<div>
				<ArticleEditor isEditing={false} />
			</div>
		);
	}
}

export default CreateArticle;
