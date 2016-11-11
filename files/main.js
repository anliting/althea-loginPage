var
    form=           document.getElementsByTagName('form')[0],
    username=       document.getElementById('input_username'),
    password=       document.getElementById('input_password'),
    keepmeloggedin= document.getElementsByName('keepmeloggedin')[0],
    submitInput=    document.getElementById('submitInput'),
    failedSpan=     document.getElementById('failedSpan')
module.styleByPath('plugins/althea-loginPage/main.css')
username.focus()
module.importByPath('lib/general.js',{mode:1}).then(repository=>{
    module.repository=repository
    form.addEventListener('submit',e=>{
        e.preventDefault()
        submitInput.disabled=true
        module.repository.althea.site.then(site=>
            site.login(
                username.value,
                password.value,
                keepmeloggedin.checked
            )
        ).then(res=>{
            submitInput.disabled=false
            if(res)
                return location='/'
            failedSpan.style.display=''
        })
    })
    module.repository.althea.site.then(site=>
        site.softCache('loginPluginScriptsCache',{
            function:'getPluginScripts',
            module:'login'
        })
    ).then(val=>{
        Object.keys(val).forEach(i=>eval(val[i]))
    })
})
document.getElementById('div_main').appendChild(createLinks())
function createLinks(){
    let div=document.createElement('div')
    div.innerHTML='<a href=register>Register</a>'
    return  div
}
