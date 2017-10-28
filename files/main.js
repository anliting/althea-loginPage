import style from './style.js'
import{Site,dom,general}from '/lib/core.static.js'
var
    form=           document.getElementsByTagName('form')[0],
    username=       document.getElementById('input_username'),
    password=       document.getElementById('input_password'),
    keepmeloggedin= document.getElementsByName('keepmeloggedin')[0],
    submitInput=    document.getElementById('submitInput'),
    failedSpan=     document.getElementById('failedSpan')
dom.head(dom.style(style))
username.focus()
general()
let site=new Site
form.addEventListener('submit',e=>{
    e.preventDefault()
    submitInput.disabled=true
    site.login(
        username.value,
        password.value,
        keepmeloggedin.checked
    ).then(res=>{
        submitInput.disabled=false
        if(res)
            return location='/'
        failedSpan.style.display=''
    })
})
document.getElementById('div_main').appendChild(createLinks())
function createLinks(){
    let div=document.createElement('div')
    div.innerHTML='<a href=register>Register</a>'
    return  div
}
