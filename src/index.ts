import dotenv from "dotenv";
import app from "./config";

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.info(`Server is listenning to http://localhost:${PORT}`);
});
