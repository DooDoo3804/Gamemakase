import styled from "@emotion/styled";
import { Common } from "../styles/Common";

export const MainHeaderWrapper = styled.div`
  display: flex;
  background-color: ${Common.colors.mainColor01};
  color: ${Common.colors.lightGray01};
  height: 3.5rem;
  margin: 0;
  padding: 0.2rem 0.5rem;
  justify-content: space-between;
  align-items: center;

  .logo-wrapper {
    display: flex;
    width: 5rem;
    height: 3rem;
  }

  .logo-img {
    object-fit: contain;
    position: absolute;
    height: 3rem;
    opacity: 1;
  }

  .hover {
    transition: opacity 0.5s linear;
  }

  .hidden {
    opacity: 0;
  }

  .menu-wrapper {
    display: flex;
    font-family: "Sarpanch", sans-serif;
    align-items: center;
  }

  .single-menu {
    margin: 0rem 0.3rem;
    white-space: pre-wrap;
  }

  .profile-img {
    width: 1.8rem;
    height: 1.8rem;
    background-color: ${Common.colors.mainColor03};
    border-radius: 70%;
    margin-right: 0.5rem;
  }
`;

export const SearchWrapper = styled.div`
  .search-bar {
    height: 2.5rem;
    background-color: ${Common.colors.mainColor01};
    border: 1.5px solid ${Common.colors.lightGray01};
    border-radius: 2rem;
    padding: 0rem 1rem;
    color: ${Common.colors.lightGray01};
    font-family: "Sarpanch", sans-serif;
    margin-right: 0.8rem;
  }
`;
