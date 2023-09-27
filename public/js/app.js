const Weatherform=document.querySelector('form')
const search=document.querySelector('input')

const msg1=document.querySelector('#msg-1')
const msg2=document.querySelector('#msg-2')


Weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()

   const formlocation =search.value
``
  
   fetch(`http://localhost:3000/weather?addres=${formlocation}`).then((responce)=>{
   
    responce.json().then((data)=>{
        if (data.error){
            msg1.textContent=data.error
        }else{
          
            msg1.textContent=data.location
            msg2.textContent=data.forecast
        }
        
    })
})
})
     


