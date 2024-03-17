import React from "react";
import Lottie from "react-lottie";
import animationData from "../../Assets/Animations/Animation - 1710715005870.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <div className="w-full h-screen flex justify-center items-center">
       <Lottie options={defaultOptions} width={300} height={300} />
  </div>;
};

export default Loader;
