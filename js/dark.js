let mode;
mode = localStorage.getItem('mode');

if (mode ==== 'light'){
    lightMode();
}else{
    darkMode();
}

function darkMode() {
    document.getElementById("title").style.color = "white";
    document.body.style.backgroundColor = "#040040";
    //code...
    document.getElementById("darkmodebtn").style.color = "black";
    document.getElementById("darkmodebtn").style.backgroundColor = "white";
    document.getElementById("darkmodebtn").onclick = lightMode;
    document.getElementById("darkmodebtn").innerHTML = "Light Mode";
    localStorage.setItem('mode', 'dark');
    mode = localStorage.getItem('mode');
}

function lightMode() {
    document.getElementById("title").style.color = "black";
    document.body.style.backgroundColor = "lightblue";
    //more code...
    document.getElementById("darkmodebtn").style.color = "white";
    document.getElementById("darkmodebtn").style.backgroundColor = "black";
    document.getElementById("darkmodebtn").onclick = darkMode;
    document.getElementById("darkmodebtn").innerHTML = "Dark Mode";
    localStorage.setItem('mode', 'light');
    mode = localStorage.getItem('mode');
}