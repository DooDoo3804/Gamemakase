import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import infoSVG from "../assets/fontAwesomeSvg/circle-info-solid.svg";

const InfoIconWrapper = styled.div`
  display: flex;
  width: 1rem;
  height: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .box-body {
    position: absolute;
    z-index: 9;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.4);

    font-size: 1rem;
    font-weight: 500;
  }
`;

const InfoIcon = ({ text }) => {
  return (
    <AnimatePresence>
      <InfoIconWrapper>
        <img src={infoSVG} alt="info-icon" />
        <motion.div
          className="box-body"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 50,
          }}
        >
          {text}
        </motion.div>
      </InfoIconWrapper>
    </AnimatePresence>
  );
};

export default InfoIcon;
