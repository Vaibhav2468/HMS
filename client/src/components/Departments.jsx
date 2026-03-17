import React from 'react'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739268214/project%20work/HMS%20photos/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739268214/project%20work/HMS%20photos/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739268212/project%20work/HMS%20photos/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739268216/project%20work/HMS%20photos/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739276452/project%20work/HMS%20photos/departments/oncho.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739268217/project%20work/HMS%20photos/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739268292/project%20work/HMS%20photos/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739276459/project%20work/HMS%20photos/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "https://res.cloudinary.com/doazyk6kl/image/upload/v1739268216/project%20work/HMS%20photos/departments/ent.jpg",
    },
  ];
  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <>
    <div className="container departments">
      <h2>Departments</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={[
          // "superLargeDesktop",
          // "desktop",
          "tablet",
          "mobile",
        ]}
      >
        {departmentsArray.map((depart, index) => {
          return (
            <div key={index} className="card">
              <div className="depart-name">{depart.name}</div>
              <img src={depart.imageUrl} alt="Department" />
              {/* <img src="departments/pedia.jpg" alt="Department" /> */}
            </div>
          );
        })}
      </Carousel>
    </div>
  </>
  )
}

export default Departments;

