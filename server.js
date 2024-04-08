import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import mcqRouter from "./mcqRouter.js";

app.use("/api/mcq", mcqRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
