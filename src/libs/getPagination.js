//Para exteaer cantidad de documentos y paginas a mostrar a partir de un objeto que envia el cliente

export const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    //si esxiste el tamaño convierte ese tamaño a numero sino es 3

    const offset = page ? page * limit : 0;
    //si existe la pagina multiplica la pagina por el limite sino es 0
    //se multiplica por el limit para que me muestre los registros sigueintes en las otras paginas y estos no se repitan
    return { limit, offset };
};