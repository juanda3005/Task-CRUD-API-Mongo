import app from './app.js';
import './database';
//al importarlo sin usar un variable ejecuta todo el codigo de ese archivo



//STARTING SERVER
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});


