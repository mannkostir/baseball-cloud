import styled from 'styled-components';
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
`;
