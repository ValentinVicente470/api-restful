const { json } = require('express')
const fs = require ('fs')

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo
    }

    objsdelarchivo() {
        try{ 
        const arraydelarchivo = fs.readFileSync(this.archivo, 'utf-8')
        const objsdelarchivo = JSON.parse (arraydelarchivo)
        return objsdelarchivo
        }
        catch(err) {
            return err
        }
    }

    save ({name, price, thumbnail}) {

        const objs = this.objsdelarchivo()

        let newID = 1

        if (objs.length > 0) {
            newID = objs[objs.length - 1].id + 1
        }

        const newObj = {name: name, price: price, thumbnail: thumbnail, id: newID}
        objs.push (newObj)

        try {
            fs.writeFileSync (this.archivo, JSON.stringify (objs, null, 2))
            console.log ('escrito')
            console.log (objs [objs.length - 1] )
        }
        catch (err) {
            console.log ('error al escribir', err)
        }

    }

    getall() {
        try { 
            const arraydelarchivo = fs.readFileSync(this.archivo, 'utf-8')
            const objsdelarchivo = JSON.parse (arraydelarchivo)
            return objsdelarchivo
        }
        catch (err) {
            return err
        }
    }

    getbyid(num) {
        try{ 
            const objsdelarchivo = this.objsdelarchivo()
            const objsolicitado = objsdelarchivo.find (producto => producto.id === num )
            return objsolicitado || {error: 'producto no encontrado'}
        }
        catch(err){
            return err
        }
    }

    async deletebyid(num) {
        try{
            const productos = await this.objsdelarchivo()
            const borrado = productos.map ((product) => {
                if (product.id !== num)
                 return product
                })
            fs.writeFileSync (this.archivo, JSON.stringify (borrado, null, 2))
            console.log (`se borro el producto ${num}`)
        }
        catch(err) {
            return err 
        }
    }   

}


const archivo1 = new Contenedor ('./productos.txt')

module.exports = archivo1