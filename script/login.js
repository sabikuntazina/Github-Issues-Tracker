document.getElementById('sign-btn').addEventListener('click', function(){
    const userName= document.getElementById('input-user-name').value;
    const password= document.getElementById('input-password').value;

    if(userName.trim()=="admin" && password=="admin123"){
        window.location.assign("./home.html");
    }
    else{
        alert("Sign in failed");
        return;
    }

})