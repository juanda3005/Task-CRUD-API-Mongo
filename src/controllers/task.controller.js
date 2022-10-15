import Task from "../models/task.js";
import { getPagination } from "../libs/getPagination.js";

export const findallTasks = async (req, res) => {
  try {
    console.log(req.query);
    console.log(condition)
    const { size, page,title} = req.query;

    const condition= title ? {
      title: { $regex: new RegExp(title), $options: "i" }
    }:{};
    //busco todos los registros que coincidan con ese titulo al usar las funciones regex y el nombre de la variable en la db el busca automaticamente

    const {offset,limit}=getPagination(page, size);
    
    const data= await Task.paginate(condition, {offset, limit});
    //tener en cuenta que el page, offset inicia desde cero, asi que si se quiere ver la primera se debe poner 0

    //argumentos paginate:
    //consulta, opciones
    //offset:cuantas paginas quiero, limite:cuantos registros por pagina
    res.json({
      totalItems: data.totalDocs,
      tasks: data.docs,//trae las tareas
      totalPages: data.totalPages,
      currentPage: data.page - 1,//ya que empieza desde cero

    });
    //si pongo res.json(data) me trae todos los datos de la db y con esos mismos datos, pero es util ponerlo de esta forma para su uso en el front end
  } catch (error) {
    res.status(500).json({
      message: error.message || "something goes wrong retrieving tasks",
      //retorna el error encontrado o sino muestra el mensaje
    });
  }
};

export const findTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    //si no existe la tarea mostrar un error
    if (!task) {
      return res
        .status(404)
        .json({ message: `task with ${id} does not found` });
    }
    res.json(task);
  } catch (error) {
    1;
    res.status(500).json({
      message:
        error.message ||
        `something goes wrong retrieving the task  with id: ${id}`,
    });
  }
};

export const createTask = async (req, res) => {
  //Este if es para que no entre a mongoose y muestre su error
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }

  try {
    const newtask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false,
    });
    //en el modelo se pone done como false si no se envia, sin embargo al incluirlo en el controlador si este no se envia en la peticion muestra error, asi que se debe validar, en este caso con un operador ternario
    const tasksSave = await newtask.save();
    res.json(tasksSave);
  } catch (error) {
    res.status(500).json({
      message: error.message || "something goes wrong creating a new task",
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    
    //Error si no existe la tarea
    if (!task) {
      return res.status(404).json({ message: `task with id ${id} not found, so it could not be deleted` });
    }

    res.json({
      message: `task with id ${id} was deleted successfully `,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        `something goes wrong deleting the task with id: ${id}`,
    });
  }
};

//Retornar tareas con done en true
export const findDoneTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    
    //Error si no existen las tareas
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found with done:true" });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        `something goes wrong trying to find tasks with done:true`,
    });
  }
};

//Update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);

    if (!task) {
      return res.status(404).json({ message: `task with id ${id} not found, so it could not be updated` });
    }
    res.json({
      message: `task with id ${req.params.id} was updated successfully `,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        `something goes wrong trying to update the task with id: ${id}`,
    });
  }
};
