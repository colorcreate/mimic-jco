const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use('/js', express.static('views/js'))
app.use('/css', express.static('views/css'))
app.use('/assets', express.static('views/assets'))
app.use('/data', express.static('views/data'))
app.use('/views', express.static('views/views'))
app.get('/', function(req, res){
    res.render('index')
})
app.listen(3000, function(){
    console.log('Listening on port 3000')
})