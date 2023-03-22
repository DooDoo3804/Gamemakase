import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
//import { Common } from "../styles/Common";

const SwitchEmotion = styled(motion.div)`
  body {
    padding: 0;
    margin: 0;
    background: #fdfdfd;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }
  .switch {
    width: 80px;
    height: 5px;
    border-radius: 10px;
    display: flex;
    cursor: pointer;
  }

  .switch.on {
    justify-content: flex-end;
  }

  .switch.on div {
    position: relative;
    top: -5px;
    right: -5px;
    background-color: #b8a2cf;
  }

  .switch.off {
    justify-content: flex-start;
  }

  .switch.off div {
    position: relative;
    top: -5px;
    right: 5px;
    background-color: #dddddd;
  }

  .switch div {
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 200px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.02);
  }
`;

const Switch = ({ isOn, ...props }) => {
  const className = `switch ${isOn ? "on" : "off"}`;

  return (
    <SwitchEmotion>
      <SwitchEmotion
        animate={{ backgroundColor: isOn ? "#b8a2cf" : "#dddddd" }}
        className={className}
        {...props}>
        <SwitchEmotion />
      </SwitchEmotion>
    </SwitchEmotion>
  );
};

export default Switch;
