import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { sendEmail } from '../services/mailer.js';
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    AadhaarNumber ,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  // Validate input fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !AadhaarNumber ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Check if the doctor exists and validate the department
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  // Create the appointment with an initial status 'Pending'
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    AadhaarNumber,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
    status: 'Pending',  // Initial status set to 'Pending'
  });

  // Email content to notify the patient
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender's email address
    to: email,                    // Patient's email address
    subject: 'Appointment Request Received',  // Subject of the email
    text: `
      Hello ${firstName} ${lastName},

      We have received your appointment request for a consultation with Dr. ${doctor_firstName} ${doctor_lastName} in the ${department} department. 
      
      Your appointment is currently under review, and you will be informed once the status is confirmed.

      Appointment Details:
      - Appointment Date: ${appointment_date}
      - Department: ${department}
      - Doctor: Dr. ${doctor_firstName} ${doctor_lastName}
      
      We appreciate your patience and will notify you once the status is updated.

      Best regards,
      Hospital Management System
    `,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f9; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #005f6b;">Appointment Request Received</h2>
            <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
            <p>We have received your appointment request for a consultation with Dr. <strong>${doctor_firstName} ${doctor_lastName}</strong> in the <strong>${department}</strong> department. Your appointment is currently under review, and you will be informed once the status is confirmed.</p>
            
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #005f6b;">Appointment Details</h3>
              <ul style="list-style-type: none; padding-left: 0;">
                <li><strong>Appointment Date:</strong> ${appointment_date}</li>
                <li><strong>Department:</strong> ${department}</li>
                <li><strong>Doctor:</strong> Dr. ${doctor_firstName} ${doctor_lastName}</li>
              </ul>
            </div>

            <p style="font-size: 18px; font-weight: bold;">Your appointment status: <span style="color: orange;">Pending</span></p>

            <p>If you have any questions, please feel free to contact us at <strong>support@hospital.com</strong> or call <strong>+123 456 789</strong>.</p>
            
            <p style="text-align: center; color: #aaa;">Best Regards, <br />Hospital Management System</p>
          </div>
        </body>
      </html>
    `
  };

  try {
    // Send confirmation email to the patient
    await sendEmail(mailOptions);

    // Send success response with appointment details
    return res.status(200).json({
      success: true,
      appointment,
      message: "Your appointment has been successfully created! You will be notified soon with all the details.",
    });
  } catch (error) {
    // Handle email sending error
    return res.status(500).json({
      success: false,
      message: 'Appointment Created but Failed to Send Email',
      error: error.message || error,
    });
  }
});

// Additional functions for getting, updating, and deleting appointments

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);

  // Check if the appointment exists
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }

  // Update the appointment status
  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Send email to the patient about the status update
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender's email address
    to: appointment.email,         // Patient's email address
    subject: 'Appointment Status Update',  // Subject of the email
    text: `
      Hello ${appointment.firstName} ${appointment.lastName},
    
      We would like to inform you that the status of your appointment with Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName} has been updated.
    
      Appointment Details:
      - Appointment Date: ${appointment.appointment_date}
      - Department: ${appointment.department}
      - Doctor: ${appointment.doctor.firstName} ${appointment.doctor.lastName}
        
      New Status: ${appointment.status}
    
      If you have any questions, please feel free to contact us at our support email or phone number.
    
      Best Regards,
      Hospital Management System
    `,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f9; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #005f6b;">Appointment Status Update</h2>
            <p>Hello <strong>${appointment.firstName} ${appointment.lastName}</strong>,</p>
            <p>We would like to inform you that the status of your appointment with Dr. <strong>${appointment.doctor.firstName} ${appointment.doctor.lastName}</strong> has been updated.</p>
            
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #005f6b;">Appointment Details</h3>
              <ul style="list-style-type: none; padding-left: 0;">
                <li><strong>Appointment Date:</strong> ${appointment.appointment_date}</li>
                <li><strong>Department:</strong> ${appointment.department}</li>
                <li><strong>Doctor:</strong> Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}</li>
              </ul>
            </div>

            <p style="font-size: 18px; font-weight: bold;">
              <span style="color: ${appointment.status === 'Accepted' ? 'green' : appointment.status === 'Rejected' ? 'red' : 'orange'};">
                Status: ${appointment.status}
              </span>
            </p>

            <p>If you have any questions, please feel free to contact us at <strong>support@hospital.com</strong> or call <strong>+123 456 789</strong>.</p>
            
            <p style="text-align: center; color: #aaa;">Best Regards, <br />Hospital Management System</p>
          </div>
        </body>
      </html>
    `
  };

  try {
    // Send the email notification
    await sendEmail(mailOptions);

    // Respond to the client with success
    return res.status(200).json({
      success: true,
      message: "Appointment Status Updated and Email Sent!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message || error,
    });
  }
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }

  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});
