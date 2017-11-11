module.exports=function(althea){
    althea.addPagemodule('/login',pagemodule)
}
function pagemodule(env){
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method=='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
function get(env){
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:`
<!doctype html>
<title>Login</title>
<base href=${env.config.root}>
<meta name=viewport content='width=device-width,initial-scale=1'>
<link rel=stylesheet href=>
<div id=div_main>
<h1 id=h1_title>Login</h1>
<form>
<p>
    <input id=input_username placeholder=Username>
<p>
    <input id=input_password type=password placeholder=Password>
<p>
    <input type=checkbox name=keepmeloggedin>
    <a title="for approximate 256 years">Keep me logged in</a>
<p>
    <span id=failedSpan style=display:none>
        Login failed, due to invalid username and/or mismatched password.
    </span>
<p>
    <input id=submitInput type=submit value='Log In'>
</form>
</div>
${
    env.althea.loadModule('plugins/loginPage/main.js')
}
        `
    }
}
