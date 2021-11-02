require("dotenv").config()
const express = require("express")
// const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const path = require("path") //utility for formatting url path delivery
const PORT     = process.env.PORT || 4747;
// const DB       = "stripeDB";
const productList =  require("./products.js")
const e = require("express")
app.use(cors())
//Stripe 
// Remember to switch to your live secret key in production. !IMPORTANT
const stripe = require("stripe")(process.env.SECRET_KEY_TEST);
// console.log("API KEY:")
// console.log(process.env.SECRET_KEY_TEST)
//Middleware API Calls

// mongoose.connect("mongodb://localhost:27017/"+DB,{
//   //These options are deprecated and are the DEFAULT mongoose values as of 2021
// // useUnifiedTopology: true, 
// //    useNewUrlParser: true,
// //    useCreateIndex: true,
// //    useFindAndModify: false, 
//    connectTimeoutMS: 10000
// });

// const db = mongoose.connection; //abbreviate mongoose.connection to variable for readability
//  db.on("error",(error)=>{console.log(error)})
// // Event listeners
// db.once('open', () => console.log(`Connected to ${DB} database`));

//Stripe Charge
// Token is created using Stripe Checkout or Elements!
// Get the payment token ID submitted by the form:
// app.post("/charge",(req,res)=>{
//     console.log(req)
//     console.log(req.body)
//     console.log(req.data)
//     const token = req.data.stripeToken; // Using Express

//     const charge = stripe.charges.create({
//       amount: 999,
//       currency: 'usd',
//       description: 'Example charge',
//       source: token,
//     });
// })

//Schema
// const ProductSchema = new mongoose.Schema(
//     {
//         name: String,
//         description:String,
//         price:Number,
//     },
//     {collection:"Products"} //custom collection name 
// )
// let Product = db.model("Product",ProductSchema)

app.use(express.json());//unpack JSON formatted payload / send res.json(payload,(callbaback)=>{....})
app.use(express.urlencoded({ extended: true })); //unpack urlEncoded payload 
app.use(express.static( ".././client/public")) //NO path,join() here. Only for GET req of index.html

app.get("/",(req,res)=>{
    console.log("Deliver static index.html")
    res.sendFile(path.join(__dirname,".././client/public","index.html"))
})

//return all products into iterable array ready for post req
//running db query on load & not on POST req bc stripe async/await function causes errors with mongoose Promise function

// const productArr = Product.find({},(err,doc)=>{ 
//     if(err){
//         console.log(err)
//         // res.json("error") //cannot send res more tha nonce aka set headers error 
//         return [{name:"NO MATCH"}] //arr with length 1 and name key formatted to prevent undefined if error occurs
//     }else if(!doc){
//         console.log("No products to be found via query. Requires Debug.")
//         return [{name:"NO MATCH"}]
//     } else{
//         return doc
//     }
// })


app.get("/api", async (req,res)=>{
//    console.log("GET Req")
//     console.log(req.body)
//     console.log(req.body.product)
//     console.log(productArr)
//     let selectedProd = req.body.product // the item id no. to be compared against product array entries
    console.log("Received GET req from client api")
    
        try{
            
           //await productArr //does not evaluate next lines of function until selection returns resolved value of product doc from mongoose query
        //   const matchedProd = productArr.filter((n,i)=>{ 
        //     if(n.id === selectedProd){
        //         return n
        //     }
        //    })
        //   console.log("MATCH PROD")
        //   console.log(matchedProd)
            const checkoutSession = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                mode:"payment",
                success_url: process.env.LIVE_SERVER_ADDRESS+"/success",
                cancel_url: "https://docs.google.com/forms/d/e/1FAIpQLSerhoPRuEFlo5XGAcH8hmnk4EkBJJ0fw15Hv8cM3DPs3zdx9A/viewform",
                line_items:[
                {
                    price_data:{
                        currency:"usd",
                        product_data:{
                            name:"Trivia Team Registration"
                        },
                        unit_amount:  8000  //Stripe requires prices in CENTS not dollars !IMPORTANT
                    },
                    quantity:1
                }
            ]
            })
            res.json({url:checkoutSession.url})

        }
        catch(err){
            console.log("ERROR:")
            console.log(err.message)
            res.status(500).json({error:err.message})
        }
    
   
    
// })
// .catch((err)=>console.log(err))    
        
    
    
})

app.get("/success",(req,res)=>{
    res.sendFile(path.join(__dirname,".././client/public","success.html"))
})

app.listen(PORT,()=>{
    console.log("Server started on port " + PORT)
})