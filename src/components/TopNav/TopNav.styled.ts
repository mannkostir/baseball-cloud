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
  &:hover {
    background: #eee;
  }
`;
