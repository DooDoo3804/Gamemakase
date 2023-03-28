import styled from "@emotion/styled";
import { Common } from "../styles/Common";

export const MainHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 99;
  background-color: rgba(50, 50, 50, 0.3);
  color: ${Common.colors.lightGray01};
  margin: 0;
  padding: 0.2rem 0.5rem;
  justify-content: space-between;
  align-items: center;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  transition: all 0.3s ease-in-out;

  @media (min-width: 768px) {
    height: 4rem;
  }
  @media (max-width: 768px) {
    height: 3.5rem;
  }
  @media (max-width: 500px) {
    height: 3rem;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    margin: 0rem 0.5rem;
    margin-top: 0.2rem;
    cursor: pointer;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      width: 4rem;
      height: 3rem;
    }
    @media (max-width: 768px) {
      width: 3.5rem;
      height: 2.5rem;
    }
    @media (max-width: 500px) {
      width: 3rem;
      height: 2rem;
    }
  }

  .logo-img {
    object-fit: contain;
    position: absolute;
    opacity: 1;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      height: 2.5rem;
    }
    @media (max-width: 768px) {
      height: 2.2rem;
    }
    @media (max-width: 500px) {
      height: 1.8rem;
    }
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

    @media (min-width: 768px) {
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }

  .single-menu {
    margin: 0rem 0.3rem;
    cursor: pointer;
    white-space: pre-wrap;
  }

  .profile-img {
    cursor: pointer;
    width: 1.8rem;
    height: 1.8rem;
    background-color: ${Common.colors.mainColor03};
    border-radius: 70%;
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    @media (max-width: 560px) {
      display: none;
    }

    .user-profile-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const SearchWrapper = styled.div`
  transition: all 0.5s ease-in-out;

  .search-bar {
    height: 2.5rem;
    background-color: ${Common.colors.mainColor01};
    border: 1.5px solid ${Common.colors.lightGray01};
    border-radius: 2rem;
    padding: 0rem 1rem;
    color: ${Common.colors.lightGray01};
    font-family: "Sarpanch", sans-serif;
    margin-right: 0.8rem;
    transition: all 0.5s ease-in-out;

    @media (min-width: 1040px) {
      width: 20rem;
    }
    @media (max-width: 1040px) {
      width: 15rem;
    }
    @media (max-width: 768px) {
      width: 8rem;
    }
    @media (max-width: 560px) {
      display: none;
    }
  }

  .search-icon {
    cursor: pointer;
  }
`;
