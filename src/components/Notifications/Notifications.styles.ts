import styled, { keyframes } from 'styled-components/macro';

const progressBar = keyframes`
  from {
    width: 100%
  }

  to {
    width: 0
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 10px;
  z-index: 10;
`;

export const NotificationWrapper = styled.div`
  position: relative;
  background: #60bb71;
  color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgb(0 0 0 / 60%);
  border-radius: 10px;
  margin: 10px 0;
  min-height: 70px;
`;

export const ProgressBarContainer = styled.div`
  background: transparent;
  height: 6px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const StatusText = styled.span`
  font-size: 1.4em;
`;

export const ProgressBar = styled.span<{
  animationTimeMs: number;
  isMouseOver?: boolean;
}>`
  display: block;
  height: 100%;
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 0;
    background: #379448;
    animation: ${progressBar} ${(props) => props.animationTimeMs}ms ease-out;
    ${(props) => props.isMouseOver && 'animation: none'};
    animation-fill-mode: both;
  }
`;
