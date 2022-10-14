
const express = require("express");
const app = express();
const https = require("https");
const cors = require("cors");
const axios = require('axios');
const { domainToASCII } = require("url");
const { get } = require("http");
const { response, json } = require("express");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

//----------------- Rutas------------------//

app.get("/files/data", async (req, res) => {


    let files = await getFiles();


    let urls = await getData(files);

    let data = []
    try {



        const datas = await urls.map(async urls1 => {
            https.get(urls1, {
                headers: { "authorization": "Bearer aSuperSecretKey", "Content-Type": "application/json" },
            }, response => {

                //console.log('STATUS: ' + response.statusCode);
                // console.log('HEADERS: ' + JSON.stringify(response.headers));
                response.setEncoding("utf8");

                if (response.statusCode <= 200) {

                    response.on("data", chunk => {

                        data = [...data, csvToArray(chunk)];
                    })


                }
            }).end(() => {
                return data
            });
        })
    } catch (error) {
        console.log(error)
    }

    setTimeout(() => {
        res.json(data)
        res.status(200)
    }, 500)
})

app.get("/files/list", async (req, res) => {

    let files = await getFiles();


    res.send(files);
    res.status(200);
})


//----------------- Metodos ------------------//

const getData = async (files) => {

    let data;
    let url = "https://echo-serv.tbxnet.com/v1/secret/file/"

    data = files.files.map(file => {


        return url.concat(file)

    })

    return data;
}

const getFiles = async () => {
    const config = {
        method: 'get',
        url: 'https://echo-serv.tbxnet.com/v1/secret/files',
        headers: { "authorization": "Bearer aSuperSecretKey", "Content-Type": "application/json" }
    }

    try {
        const response = await axios(config);
        const result = await response.data;
        return result;
    } catch (error) {
        console.log(error)
    }
}

const csvToArray = (str, delimiter = ",") => {


    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);


    const rows = str.slice(str.indexOf("\n") + 1).split("\n");


    const arr = rows.map(function (row) {

        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
          
            if (values[index] != undefined  ) {

                object[header] = values[index];

                return object;
            }
        }, {});

        return el;
    });

    let notNull = arr.filter((el, index) => {
        return( el != null &&  el.file != "file");
    })

    return notNull;
}



//----------------- Servidor------------------//


app.listen(port, () => {
    console.log(`app port: ${port}`);
})


module.exports = app;