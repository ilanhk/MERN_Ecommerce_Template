import path from 'path'; //good to put built in node modules at the top
import express from 'express'; // in package.json do "type": "module", to beable to import instead of cont require
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // allows us to accesss req.cookies.jwt to get the token
dotenv.config(); //for .env to work
import connectDB from './config/db.js'; //since using es modules in backend you need to end wih .js for our own js scripts
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


const port = process.env.PORT || 5000;

connectDB(); //to connect to MongoDB

const app = express(); 

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

// First route
app.get('/', (req, res)=>{
    res.send('API is running')
});


app.use('/api/products', productRoutes); //anytime we hit '/api/products' it will use the routes in productRoutes

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/upload', uploadRoutes);


app.get('/api/config/paypal', (req, res) => res.send({ clientId:process.env.PAYPAL_CLIENT_ID }));



const __dirname = path.resolve(); //Set dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); //making '/uploads' static folder


app.use(notFound);
app.use(errorHandler);




app.listen(port, ()=> console.log(`Server running on port ${port}`))



