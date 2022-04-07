const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  console.log('oi')
  res.send('Hello world!')
})

app.post('/calculo_imc', function (req, res) {
  console.log(req.body)
  action = req.body.queryResult.action
  console.log(action)

  if (action == "calculo") {
    altura = req.body.queryResult.parameters.altura
    peso = req.body.queryResult.parameters.peso
    console.log(altura + " " + peso)
  }
  //if (altura !== '' && peso !== '') {
  if (altura > 0 && peso > 0) {

    const valorIMC = (peso / (altura * altura)).toFixed(1);
    let classificacao = '';

    if (valorIMC < 18.5) {
      classificacao = 'abaixo do peso.';
    } else if (valorIMC < 25) {
      classificacao = 'com peso ideal. Parabéns!!!';
    } else if (valorIMC < 30) {
      classificacao = 'levemente acima do peso.';
    } else if (valorIMC < 35) {
      classificacao = 'com obesidade grau I.';
    } else if (valorIMC < 40) {
      classificacao = 'com obesidade grau II';
    } else {
      classificacao = 'com obesidade grau III. Cuidado!!';
    }

    response = {
      "fulfillmentText": `O seu IMC é ${valorIMC} e você está ${classificacao}`,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "O seu IMC" + valorIMC + " e você está" + classificacao
            ]
          }
        }
      ]
    }
    console.log('Webhook imc ativado' + valorIMC)
    res.status(200).send(response)

  } else {
    console.log('Preencha todos os campos!!!'),
      response = {
        "fulfillmentText": "Preencha todos os campos!!!",
        "fulfillmentMessages": [
          {
            "text": {
              "text": [
                "Preencha todos os campos!!!"
              ]
            }
          }
        ]
      }
    res.status(200).send(response)
  }
})
app.listen(3000)