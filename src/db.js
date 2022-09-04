require('dotenv').config();
import mongoose from "mongoose";

URL = process.env.URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database')
}).catch(err => {
    console.log('Connection failed')
})
