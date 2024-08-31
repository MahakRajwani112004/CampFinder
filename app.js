const express= require('express');
const mongoose = require('mongoose');
const methodoverride= require('method-override')
const  ejsMate= require('ejs-mate');
mongoose.connect('mongodb://localhost:27017/camp-finder')
const Campfinder=require('./models/campfinder')
const db= mongoose.connection;
db.on('error',console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected");
})



const app= express();

app.use(methodoverride('_method'))
const path= require('path');
const { title } = require('process');


app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
 res.render('home')
})
// app.get('/makecampground', async(req,res)=>{
//            const camp = new campfinder({title:'my backyard',description:'cheap camping'})
//            await camp.save();
//            res.send(camp);
// })


//Index Page
app.get('/campgrounds',async(req,res)=>{
    const campfinders= await Campfinder.find({});
    res.render('campgrounds/index',{campfinders})
});
app.get('/campgrounds/new',(req,res)=>{
    res.render('campgrounds/new')
})
app.post('/campgrounds',async(req,res)=>{
    const campfinder= new Campfinder(req.body.campground);
    await campfinder.save();
    res.redirect(`/campgrounds/${campfinder._id}`);
})

app.get('/campgrounds/:id', async(req,res)=>{

    const campfinder = await Campfinder.findById(req.params.id);
    res.render('campgrounds/show',{campfinder})

});
app.get('/campgrounds/:id/edit', async(req,res)=>{
    const campfinder = await Campfinder.findById(req.params.id);
    res.render('campgrounds/edit',{campfinder})
})
app.put('/campgrounds/:id',async(req,res)=>{
    
    const campfinder = await Campfinder.findByIdAndUpdate(req.params.id,{...req.body.campground},{new:true});
    res.redirect(`/campgrounds/${campfinder._id}`);
})
app.delete('/campgrounds/:id',async(req,res)=>{
    const {id}=req.params;
    await Campfinder.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(3000,()=>{
    console.log("APP IS LISTENING AT PORT 3000")
})