import React from "react";

interface IBannerProps {}

const Banner: React.FC<IBannerProps> = ({ children }) => {
  return <section id="projectBanner" role="banner"></section>;
};

export default Banner;
