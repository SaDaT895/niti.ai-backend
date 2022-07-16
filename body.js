const consentDetails = (mobileNo) => {
    const currentTimestamp =  new Date()
    const endTimestamp = new Date(currentTimestamp.getTime() + 1000000)
    let data = JSON.stringify({
        "Detail": {
            "consentStart": currentTimestamp.toISOString(),
            "consentExpiry": endTimestamp.toISOString(),
            "Customer": {
                "id": `${mobileNo}@onemoney`
            },
            "FIDataRange": {
                "from": "2021-04-01T00:00:00Z",
                "to": "2021-10-01T00:00:00Z"
            },
            "consentMode": "STORE",
            "consentTypes": [
                "TRANSACTIONS",
                "PROFILE",
                "SUMMARY"
            ],
            "fetchType": "PERIODIC",
            "Frequency": {
                "value": 30,
                "unit": "MONTH"
            },
            "DataFilter": [
                {
                    "type": "TRANSACTIONAMOUNT",
                    "value": "5000",
                    "operator": ">="
                }
            ],
            "DataLife": {
                "value": 1,
                "unit": "MONTH"
            },
            "DataConsumer": {
                "id": "setu-fiu-id"
            },
            "Purpose": {
                "Category": {
                    "type": "string"
                },
                "code": "101",
                "text": "Loan underwriting",
                "refUri": "https://api.rebit.org.in/aa/purpose/101.xml"
            },
            "fiTypes": [
                "DEPOSIT"
            ]
        },
        "redirectUrl": "https://setu.co"
    })
    return data
}
module.exports = {
    consentDetails
}