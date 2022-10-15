
//Para cragar la variable de entorno
import {config} from 'dotenv'
config();

export default{
    mongodbURL:process.env.MONGODB_URI || "mongodb://localhost/task-api"
    //la primera es la env de producción, si no se ecnuentra que se conecte a una db local 
}



