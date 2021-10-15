const express = require("express");
const spotifyWebAPI = require("spotify-web-api-node");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("./public"));

const spotifyAPI = new spotifyWebAPI({
    clientId: "96a788cfa7f14d7cba48cd9cd55ba1f3",
    clientSecret: "99596c7e5da940f99f4b49f5697782ec",
    redirectUri: "http://localhost:8080/callback"
})

// set new access token
const refreshToken = ()=>{
    spotifyAPI.clientCredentialsGrant()
    .then((data)=>{
        spotifyAPI.setAccessToken(data.body['access_token']);
    })
    .catch((err)=>console.log(err))
}
refreshToken();
    
// search
let query = "", arrOfTypes = ["artist","album","track"], lmt = 10;
app.post("/",(req,res)=>{
    query = req.body.data.query;
    arrOfTypes = req.body.data.type;
    lmt = req.body.data.limit;
    console.log(query,arrOfTypes,lmt);
    res.end();
})
app.get("/results",(req,res)=>{
    spotifyAPI.search(query,arrOfTypes,{limit:lmt})
        .then(data =>{
            res.json(data.body)
        })
        .catch(err => console.log(err));
})

app.listen(8080,(err)=>{
    if(err) throw err;
    console.log("Listening to the port 8080...");
})