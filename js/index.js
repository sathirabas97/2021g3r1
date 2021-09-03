
    window.addEventListener("scroll",function(){
        var nav = document.querySelector("nav");
        var navul = document.getElementById('navul');
        nav.classList.toggle("sticky",window.scrollY>0);
        // navul.className = "none";
    })

    function myFunction() {
        var y = document.getElementById("navul");
        console.log(y);
        if(y.className == "none"){
            y.className ="responsive";
        }else{
            y.className ="none";
        }

      }