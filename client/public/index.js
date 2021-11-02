// To use axios in client, use the CDN link in a ascript tag in index.html
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys

// var stripe = Stripe('pk_test_51JmNBBIJ8lVHLX8JxlPxAZpxxyKHHZ8lA5LPDUzV3yZ86ArcN2dfQIncJ2RN033z0M3nI1iXmOgWj4KG2jdnzVb600WLVqSPf8');


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
//define selector return values
// let productArr =document.querySelectorAll(".option")
let submitBtn = document.querySelector("#submit-button") //if !JQuery, bind selector values to var, then set evt listeners on the varName
// console.log(productArr)
//event listeners

// productArr.forEach((n,i)=>{
//     console.log(n.id)
//     n.addEventListener("click",selectOption)
// })
document.querySelector(".ind").addEventListener("load",onPurchase())
// console.log(document.querySelector(".ind"))



  


// var elements = stripe.elements();
// var style = {
//     base: {
//       // Add your base input styles here. For example:
//       fontSize: '16px',
//       color: '#32325d',
//       backgroundColor:"#fff"
//     },
//   };
  
//   // Create an instance of the card Element.
//   var card = elements.create('card', {style: style});
  
//   // Add an instance of the card Element into the `card-element` <div>.
//   card.mount('#card-element');

//   //Stripe Toke Handler POST to server when called 
//   function stripeTokenHandler(token) {
//     // Insert the token ID into the form so it gets submitted to the server
//     var form = document.getElementById('payment-form');
//     var hiddenInput = document.createElement('input');
//     hiddenInput.setAttribute('type', 'hidden');
//     hiddenInput.setAttribute('name', 'stripeToken');
//     hiddenInput.setAttribute('value', token.id);
//     form.appendChild(hiddenInput);
//   console.log("FORM:")
//   console.log(form)
//     // Submit the form
//     form.submit();
//     // let payload = {
//     //     form:form,
//     //     data:form.serialize(),
        
//     // }
//     // axios.post("/charge",payload)
//     // .then((res)=>console.log(res.data))
   
//   }
  
//   //Ev Listener Submit Stripe Card Details Form
//   var form = document.getElementById('payment-form');
//   form.addEventListener('submit', function(event) {
//     event.preventDefault();
  
//     stripe.createToken(card).then(function(result) {
//       if (result.error) {
//         // Inform the customer that there was an error.
//         var errorElement = document.getElementById('card-errors');
//         errorElement.textContent = result.error.message;
//       } else {
//           //call stripeTokenHandler to send token to server
//         stripeTokenHandler(result.token);
//       }
//     });
//   });
    
