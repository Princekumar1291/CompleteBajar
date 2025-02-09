require('dotenv').config();

const express = require('express');
const sellerRouter = require('./routers/sellerRouter');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
const authRouter = require('./routers/authRouter');
const { isLoggedIn, isSeller } = require('./middleware/auth');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/seller', isLoggedIn, isSeller, sellerRouter);
app.use('/api/auth', authRouter);
app.use((req, res, next) => {
  res.status(404).send({ success: false, message: 'Page not found' });
});

const PORT = process.env.PORT || 4000;
const MONGODB_URL=process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
.then(()=>{
  console.log("DB is connected")
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error)=>{
  console.log("Error while connecting the DB");
})



