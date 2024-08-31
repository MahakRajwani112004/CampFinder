
const mongoose = require('mongoose');
const cities= require('./cities');
const {places,descriptors}= require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/camp-finder')

const campfinder=require('../models/campfinder')
const db= mongoose.connection;

db.on('error',console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected");
});
const sample=array => array[Math.floor(Math.random()*array.length)];
const seedDB= async()=>{
    await campfinder.deleteMany({});
    // const c = new campfinder({title:'purple field'});
    // await c.save();
    for(let i=0;i<50;i++)
    {
        const random1000=Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30)+10;
       const camp= new campfinder({
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem tempora voluptates dolore laudantium deserunt, dolorum ipsa quaerat exercitationem illo odio consequuntur minus incidunt eaque, ullam nam vel reprehenderit officia odit!",
            price:price

        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
})