const express = require('express')
const axios = require('axios')
require('dotenv').config()
const requestBody = require('./body')

//Setting up env variables
const client_id = process.env.CLIENT_ID
const client_secret = process.env.client_secret
const base_url = "https://fiu-uat.setu.co"

//Setting up Axios headers
axios.defaults.headers.common['x-client-id'] = client_id
axios.defaults.headers.common['x-client-secret'] = client_secret
axios.defaults.headers.post['Content-Type'] = 'application/json'

const app = express()

app.get('/', (req,res) => {
    //TODO: Front-end
    res.send('Listening')
})

const createNewConsent  = (mobileNumber) => {
    let bodyData = requestBody.consentDetails(mobileNumber)
    let response = axios.post(`${base_url}/consents`,bodyData)
    return response
}

app.get('/createConsent/:mobileNumber', async (req,res) => {
    let consentRes  = await createNewConsent(req.params.mobileNumber)
    res.redirect(consentRes.data.url)
})

app.listen(3000, () => console.log('Up and Running at http://localhost:3000'))