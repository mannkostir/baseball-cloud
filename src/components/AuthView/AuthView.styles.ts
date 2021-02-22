import styled from 'styled-components/macro';
import backgroundImage from '@/assets/images/background.png';

export const Container = styled.section`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex: 1;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background: hsla(0, 0%, 100%, 0.8);
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  width: 100%;
  max-width: 450px;
`;
