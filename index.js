// 1. Crear un servidor en Node con el módulo http.
// Paso 1
const http = require('http')
// Paso 2
const url = require('url')
// Paso 3
const fs = require('fs')

http
    .createServer(function (req, res) {
        const params = url.parse(req.url, true).query
        const nombre = params.archivo // segun html
        const contenido = params.contenido
        const nuevoNombre = params.nuevoNombre
      
        // 2. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta recibida.

        if (req.url.includes('/crear')) { // se asocia al action (que define al ruta) en html

            if (nombre) {
                fs.writeFile(nombre, contenido, () => {
                    res.write('Archivo creado con éxito!')
                    res.end()
                })
                // 6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta recibida.
            } else {
                res.write('El Archivo no fue creado!')
                res.end()
            }
        }

        // 3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
        // declarado en los parámetros de la consulta recibida.

        if (req.url.includes('/leer')) {
            fs.readFile(nombre, (err, data) => { // se genera al crear el writeFile
                // 6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta recibida.
                if (err) {
                    res.write('No se encuentra el archivo')
                    res.end()
                } else {
                    res.write(data)
                    res.end()
                }

            })
        }

        // 4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
        // declarado en los parámetros de la consulta recibida.

        if (req.url.includes('/renombrar')) {
            fs.rename(nombre, nuevoNombre, (err, data) => {
                // 6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta recibida.
                if (err) {
                    res.write('No se puede renombrar el archivo')
                    res.end()
                } else {
                    res.write(`Archivo ${nombre} renombrado por ${nuevoNombre}`)
                    res.end()
                }
            })
        }

        // 5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los parámetros de la consulta recibida.
        if (req.url.includes('/eliminar')) {
            fs.unlink(nombre, (err, data) => {
                // 6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta recibida.
                if (err) {
                    res.write('No se puede eliminar el archivo')
                    res.end()
                } else {
                    res.write(`Archivo ${nombre} eliminado con éxito`)
                    res.end()
                }
            })
        }
    })
    .listen(8080, () => console.log('Escuchando el puerto 8080'))


// 7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato
// “dd/mm/yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la izquierda. (Opcional)

// 8. En la ruta para renombrar, devuelve un mensaje de éxito incluyendo el nombre
// anterior del archivo y su nuevo nombre de forma dinámica . (Opcional)


// 9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente
// mensaje: “Tu solicitud para eliminar el archivo <nombre_archivo> se está procesando”,
// y luego de 3 segundos envía el mensaje de éxito mencionando el nombre del archivo eliminado. (Opcional)
