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
    origin: "http://localhost:5173",
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use("/",express.static("uploads"))
// app.use("/", (req, res) => {
//   res.send("Hello world!");
// });

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// import Routes

import userRoutes from './Controller/user.js';
import shopRoutes from './Controller/shop.js';
import productRoutes from './Controller/product.js';



app.use('/api/v2/user', userRoutes);
app.use('/api/v2/shop', shopRoutes);
app.use('/api/v2/product', productRoutes);

// const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})