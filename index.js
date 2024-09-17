const express = require('express')
const path = require('path')

const app = express()

// Setters
app.set('PORT',process.env.PORT || 3000)
// Usar la carpeta public
app.use(express.static(path.join(__dirname,'public')))
//Usar la carpeta views
app.set('views',path.join(__dirname,'views'))
//Usar el EJS
app.set('view engine','ejs')


//Para enviar datos
app.use(express.json()) //Usar datos como Json
app.use(express.urlencoded({extended:true}))//Recibir datos de un formulario o para enviarlos

// Middle Ware
app.use('/',require('./routes/index'))

app.listen(app.get('PORT'), ()=>console.log(`Server ready at port ${app.get('PORT')}`))