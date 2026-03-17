
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [AadhaarNumber, setAadhaarNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorId, setDoctorId] = useState(""); // store selected doctor _id
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Processing your appointment request...");

    try {
      const selectedDoctor = doctors.find((doc) => doc._id === doctorId);

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          AadhaarNumber,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: selectedDoctor?.firstName || "",
          doctor_lastName: selectedDoctor?.lastName || "",
          hasVisited: Boolean(hasVisited),
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.update(loadingToast, {
        render: data.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAadhaarNumber("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorId("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Aadhaar Number"
            value={AadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorId(""); // reset doctor selection
            }}
          >
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>

          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor) => (
                <option value={doctor._id} key={doctor._id}>
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>

        <textarea
          rows="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>

        <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
////////////////////////////////////



// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const AppointmentForm = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [AadhaarNumber, setAadhaarNumber] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [department, setDepartment] = useState("Pediatrics");
//   const [doctorFirstName, setDoctorFirstName] = useState("");
//   const [doctorLastName, setDoctorLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [hasVisited, setHasVisited] = useState(false);

//   const departmentsArray = [
//     "Pediatrics",
//     "Orthopedics",
//     "Cardiology",
//     "Neurology",
//     "Oncology",
//     "Radiology",
//     "Physical Therapy",
//     "Dermatology",
//     "ENT",
//   ];

//   const [doctors, setDoctors] = useState([]);
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const { data } = await axios.get(
//         "http://localhost:5000/api/v1/user/doctors",
//         { withCredentials: true }
//       );
//       setDoctors(data.doctors);
//       console.log(data.doctors);
//     };
//     fetchDoctors();
//   }, []);
  

//   const handleAppointment = async (e) => {
//     e.preventDefault();
  
//     // Show a loading toast
//     const loadingToast = toast.loading("Processing your appointment request...");
  
//     try {
//       const hasVisitedBool = Boolean(hasVisited);
//       const { data } = await axios.post(
//         "http://localhost:5000/api/v1/appointment/post",
//         {
//           firstName,
//           lastName,
//           email,
//           phone,
//           AadhaarNumber,
//           dob,
//           gender,
//           appointment_date: appointmentDate,
//           department,
//           doctor_firstName: doctorFirstName,
//           doctor_lastName: doctorLastName,
//           hasVisited: hasVisitedBool,
//           address,
//         },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
  
//       // Update the toast with success message once the response is received
//       toast.update(loadingToast, {
//         render: data.message,
//         type: "success",
//         isLoading: false,
//         autoClose: 5000,
//       });
  
//       // Reset form fields
//       setFirstName("");
//       setLastName("");
//       setEmail("");
//       setPhone("");
//       setAadhaarNumber("");
//       setDob("");
//       setGender("");
//       setAppointmentDate("");
//       setDepartment("Pediatrics"); // Reset to default or change as needed
//       setDoctorFirstName("");
//       setDoctorLastName("");
//       setHasVisited(false); // Reset to false
//       setAddress("");
//     } catch (error) {
//       // Update the toast with error message if the request fails
//       toast.update(loadingToast, {
//         render: error.response?.data?.message || "Something went wrong!",
//         type: "error",
//         isLoading: false,
//         autoClose: 5000,
//       });
//     }
//   };
  
  

//   return (
//     <>
//       <div className="container form-component appointment-form">
//         <h2>Appointment</h2>
//         <form onSubmit={handleAppointment}>
//           <div>
//             <input
//               type="text"
//               placeholder="First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Mobile Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type="number"
//               placeholder="Aadhaar Number"
//               value={AadhaarNumber}
//               onChange={(e) => setAadhaarNumber(e.target.value)}
//             />
//             <input
//               type="date"
//               placeholder="Date of Birth"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//             />
//           </div>
//           <div>
//             <select value={gender} onChange={(e) => setGender(e.target.value)}>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//             <input
//               type="date"
//               placeholder="Appointment Date"
//               value={appointmentDate}
//               onChange={(e) => setAppointmentDate(e.target.value)}
//             />
//           </div>
//           <div>
//             <select
//               value={department}
//               onChange={(e) => {
//                 setDepartment(e.target.value);
//                 setDoctorFirstName("");
//                 setDoctorLastName("");
//               }}
//             >
//               {departmentsArray.map((depart, index) => {
//                 return (
//                   <option value={depart} key={index}>
//                     {depart}
//                   </option>
//                 );
//               })}
//             </select>
//             <select
//               value={`${doctorFirstName} ${doctorLastName}`}
//               onChange={(e) => {
//                 const [firstName, lastName] = e.target.value.split(" ");
//                 setDoctorFirstName(firstName);
//                 setDoctorLastName(lastName);
//               }}
//               disabled={!department}
//             >
//               <option value="">Select Doctor</option>
//               {doctors
//                 .filter((doctor) => doctor.doctorDepartment === department)
//                 .map((doctor, index) => (
//                   <option
//                     value={`${doctor.firstName} ${doctor.lastName}`}
//                     key={index}
//                   >
//                     {doctor.firstName} {doctor.lastName}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <textarea
//             rows="10"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Address"
//           />
//           <div
//             style={{
//               gap: "10px",
//               justifyContent: "flex-end",
//               flexDirection: "row",
//             }}
//           >
//             <p style={{ marginBottom: 0 }}>Have you visited before?</p>
//             <input
//               type="checkbox"
//               checked={hasVisited}
//               onChange={(e) => setHasVisited(e.target.checked)}
//               style={{ flex: "none", width: "25px" }}
//             />
//           </div>
//           <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AppointmentForm;
//////////////////////////////