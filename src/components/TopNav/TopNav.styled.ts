import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import userImage from '@/assets/images/user_image.png';

export const Container = styled.nav``;
export const NavList = styled.ul`
  display: flex;
  align-items: center;
`;
export const NavItem = styled.li`
  position: relative;
  height: 100%;
`;
export const NavLink = styled(Link)`
  padding: 0 8px;
  color: #788b99 !important;
  text-decoration: none !important;
  display: flex;
  align-items: center;
  &:hover::after {
    border-bottom: 4px solid #788b99;
    border-color: rgba(120, 139, 153, 0.4);
    content: '';
    left: 0;
    right: 0;
    position: absolute;
    transform: translateY(100%);
    bottom: -11px;
  }
`;
export const UserImage = styled.div`
  background: url(${userImage});
  width: 32px;
  height: 32px;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 8px;
  cursor: pointer;
`;
export const UserDropdownToggle = styled.button`
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  line-height: 19px;
  font-weight: 400;
  position: relative;
  &:hover {
    background: #eee;
  }
`;
export const UserDropdownContent = styled.div<{ isDropdownOpened?: boolean }>`
  display: ${(props) => (props.isDropdownOpened ? 'flex' : 'none')};
  position: absolute;
  height: 100px;
  width: 50px;
  background: red;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transform: translateY(100%);
  margin-top: 12px;
  padding: 8px 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  flex-direction: column;
  z-index: 10;
  &::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -8px;
    right: 25px;
    z-index: 2;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent #ffffff transparent;
  }
`;

export const UserDropdownLink = styled(Link)`
  color: #788b99;
  display: block;
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
    text-decoration: none;
    color: #788b99;
  }
`;

export const UserSignOutLink = styled.a`
  color: #788b99;
  display: block;
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
    text-decoration: none;
    color: #788b99;
  }
`;
