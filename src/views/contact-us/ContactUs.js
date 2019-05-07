// @flow
import React, { Component } from 'react';
import { Wrapper } from '../../components/ui/style';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
	width: 400px;
	text-align: center;
	border: 1px solid ${props => props.theme.primaryColor};
	margin: 50px auto;
`;

class ContactUs extends Component<{}, {}> {
	componentDidMount() {}

	render() {
		return (
			<Wrapper>
				<Container>
					<div style={{ fontSize: 16, paddingBottom: 15 }}>
						At the moment we are only available via email
					</div>
					<div style={{ fontWeight: 'bold', fontSize: 20 }}>
						skolacode@gmail.com
					</div>
				</Container>
			</Wrapper>
		);
	}
}

export default ContactUs;