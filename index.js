require("dotenv").config();

const config = require("./src/config");

const app = config;

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.info(`Server is listenning to http://localhost:${PORT}`);
});
