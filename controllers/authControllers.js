const { controllerWrapper } = require("../utils");
const {
  registerService,
  loginService,
  logoutService,
  updateSubscriptionService,
  uploadAvatarService,
  verifyEmailService,
  resendVerifyEmailService,
} = require("../services/authServices");

const register = controllerWrapper(async (req, res) => {
  const user = await registerService(req.body);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
});

const resendVerifyEmail = controllerWrapper(async (req, res) => {
  await resendVerifyEmailService(req.body);
  res.status(200).json({ message: "Verification email sent" });
});

const login = controllerWrapper(async (req, res) => {
  const result = await loginService(req.body);
  res.status(200).json({
    token: result,
    user: {
      email: req.body.email,
      subscription: "starter",
    },
  });
});

const logout = controllerWrapper(async (req, res) => {
  await logoutService(req.user);

  res.status(204).end();
});
const getCurrent = controllerWrapper(async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
});
const updateSubscription = controllerWrapper(async (req, res) => {
  const { userId } = req.params;
  await updateSubscriptionService(userId, req.body);

  res.status(200).json({ message: "subscription updated" });
});

const uploadAvatar = controllerWrapper(async (req, res) => {
  const result = await uploadAvatarService(req);

  res.status(200).json({ avatarURL: result });
});

const verifyEmail = controllerWrapper(async (req, res) => {
  await verifyEmailService(req.params);
  res.status(200).json({ message: "Verification successful" });
});

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  uploadAvatar,
  verifyEmail,
  resendVerifyEmail,
};
