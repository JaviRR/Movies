var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var app = express();

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/movies");
var ReviewSchema = mongoose.Schema({
    name: {type: String, required: [true, "User name is required"], minlength: [3, "User name must have at least 3 characters"]},
    rate: {type: Number, required: [true, "Rating is required"]},
    review: {type: String, required: [true, "Review is required"], minlength: [3, "Review must have at least 3 characters"]}
}, {timestamps: true})
var MovieSchema = mongoose.Schema({
    title: {type: String, required: [true, "Title is required"], minlength: [3, "Title must have at least 3 characters"]},
    reviews: [ReviewSchema]
}, {timestamps: true})
const Review = mongoose.model("Review", ReviewSchema);
const Movie = mongoose.model("Movie", MovieSchema);

app.use(express.static(__dirname+'/public/dist/public'));

app.delete("/deletemovie:id", function(req, res){
    console.log("Delete Movie", req.params.id);
    Movie.remove({_id: req.params.id}, function(err, data){
        if(err){
            res.json({error:err});
        }else{
            res.json({data:data});
        }
    })
})
app.post("/review/:id", function(req, res){
    console.log("Id padre", req.params.id);
    console.log("Id hijo", req.body);
    Movie.update({_id: req.params.id}, {$pull: {reviews: {_id: req.body._id}}}, function(err,data){
        if(err){
            res.json({error:err});
        }else{
            res.json({data:data});
        }
    })
})
app.get("/allreviews/:id", function(req,res){
    Movie.findOne({_id:req.params.id}, function(err,data){
        if(err){
            res.json({error:err});
        }else{
            res.json({data:data});
        }
    })
})
app.get("/all", function(req, res){
    Movie.find({}, function (err, data){
        if(err){
            res.json({error:err});
        }else{
            res.json({data:data});
        }
    })
})
app.post("/newMovie", function(req,res){
    console.log("New Movie",req.body);
    var movie = new Movie(req.body);
    movie.save(function(err,data){
        console.log(data);
        if(err){
            res.json({error: err});
        }else{
            res.json({data: data});
        }
    })
})
app.post("/newReview/:id", function(req,res){
    console.log("New Review",req.body);
    console.log(req.params.id);
    Review.create(req.body, function(err, data){
        if(err){
            res.json({error:err});
        }else{
            Movie.findOneAndUpdate({_id: req.params.id}, {$push: {reviews: data}}, function(err, data){
                if(err){
                    res.json({error:err});
                }else{
                    res.json({data:data});
                }
            })
        }
    })
})
app.get("/recovermovie/:id", function(req, res){
    console.log("Recover Movie", req.params.id);
    Movie.findOne({_id: req.params.id}, function(err,data){
        if(err){
            res.json({error:err});
        }else{
            res.json({data:data});
        }
    })
})
app.all('*', (req,res,next)=>{
    res.sendFile(path.resolve("./public/dist/public/index.html"));
})

app.listen(8000, function(req, res){
    console.log("Listening on port 8000");
})