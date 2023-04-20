import express from 'express'
import {Usuario, Estudio, ExpLaboral,agregarUsuario, agregarEstudio, agregarExperiencia, mostrarUsuariosYEstudios, buscarPorCedula} from './mongo_config/mongo_config.js'

const app = express()

// Config Servidor
app.set('views', './vistas')
app.set('view engine', 'pug')

app.use(express.static('./estilos'))

// Para pasar los datos por post
app.use(express.urlencoded({extended:true}))

app.listen('8000', (req, res)=> {
    console.log('Aplicacion en http://localhost:8000')
})

app.get('/', async(req, res)=> {
    let usuarios = await mostrarUsuariosYEstudios()
    res.render('index', { usuarios: usuarios })
})

app.get('/registroDatos', (req, res)=> {
    res.render('registroDatos')
})

app.post('/usuarios', (req, res) =>{
    agregarUsuario(req, res)
}) 

app.post('/estudios', (req, res) =>{
    agregarEstudio(req, res)
})

app.post('/experiencia', (req, res) =>{
    agregarExperiencia(req, res)
})

app.post('/buscar', async (req, res) => {
    const cedula = req.body.cedula;

    try {
      const usuariosEncontrados = await buscarPorCedula(cedula);
      if (usuariosEncontrados && usuariosEncontrados.length > 0) {
        res.render('busqueda', { usuarios: usuariosEncontrados });
      } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  });




