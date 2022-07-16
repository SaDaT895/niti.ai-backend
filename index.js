const axios = require('axios')
require('dotenv').config()
const requestBody = require('./body')

const client_id = process.env.CLIENT_ID
const client_secret = process.env.client_secret
const base_url = "https://fiu-uat.setu.co"

axios.defaults.headers.common['x-client-id'] = client_id
axios.defaults.headers.common['x-client-secret'] = client_secret
axios.defaults.headers.post['Content-Type'] = 'application/json'

const createNewConsent  = async (mobileNumber) => {
    let bodyData = requestBody.consentDetails(mobileNumber)
    axios.post(`${base_url}/consents`,bodyData)
    .then(res => console.log(res)).catch(err => console.log(err))
}

createNewConsent('9999999999')