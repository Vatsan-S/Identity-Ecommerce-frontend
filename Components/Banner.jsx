import React, { useState,useEffect } from "react";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    {
      lg: "https://res.cloudinary.com/ddycjnke1/images/ezg5u20xz3ykymsbmglc",
      sm: "https://res.cloudinary.com/ddycjnke1/images/sbsj03kfvzfgcttlh1jj",
    },
    {
      lg: "https://res.cloudinary.com/ddycjnke1/images/rgdqyjrpl35obyltfkfg",
      sm: "https://res.cloudinary.com/ddycjnke1/images/ky7pcsiv6bqhmmhilp3g",
    },
    {
      lg: "https://res.cloudinary.com/ddycjnke1/images/t5gvesmuved5m7qncabj",
      sm: "https://res.cloudinary.com/ddycjnke1/Frame_173_meo00w",
    },
  ];
  useEffect(() => {
    const timing = setInterval(() => {
      setActiveIndex((ele) => (ele == images.length - 1 ? 0 : ele + 1));
    }, 6000);

    return ()=>clearInterval(timing)
  }, []);
  return (
  <div className="imageContainer">
    <img src={images[activeIndex].lg} className="bannerImage mobdisplay" alt="" />
    <img src={images[activeIndex].sm} className="bannerImage webdisplay" alt="" />
    
  </div>
);
};

export default Banner;
