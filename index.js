import express from 'express'
import {Usuario, Estudio, ExpLaboral,agregarUsuario, agregarEstudio, agregarExperiencia, mostrarUsuariosYEstudios, obtenerDatosPorCedula} from './mongo_config/mongo_config.js'

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
    const resultados = await obtenerDatosPorCedula(cedula);
    res.render('busqueda', { resultados });
});
  


