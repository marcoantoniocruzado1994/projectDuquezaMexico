import app from './app';
import './db';


//initialize server
app.listen(4000, () => {
    console.log('Server is running on port >>>', 4000);
});