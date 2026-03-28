// export const generateToken = (user, message, statusCode, res) => {
    
//     const token = user.generateJsonWebToken();
    
//     // Determine the cookie name based on the user's role
//     const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
//     res
//       .status(statusCode)
//       .cookie(cookieName, token, {
//         expires: new Date(
//           Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true,
//       })
//       .json({
//         success: true,
//         message,
//         user,
//         token,
//       });
//   };
//   /*export const generateToken = (user, message, statusCode, res) => {
//     console.log(process.env.COOKIE_EXPIRE,"jwt")
//     try {
//       const token = user.generateJsonWebToken();
  
//       // Determine the cookie name based on the user's role
//       const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
//       const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7;
//       res
//         .status(statusCode)
//         .cookie(cookieName, token, {
//           expires: new Date(
//             Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
//           ),
//           httpOnly: true,
//         })
//         .json({
//           success: true,
//           message,
//           user,
//           token,
//         });
//     } catch (error) {
//       console.error("Error generating token or setting cookie:", error);
//       res.status(500).json({ success: false, message: "Token generation failed" });
//     }
//   };*/
  
  export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // deploy me HTTPS ke liye
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // cross-site support
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
