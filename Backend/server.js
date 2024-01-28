import express from 'express';
import cookieParser from 'cookie-parser';
import  connectDataBase  from './Db/mongoose.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// dotenv.config();



if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
      path: 'Backend/config/.env',
    });
  }


// DataBase
connectDataBase();



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true,
  
}));
app.use("/",express.static("uploads"))
// app.use("/", (req, res) => {
//   res.send("Hello world!");
// });

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// import Routes

import userRoutes from './Controller/user.js';



app.use('/api/v2/user', userRoutes);

// const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})