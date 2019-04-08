import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	max-width: 800px;
	margin: auto;
`;

const PageLabel = styled.div`
	margin-bottom: 25px;
	font-size: 25px;
	font-weight: bold;
`;

const Button = styled.span`
	margin-top: 10px;
	padding: 10px 15px;
	color: ${props => props.theme.secondaryColor};
	text-align: center;
	font-weight: bold;
	background-color: ${props => props.bgColor};
	font-size: 14px;
	position: relative;
	top: ${props => props.primary ? '5px' : '0'};
	cursor: pointer;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;

export {
	Wrapper,
	PageLabel,
	Button,
};