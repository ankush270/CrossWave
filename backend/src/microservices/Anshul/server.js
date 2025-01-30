import dotenv from "dotenv";
import connectMongoDB from "./config/mongo_db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectMongoDB()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error listening", err);
  });
