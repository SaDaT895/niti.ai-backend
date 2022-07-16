const express = require('express')
const axios = require('axios')
require('dotenv').config()
const requestBody = require('./body')

//Setting up env variables
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const base_url = "https://fiu-uat.setu.co"
const notif_url = process.env.NOTIF_URL

//Global Axios headers
axios.defaults.headers.common['x-client-id'] = client_id
axios.defaults.headers.common['x-client-secret'] = client_secret
axios.defaults.headers.post['Content-Type'] = 'application/json'

const app = express()
let id;

app.get('/', (req,res) => {
    //TODO: Front-end
    res.send('Listening')
})

//Request functions and helper functions
const createNewConsent  = (mobileNumber) => {
    let bodyData = requestBody.consentDetails(mobileNumber)
    let response = axios.post(`${base_url}/consents`,bodyData)
    return response
}

//To get consent status directly
const getConsentStatus = (id) => {
    return axios.get(`${base_url}/consents/${id}`)
}

//Create Consent Request and Redirect to consent URL
app.get('/createConsent/:mobileNumber', async (req,res) => {
    let consentRes  = await createNewConsent(req.params.mobileNumber)
    id = consentRes.data.id
    res.send(`Approve consent at ${consentRes.data.url}`)
})

//Await Consent status update
app.post(notif_url, async (req,res) => {
    console.log(req.body.data)
    res.sendStatus(200)
})

app.listen(3000, () => console.log('Up and Running at http://localhost:3000'))