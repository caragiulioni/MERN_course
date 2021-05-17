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

  const token = user.getJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});

//log in user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //if email &password

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  //find user

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //check password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});
