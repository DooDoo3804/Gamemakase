import styled from "@emotion/styled";
import { motion } from "framer-motion";
import infoSVG from "../assets/fontAwesomeSvg/circle-info-solid.svg";
import { Common } from "../styles/Common";

const InfoIconWrapper = styled.div`
  .icon-wrapper {
    display: flex;
    width: 1rem;
    height: 1rem;
    margin: 0rem 0.8rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
  }

  .icon-wrapper:hover + .box-body {
    display: flex;
  }

  .box-body {
    display: none;
    position: absolute;
    z-index: 9;

    margin: 0rem 2rem;
    margin-top: -8rem;
    background-color: rgba(50, 50, 50, 0.8);
    border-radius: 2rem;
    border: 2px solid ${Common.colors.white01};
    font-weight: 500;
    white-space: pre-wrap;

    transition: all 0.3s ease-in-out;

    @media (min-width: 1024px) {
      max-width: 35rem;
      font-size: 1rem;
      line-height: 1.7rem;
      padding: 2rem;
    }
    @media (max-width: 1024px) {
      max-width: 20rem;
      font-size: 1rem;
      line-height: 1.7rem;
      padding: 2rem;
    }
    @media (max-width: 768px) {
      margin-left: -5rem;
      max-width: 20rem;
      font-size: 1rem;
      line-height: 1.7rem;
      padding: 2rem;
    }
    @media (max-width: 500px) {
      max-width: 13rem;
      font-size: 0.8rem;
      left: 2rem;
      line-height: 1.3rem;
      padding: 1.5rem;
    }
  }
`;

const InfoIcon = ({ text }) => {
  return (
    <InfoIconWrapper>
      <div className="icon-wrapper">
        <img src={infoSVG} alt="info-icon" />
      </div>
      <motion.div
        className="box-body"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
      >
        {text}
      </motion.div>
    </InfoIconWrapper>
  );
};

export default InfoIcon;
