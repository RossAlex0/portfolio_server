const Joi = require("joi");

const verifyEmailRequest = async (req, res, next) => {
  const userEmail = req.body;
  console.info("verif", userEmail);
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(6).email().required(),
    subject: Joi.string().max(80).required(),
    message: Joi.string().required(),
  });

  try {
    await schema.validateAsync(userEmail, { abortEarly: false });

    next();
  } catch (error) {
    res.status(500).json({
      message: `Votre saisie est invalide, veuillez rééssayer.`,
      msgError: error,
    });
  }
};

module.exports = { verifyEmailRequest };
