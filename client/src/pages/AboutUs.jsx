

import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imageUrl={"https://res.cloudinary.com/doazyk6kl/image/upload/v1739267621/project%20work/HMS%20photos/about.png"}
      />
      <Biography imageUrl={"https://res.cloudinary.com/doazyk6kl/image/upload/v1739267622/project%20work/HMS%20photos/sozt7djezzarcioabcso.png"} />
    </>
  );
};

export default AboutUs;