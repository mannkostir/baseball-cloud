import React from 'react';
import * as Styled from './PersonalInfo.styles';

const PersonalInfo = () => {
  return (
    <Styled.Container>
      <Styled.TraitsList>
        <Styled.TraitsItem>
          <span>Age</span>
          <span>118</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Height</span>
          <span>4 ft 8 in</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Weight</span>
          <span>195 lbs</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Throws</span>
          <span>R</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Bats</span>
          <span>L</span>
        </Styled.TraitsItem>
      </Styled.TraitsList>
    </Styled.Container>
  );
};

export default PersonalInfo;
