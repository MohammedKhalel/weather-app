const path=require('path')
const express = require('express')
const app =express()
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// console.log(__dirname)

/////* define pathes to express config *//////////

const filedirectory=path.join(__dirname,"../public")
const viewspath=path.join(__dirname,"../templates/views") // if i want to change name of file view to templstes or any thing
const partialpath=path.join(__dirname,"../templates/partials")

/////////* setup handelbars engine and view location */////////

app.set('view engine' , "hbs")                 ///// read hbs files
app.set('views',viewspath)                   // call file templates to work if i changed name
hbs.registerPartials(partialpath)
///////////*setup static dictionary to serve/////////
app.use(express.static(filedirectory))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Mohamed'
    })
})

app.get('/about',(req,res)=>{
   
   res.render('about',{
    title:"About bage",
    name:"kahlel"
   })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title:"Help page",
        name:"Mahmoud",

    })
})


app.get('/Weather',(req,res)=>{
   
       if(!req.query.addres){
        return res.send({
            Error:"Please enter Address "})
       }
    // res.send({
    //     forecast:50,
    //     location:req.query.addres
    // })
    geocode(req.query.addres,(error, {latitude,longitude,location}={})=>{
      if(error)
        {
            return res.send(error)
        }
    forecast(latitude,longitude,(error1,forecastdata)=>{
        if(error1){
            return res.send(error1)
       }
       res.send({
        forecast:forecastdata,
        location,
        addres:req.query.addres
       })
     
    })
})

})


app.get('/product' , (req,res)=>{
    if(!req.query.search){
      return  res.send("Error: can't find product search ")
    }
//   console.log(req.query.search)
   res.send({
    product:[]
   })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        errorMessage:"page not found!"
    })
})
app.get('*',(req,res)=>{
res.render('404',{
    title:404,
    errorMessage:"Can't reach this page!"
})
})


app.listen(3000,()=>{
    console.log('done')
})