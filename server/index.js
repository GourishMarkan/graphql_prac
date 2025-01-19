import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from "./schema/schema.js";
import { connectDB } from "./config/db.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
