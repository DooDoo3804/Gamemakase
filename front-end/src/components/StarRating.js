import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AnimatedFontAwesomeIcon = motion(FontAwesomeIcon);

const starVariants = {
  initial: {
    scale: 0,
  },
  animate: (i) => ({
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      type: "spring",
      stiffness: 175,
    },
  }),
  exit: (i) => ({
    scale: 0,
    transition: {
      duration: 0.25,
      delay: 0.2 - i * 0.04,
    },
  }),
  hovered: {
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const Star = ({ i, isHoveringWrapper, isClicked }) => {
  const [isHovering, setIsHovering] = useState(false);
  const starControls = useAnimation();
  const backgroundControls = useAnimation();

  useEffect(() => {
    if (isClicked && isHovering) starControls.start("hovered");
    else if (isClicked) starControls.start("animate");
    else starControls.start("exit");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked, isHovering]);

  useEffect(() => {
    if (isHoveringWrapper) backgroundControls.start({ background: "#ffd700" });
    else backgroundControls.start({ background: "#aaaaaa" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHoveringWrapper]);

  return (
    <>
      <motion.div
        className="star-background"
        initial={{ background: "#aaaaaa" }}
        animate={backgroundControls}
      />
      <AnimatedFontAwesomeIcon
        className="star-icon"
        icon={faStar}
        variants={starVariants}
        initial="initial"
        animate={starControls}
        whileHover={() => setIsHovering(true)}
        whileTap={{ scale: 0.9 }}
        onMouseOut={() => setIsHovering(false)}
        custom={i}
      />
    </>
  );
};
const StarRating = ({ handleRating }) => {
  const [isClicked, setIsClicked] = useState(0);
  const [isHovering, setIsHovering] = useState(0);

  const handleClick = (i) => {
    setIsClicked(i);
    handleRating(i + 1);
  };

  return (
    <div className="star-rating">
      <div className="stars-container">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            className="star-wrapper"
            onMouseOver={() => setIsHovering(i)}
            onClick={() => handleClick(i)}
            key={i}
          >
            <Star
              i={i}
              isHoveringWrapper={isHovering >= i}
              isClicked={isClicked >= i}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
