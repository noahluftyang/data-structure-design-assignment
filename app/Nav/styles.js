import styled from 'styled-components';

export const StyledNav = styled.nav`
  align-items: center;
  background-color: #fff;
  display: flex;
  padding: 1.2rem 1rem;

  & > a:not(:first-child) {
    margin-left: 0.25rem;
  }
`;
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  flex: 1 1 auto;
`;
