// To use axios in client, use the CDN link in a ascript tag in index.html
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys


// /Register
function onPurchase(ev){
    console.log("LOG")
    let payloadValue = {
        product:"registration"
    }
    axios.get("/api")
    .then((res)=>{
        console.log(res.data)
        window.location = res.data.url
    })
    .catch((err)=>console.log(err))
}

function loadPayment(url){
if(url =="https://docs.google.com/forms/d/e/1FAIpQLSerhoPRuEFlo5XGAcH8hmnk4EkBJJ0fw15Hv8cM3DPs3zdx9A/viewform"){
    console.log("Input pages loaded")
} else if(url=="https://docs.google.com/forms/u/0/d/e/1FAIpQLSerhoPRuEFlo5XGAcH8hmnk4EkBJJ0fw15Hv8cM3DPs3zdx9A/formResponse"){
    console.log("CONFIRMATION PAGE")
}
}

let submitBtn = document.querySelector("#submit-button") //if !JQuery, bind selector values to var, then set evt listeners on the varName
let googleForm = document.querySelector("#google-form")
googleForm.addEventListener("click",loadPayment(googleForm.src))
console.log(googleForm.src)
console.log(googleForm)
// console.log("loaded")
document.querySelector(".reg").addEventListener("load",onPurchase())


//  / index
// INPUT PAGES (3)
// https://docs.google.com/forms/d/e/1FAIpQLSerhoPRuEFlo5XGAcH8hmnk4EkBJJ0fw15Hv8cM3DPs3zdx9A/formResponse
// CONFIRMATION PAGE URL:
// https://docs.google.com/forms/u/0/d/e/1FAIpQLSerhoPRuEFlo5XGAcH8hmnk4EkBJJ0fw15Hv8cM3DPs3zdx9A/formResponse

    
