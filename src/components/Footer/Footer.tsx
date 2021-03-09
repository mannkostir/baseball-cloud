import React from 'react';
import * as Styled from './Footer.styles';

const Footer = () => {
  return (
    <Styled.FooterContainer>
      <Styled.Legal>
        <Styled.Copyright>© 2018 BaseballCloud</Styled.Copyright>
        <a href="/legal/terms">Terms of Service</a>
        <a href="/legal/privacy">Privacy Policy</a>
      </Styled.Legal>
      <Styled.Social>
        <a href="https://baseballcloud.blog">Blog</a>
        <a href="http://twitter.com/baseballcloudus">Twitter</a>
        <a href="http://www.instagram.com/baseballcloudus/">Instagram</a>
        <a href="http://www.facebook.com/BaseballCloudUS/">Facebook</a>
      </Styled.Social>
    </Styled.FooterContainer>
  );
};

export default Footer;
