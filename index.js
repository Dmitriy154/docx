const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const fs = require('fs')
const path = require('path')


const GenDoc = require('./modules/gendoc')

const app = express()
const PORT = process.env.PORT || 3000

// создаем парсер для данных в формате json
const jsonParser = express.json();
// создаем парсер для данных application/x-www-form-urlencoded
//const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(cors()) 

app.get('/download', (request, response) => {
	response.set('Access-Control-Allow-Origin', '*')
	const file = `${__dirname}/files/example.docx`;
	response.download(file);
	console.log('запрос');
})

app.post("/", jsonParser, function (request, response) {
	response.set('Access-Control-Allow-Origin', '*')
	console.log('отправка json');
	request.body.c = "Good Bye"
	response.json(request.body); // отправляем пришедший ответ обратно
});

app.post("/doc", jsonParser, function (request, response) {
	response.set('Access-Control-Allow-Origin', '*')
    if(!request.body) return response.sendStatus(400);
	console.log('create docx');
	let docx = new GenDoc(request.body);
	console.log(docx);

});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${PORT}`)
})