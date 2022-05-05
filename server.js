const express = require ('express')
const Contenedor = require ('./contenedor')
const { Router } = express

const app = express()

app.use (express.static ('public'))
app.use ( express.urlencoded( {extended: true} ) )
app.use ( express.json() )


//endpoints
const routerProductos = new Router()

routerProductos.get ('/', (req, res) => {
  res.json (Contenedor.getall())
})

routerProductos.get ('/:id', (req, res) => {
    const num = parseInt (req.params.id)
    res.json (Contenedor.getbyid(num))
})

routerProductos.post ('/', async (req, res) => {
    Contenedor.save(req.body)
    const productos = Contenedor.objsdelarchivo()
    await res.json (productos[productos.length - 1])
})

//borra pero deja la palabra null
routerProductos.delete ('/:id', async (req, res) => {
    const num = parseInt (req.params.id)
    const objs = Contenedor.objsdelarchivo()
    const borrado = await Contenedor.deletebyid(num)

    if(isNaN(num)) {
        return res.send ({ error: 'El caracter ingresado no es un numero'})
    }

    if ( num < 1 || num > objs.length) {
        return res.send ({ error: 'El numero ingresado esta fuera de rango'})
    }
    res.json (`se borro el producto ${borrado}`)
})

//no actualiza en el txt/ no lo pude hacer
routerProductos.put ('/:id', (req, res) => {
    const prodActualizar = Contenedor.getbyid(req.params.id)
    const newProd = (req.body)
    prodActualizar = newProd


    res.send ('ok' + Actualizar)       
})


//carga de routers

app.use ('/api/productos', routerProductos)

//server

const PORT = 8080


const server = app.listen(PORT, () => {
    console.log ('server HTTP escuchando en el puerto' + PORT)
})
server.on ('error', error => console.log (`error en el server ${error}`))
