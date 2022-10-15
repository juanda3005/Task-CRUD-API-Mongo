import { Router } from "express";
import * as taskCtrl from "../controllers/task.controller.js";

//* es para importar todo lo que hay en el archivo, y se puede renombrar con as con un alias
//Modelos nobrar con mayuscula, de resto no se recomienda hacerlo

const router = Router();

//Solicitar todas las tareas
router.get("/",taskCtrl.findallTasks);

//Solicitar tareas con done true
router.get("/done",taskCtrl.findDoneTasks);
//Esta ruta se puede confundir con la de abajo, por lo que se recomienda ponerla antes
//ya que el done se puede confundir con el id, asi que el done se pone primero y asi no interfiere
//el funcionamiento de ninguna ruta

//Solicitar una tarea
router.get("/:id",taskCtrl.findTaskById);

//crear nueva tarea en la db
router.post("/",taskCtrl.createTask);

//Borrar una tarea
router.delete("/:id",taskCtrl.deleteTask);

//Actualizar tarea
router.put("/:id",taskCtrl.updateTask);


export default router;
