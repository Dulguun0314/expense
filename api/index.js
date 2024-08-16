const express = require("express");
require("dotenv").config();

var cors = require("cors");
const { iconCategoryRouter } = require("./routes/iconcategory.route");
const { authRouter } = require("./routes/auth.route");
const { userRouter } = require("./routes/user.route");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { recordsRouter } = require("./routes/record.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

const port = 5000;
console.log(process.env.JWT_SECRET);

app.use("/records", recordsRouter);
app.use("/iconcategories", iconCategoryRouter);

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
