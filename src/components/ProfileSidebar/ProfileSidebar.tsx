import React, { HTMLAttributes } from 'react';
import * as Styled from './ProfileSidebar.styles';

interface IProfileSidebar {
  children: JSX.Element | JSX.Element[] | string;
}

const ProfileSidebar = ({ children }: IProfileSidebar) => {
  return <div>{children}</div>;
};

const SectionTitle = ({
  children,
  ...props
}: { children: string } & HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Styled.SectionTitleContainer>
      <Styled.SectionTitle {...props}>{children}</Styled.SectionTitle>
    </Styled.SectionTitleContainer>
  );
};

ProfileSidebar.DataItem = Styled.DataItem;
ProfileSidebar.SectionTitle = SectionTitle;
ProfileSidebar.Heading = Styled.Heading;
ProfileSidebar.Value = Styled.Value;
ProfileSidebar.InlineInputsWrapper = Styled.InlineInputsWrapper;
ProfileSidebar.TextInput = Styled.TextInput;

export default ProfileSidebar;
