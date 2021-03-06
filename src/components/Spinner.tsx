import React from "react";
import styled, {keyframes} from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div<{ size: number }>`
  display: inline-block;
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: ${loadingAnimation} 1.33s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-width: ${props => props.size / 10}px;
    border-style: solid;
    border-color: #000 transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

type SpinnerProps = {
	size: number;
	margin?: boolean;
}

const Spinner = ({size, margin = false}: SpinnerProps) => (
	<Container style={margin ? {height: "100%", width: "100%"} : {}}>
		<Loader size={size}>
			<div/>
			<div/>
			<div/>
			<div/>
		</Loader>
	</Container>
);

export default Spinner;