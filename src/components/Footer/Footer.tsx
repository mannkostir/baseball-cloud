import React from 'react';
import { StyledFooter } from './Footer.styles';

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <span>© 2018 BaseballCloud</span>
        <a href="/legal/terms">Terms of Service</a>
        <a href="/legal/privacy">Privacy Policy</a>
      </div>
      <div>
        <a href="https://baseballcloud.blog" target="_blank">
          Blog
        </a>
        <a href="http://twitter.com/baseballcloudus" target="_blank">
          Twitter
        </a>
        <a href="http://www.instagram.com/baseballcloudus/" target="_blank">
          Instagram
        </a>
        <a href="http://www.facebook.com/BaseballCloudUS/" target="_blank">
          Facebook
        </a>
      </div>
    </StyledFooter>
  );
};

export default Footer;
