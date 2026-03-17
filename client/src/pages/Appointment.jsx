

import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"https://res.cloudinary.com/doazyk6kl/image/upload/v1739266664/project%20work/HMS%20photos/appointment.png"}
      />
      <AppointmentForm/>
    </>
  );
};

export default Appointment;
