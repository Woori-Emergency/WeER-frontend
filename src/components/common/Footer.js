// Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 15px;
  font-size: 12px;
  color: #666;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  width: 100%;
`;

function Footer() {
  return (
    <FooterContainer>
      © 2024. WeER Co., Ltd. All rights reserved.
    </FooterContainer>
  );
}

export default Footer;