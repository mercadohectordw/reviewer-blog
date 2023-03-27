const express = require('express');
const cors = require('cors');
require("dotenv").config();
const {dbConnect} = require('./db');
const authRouter = require('./routers/auth.routes');
const usersRouter = require('./routers/users.routes');
const postsRouter = require('./routers/posts.routes');

dbConnect();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log(`Api loaded on port ${port}`);
})