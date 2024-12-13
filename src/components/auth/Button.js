// components/Button.js
import styled, { css } from 'styled-components';

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  color: white;

  ${(props) =>
    props.primary &&
    css`
      background-color: #3578FF;
      &:hover {
        background-color: #0056b3;
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      color: #3578FF;
      background-color: #D9E8FF;
      &:hover {
        background-color: #5a6268;
      }
    `}
`;

export default Button;
