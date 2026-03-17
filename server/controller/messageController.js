import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
export const sendMessage = catchAsyncErrors(async (req, res, next) => {

  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
      
  }
console.log("ppppppppppp")
  
      // Store the user's data in the database
      await Message.create({ firstName, lastName, email, phone, message });

      // Respond with a success message
      res.status(200).json({
          success: true,
          message: "Message Sent!"
      });
 
});


export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
