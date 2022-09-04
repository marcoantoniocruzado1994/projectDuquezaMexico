import express from 'express';
import morgan from 'morgan';
import pkjs from '../package.json'
import ProductsRoutes from "./routes/products.routes";
import AuthRoutes from "./routes/auth.routes";
import UsersRoutes from "./routes/users.routes";
import { createRole } from "./libs/initialSetup";
//initialize express
const app = express();
//crear roles al inicar laaplicacion
createRole();


//set the port
const port = 4000;
app.set('port',process.env.PORT || port);
app.set('pkjs',pkjs);

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.get('/',(req,res)=>{
    res.status(200).json({
        autores: app.get('pkjs').author,
        version: app.get('pkjs').version,
        name: app.get('pkjs').name,
        description: app.get('pkjs').description,
    });
});
//routes into routes folder
app.use('/api/products',ProductsRoutes);
app.use('/api/auth',AuthRoutes);
app.use('/api/users',UsersRoutes);

//static files


//export the app
export default app;


