import React, { HTMLAttributes } from 'react';
import * as Styled from './Card.styles';

interface ICardProps {
  children: JSX.Element | JSX.Element[];
}

const Card = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & ICardProps) => {
  return <Styled.Container {...props}>{children}</Styled.Container>;
};

export default Card;
