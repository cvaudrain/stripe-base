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


let submitBtn = document.querySelector("#submit-button") //if !JQuery, bind selector values to var, then set evt listeners on the varName

document.querySelector(".reg").addEventListener("load",onPurchase()) //calls stripe session init



    
