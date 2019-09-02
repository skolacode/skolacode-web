//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Wrapper, PageLabel } from '../../components/ui/style';

const reactNativeIcon = require('../../assets/icons/react-native.svg');
const reactIcon = require('../../assets/icons/react.svg');
const laravelIcon = require('../../assets/icons/laravel.svg');
const microsoftIcon = require('../../assets/icons/office.png');
const resumeIcon = require('../../assets/icons/resume.png');

type Props = {};

type State = {};

const MainContainer = styled.div`
	display: table;
	width: 100%;

	@media only screen and (max-width: 800px) {
		padding: 0 15px 50px;
	}
`;

const Container = styled.div`
	padding: 20px;
	border: 1px solid ${props => props.theme.primaryColor};
	box-shadow: 5px 5px ${props => props.theme.primaryColor};
	float: left;
	width: 45%;
	text-align: center;
	transition: all 0.25s;

	:hover {
		box-shadow: 10px 10px ${props => props.theme.primaryColor};;
	}

	img {
		width: 75px;
		height: 75px;
		margin-bottom: 15px;
	}
`;

const COURSES_OFFERED = [
	{
		img: reactNativeIcon,
		name: 'React Native',
		desc: 'Mobile App development IOS & Android',
		link: 'https://docs.google.com/document/d/1LU9DWFxKrSWjcrCrn2cI2zoVbGo2DGP8dVIFWf3p1M8',
	},
	{
		img: reactIcon,
		name: 'ReactJs',
		desc: 'Web App development, Front-End only',
		link: 'https://docs.google.com/document/d/1Km-5NDSFdzkr4jRdMCrFJeZkI_5Qkebd6hHqo3Eh5cw',
	},
	{
		img: laravelIcon,
		name: 'Laravel',
		desc: 'Web App development with Back-End',
		link: 'https://docs.google.com/document/d/1alfJ4sL9kljLZ0YxuD0lfCQ4LN7ot7gyztJezpDeCoE',
	},
	{
		img: microsoftIcon,
		name: 'Microsoft Office',
		desc: 'Word, Excel & Power Point. Tons of tips will be shared',
		link: 'https://docs.google.com/document/d/19nryd-s_mrvROW7hjOi4b947GoRAMVNSqIshJt6E3HA',
	},
	{
		img: resumeIcon,
		name: 'Online Resume',
		desc: 'Build online resume via jekyll or pure HTML and CSS and deploy via GitHub pages',
		link: 'https://docs.google.com/document/d/1A-wcdauoalAzdR23jUJ2yKYEj4K_L6vn2e0yQZkGGHQ',
	},
];

class Courses extends Component<Props, State> {
	render() {
		return (
			<Wrapper style={{ marginTop: 25 }}>
				<PageLabel>
					Courses
				</PageLabel>

				<MainContainer>
					{COURSES_OFFERED.map((each, i) => (
						<>
							<a href={each.link} key={each.name}>
								<Container style={{ margin: (i + 1) % 2 === 0 ? '25px 0 25px 5%' : '25px 5% 25px 0' }}>
									<img src={each.img} alt="" />
									<div style={{ marginBottom: 10 }}>
										{each.name}
									</div>
									<div style={{ color: '#aaa', fontSize: 12 }}>
										{each.desc}
									</div>
									<div style={{ color: '#000', fontSize: 10, marginTop: 15 }}>
										Currently only available in <strong>Malayisa</strong>
									</div>
								</Container>
							</a>
							{(i + 1) % 2 === 0 && <div style={{ clear: 'both' }} />}
						</>
					))}
				</MainContainer>
			</Wrapper>
		);
	}
}

export default Courses;
