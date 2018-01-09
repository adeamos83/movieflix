var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("search");
})

app.get("/results", function(req, res){
    var query = req.query.search;
    var apiKey = "ff0a38497fe407668201c3633ebc60f0";
    var flag = "&query="
    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + flag + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            console.log(data);
            res.render("results", {data: data});
        }    
    });
});

app.get("/favorites", function(req, res){
        var query = req.query.search;
    var apiKey = "ff0a38497fe407668201c3633ebc60f0";
    var flag = "&query="
    var url = "https://api.themoviedb.org/4/list/44714?page=1&api_key=" + apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            console.log(data);
            res.render("favorites", {data: data});
        }    
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movies App has started!!!");
});