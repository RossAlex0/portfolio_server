import dotenv from "dotenv";
import app from "../src/config";

dotenv.config();

if (process.env.NODE_ENV === "development") {
  const PORT = process.env.APP_PORT || 3000;

  app.listen(PORT, () => {
    console.info(`Server is listenning to http://localhost:${PORT}`);
  });
}
// Test
export default app;
