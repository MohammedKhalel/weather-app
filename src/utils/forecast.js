const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url=`https://api.weatherapi.com/v1/current.json?key=852c5cb0d992473e81631616230905&q=${latitude},${longitude}`
     request({url:url,json:true},(error,responce)=>{   // we can write responce or use distructon like in geocode
        if(error){
            callback("Unable to find this site" ,undefined)
        }else if(responce.body.error){
               callback("Unable to find location try another search",undefined)
        }else{
            callback(undefined,`The Tempreture Now is ${responce.body.current.temp_c} and it feels like ${responce.body.current.feelslike_c}`)   // ممكن ارجع ردجه الحراره وكل حاجه
        }

     })
    
}

// forecast(29.871903452398,26.4941838299718,(error,data)=>{
//     console.log("Error:",error )
//     console.log("Data:",data)

// })

module.exports=forecast
