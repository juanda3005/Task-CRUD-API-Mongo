import express from "express";

import TasksRoutes from "./routes/task.routes.js";

import morgan from "morgan"
import cors from "cors";

const app = express();

//SETTINGS
app.set("port", process.env.PORT || 4000);



//MIDDLEWARES
const corsoptions={}
//origin:"http://localhost:3000" (esto iria dentro del objeto corsoptions y a su vez este iria en el argumento de cors
app.use(cors())//para permitir las peticiones desde otros servidores, si se deja el argumento en blanco cualquier aplicacion puede pedir todo
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));//para recibir datos de un formulario html

//ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.use("/api/tasks", TasksRoutes);

export default app;
