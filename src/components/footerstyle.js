// components/FooterStyles.js

import styled from "styled-components";

export const Box = styled.div`
	padding: 3.5% 2.5%;
	background-color: rgb(241, 121, 121);
	// position: absolute;
	bottom: 0;
	width: 95%;

	@media (max-width: 1000px) {
		// padding: 70px 30px;
	}
`;

export const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1200px;
	margin: 0 auto;
	/* background: red; */
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-left: 40px;
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fill,
		minmax(240px, 1fr)
	);
	grid-gap: 20px;

	@media (max-width: 1000px) {
		grid-template-columns: repeat(
			auto-fill,
			minmax(200px, 1fr)
		);
	}
`;

export const FooterLink = styled.a`
	color: black;
	margin-bottom: 20px;
	font-size: 18px;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
		transition: 200ms ease-in;
	}
`;

export const Heading = styled.p`
	font-size: 24px;
	color: black;
	margin-bottom: 40px;
	font-weight: bold;
`;
