var express = require('express'),
	app=express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride("_method"));
mongoose.connect('mongodb://test:test@ds143342.mlab.com:43342/blog4')


//Mongoose Schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String
})


//Mongoose Model
var Blog = mongoose.model('Blog', blogSchema);

//Mongoose Create
// Blog.create({
// 	title: "Monday",
// 	image: 'http://www.planetware.com/photos-large/I/italy-siena-cathedral-exterior-day.jpg',
// 	content: "My first pic!"
// })







app.get("/", function(req,res){
	res.redirect("/blogs");
})

//INDEX

app.get("/blogs", function(req,res){
	Blog.find({}, function(err,data){
		if(err){
			console.log(err)
		} else {
			res.render('index', {blog:data});
		}
	})
})


//NEW

app.get("/blogs/new", function(req,res){
	res.render("new");
})

//CREATE

app.post("/blogs", function(req,res){
	var title =req.body.title;
	var image =req.body.image;
	var content = req.body.content;
	var newBlog = {title:title, image:image, content:content};
	Blog.create(newBlog, function(err,data){
		if(err){
			console.log(err);
		} else {
			res.redirect('/blogs');
		}
	});
})


//SHOW

app.get('/blogs/:id', function(req, res){
	Blog.findById(req.params.id, function(err,data){
		if(err){
			console.log(err);
		} else {
			res.render("show", {blog:data});
		}
	});
})



//EDIT
app.get('/blogs/:id/edit', function(req,res){
	Blog.findById(req.params.id, function(err,data){
		if(err){
			console.log(err);
		} else {
			res.render('edit', {blog:data});
		}
	})
})



//UPDATE
app.put('/blogs/:id', function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	})
})



//DESTROY
app.delete('/blogs/:id', function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err,data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	})
})







app.listen(3000, function(){
	console.log('server is running');
})