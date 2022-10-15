import {Schema,model}from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const taskSchema= new Schema({
    title:{
        type:String,
        required:true,
        trim:true
        //trim elimina los espacios en blanco
    },
    description:{
        type:String,
        trim:true
    },
    done:{
        type:Boolean,
        default:false
        //si no pasa la propiedad done por defecto será false
    }},
{
    versionKey:false,
    //para elimnar el __V que pone mongo
    timestamps:true
    //para que guarde la fecha de creacion y actualizacion createdAt, updatedAt
});

taskSchema.plugin(mongoosePaginate);
export default model("Task",taskSchema);
//nombre modelo, esquema
