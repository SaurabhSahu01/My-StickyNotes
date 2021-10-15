let icon = document.getElementById('icon');
icon.src = "bulboff.gif";

icon.addEventListener('click',function (e){
    
    if(icon.src.includes('off')){
        icon.src = "bulbon.gif";
    }
    else{
        icon.src = "bulboff.gif";
    }

})