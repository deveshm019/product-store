import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';
import router from './routes/product.route.js'
import path from 'path';

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products/",router)

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    ConnectDB();
    console.log(`Server running on port ${PORT}`);
})