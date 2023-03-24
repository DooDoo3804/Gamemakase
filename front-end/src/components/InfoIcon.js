import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

  .box-body {
    display: flex;
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
      margin-left: 0rem;
      font-size: 1rem;
      line-height: 1.7rem;
      padding: 2rem;
    }
    @media (max-width: 1024px) {
      max-width: 20rem;
      margin-left: 0rem;
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
      margin-left: 0rem;
      max-width: 13rem;
      font-size: 0.8rem;
      left: 2rem;
      line-height: 1.3rem;
      padding: 1.5rem;
    }
  }
`;

const InfoIcon = ({ text }) => {
  const [infoView, setInfoView] = useState(false);

  return (
    <InfoIconWrapper>
      <div
        className="icon-wrapper"
        onClick={() => setInfoView(true)}
        onMouseEnter={() => setInfoView(true)}
      >
        <img src={infoSVG} alt="info-icon" />
      </div>
      <AnimatePresence>
        {infoView ? (
          <motion.div
            className="box-body"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            onClick={() => setInfoView(false)}
            onMouseLeave={() => setInfoView(false)}
          >
            {text}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </InfoIconWrapper>
  );
};

export default InfoIcon;
