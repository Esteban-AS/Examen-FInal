import mongoose from 'mongoose'

const {Schema} =  mongoose

const url_conexion = 'mongodb+srv://arayaesteban25:123MongoDB@cluster0.zjteqia.mongodb.net/bd_DatosBlog?retryWrites=true&w=majority'
mongoose.connect(url_conexion, {useNewUrlParser: true, useUnifiedTopology: true});

// esquemas para la coleccion
const usuarioSchema = new Schema({
    cedula: Number,
    nombre: String,
    apellidos: String,
    email: String,
    fecha_nacimiento: Date,
    telefono: Number,
    ciudad:String
  })

const estudioSchema = new Schema({ 
    cedEstudio: Number,
    titulo: String, 
    institucion: String, 
    fecha_inicio: Date, 
    fecha_fin: Date, 
    descripcion: String, 
    descriProyecto: String, 
    tecnologias: String 
})

const expLaboralSchema = new Schema({
    cedula: Number,
    empresa:String, 
    puesto:String, 
    fecha_inicioExp:Date, 
    fecha_finExp:Date, 
    descriPuesto:String
})
  
// modelo con el que se trabaja
const Usuario = mongoose.model('Usuarios', usuarioSchema)
const Estudio = mongoose.model('Estudios', estudioSchema)
const ExpLaboral = mongoose.model('ExpLaborales', expLaboralSchema)

// Funciones

// Agregar un nuevo usuario
const agregarUsuario = (req, res) => {

    const usuario = new Usuario({
      cedula: Number(req.body.cedula),
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      fecha_nacimiento: new Date(req.body.fecha_nacimiento),
      telefono: Number(req.body.telefono),
      ciudad: req.body.ciudad
    });
    usuario.save()
    .then(re => {
        res.redirect('/registroDatos')
    })
}

// Agregar un nuevo estudio
const agregarEstudio = (req, res) => {

    const nuevoEstudio = new Estudio({
      cedEstudio: Number(req.body.cedEstudio),
      titulo: req.body.titulo,
      institucion: req.body.institucion,
      fecha_inicio: new Date(req.body.fecha_inicio),
      fecha_fin: new Date(req.body.fecha_fin),
      descripcion: req.body.descripcion,
      descriProyecto: req.body.descriProyecto,
      tecnologias: req.body.tecnologias
    });
    nuevoEstudio.save()
    .then(re => {
        res.redirect('/registroDatos')
    })
}

// Agregar un nuevo estudio
const agregarExperiencia = (req, res) => {

    const experiencia = new ExpLaboral({
      cedula: Number(req.body.cedExperiencia),
      empresa: req.body.empresa,
      puesto: req.body.puesto,
      fecha_inicioExp: new Date(req.body.fecha_inicioExp),
      fecha_finExp: new Date(req.body.fecha_finExp),
      descriPuesto: req.body.descriPuesto
    });
    experiencia.save()
    .then(re => {
        res.redirect('/registroDatos')
    })
}

// buscar los usuarios que hay en bd para mostrarlos 
const mostrarUsuariosYEstudios = async () => {
    const usuarios = await Usuario.find({});
    const estudios = await Estudio.find({});
    
    const usuariosYEstudios = usuarios.map(usuario => {
      const estudiosDelUsuario = estudios.filter(estudio => estudio.cedEstudio === usuario.cedula);
      
      return {
        cedula: usuario.cedula,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        email: usuario.email,
        estudios: estudiosDelUsuario.map(estudio => estudio.titulo).join(", ")
      }
    });
    
    return usuariosYEstudios;
};
  
const obtenerDatosPorCedula = async (cedula) => {
  try {
    const usuario = await Usuario.findOne({ cedula });
    const estudios = await Estudio.find({ cedEstudio: cedula });
    const expLaborales = await ExpLaboral.find({ cedula });
    return { usuario, estudios, expLaborales };
  } catch (error) {
    console.log(error);
    throw new Error('Error al buscar los datos del usuario');
  }
};

export {Usuario, Estudio, ExpLaboral,agregarUsuario, agregarEstudio, agregarExperiencia, mostrarUsuariosYEstudios, obtenerDatosPorCedula}