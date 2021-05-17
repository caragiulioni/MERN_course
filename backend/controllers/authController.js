const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//register user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/cjbofx4iq8yke32xpndr",
      url:
        "https://res.cloudinary.com/blockcontrol/image/upload/v1619544781/cjbofx4iq8yke32xpndr.jpg",
    },
  });

  res.status(201).json({
    success: true,
    user,
  });
});
