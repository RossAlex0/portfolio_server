const send = async (req, res, next) => {
  try {
    const { name, subject } = req.body;
    console.info("ctrl", name);
    res.status(200).json({
      message: `Merci ${name}, votre email concernant "${subject}" a bien été envoyé.\n Je vous recontact au plus vite. 🚀`,
    });
  } catch (error) {
    res.json({ error: error, message: "control" });
  }
};

module.exports = { send };
