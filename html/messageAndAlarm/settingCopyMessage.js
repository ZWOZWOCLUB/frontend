const sended = document.getElementById("sended");
const sending = document.getElementById("sending");
const newWrite = document.getElementById("newWrite");


function Sended(){
sended.style.display = "block";
sending.style.display = "none";
newWrite.style.display = "none";
}
function Sending(){
sended.style.display = "none";
sending.style.display = "block";
newWrite.style.display = "none"; 
}
function NewWrite(){
sended.style.display = "none";
sending.style.display = "none";
newWrite.style.display = "block"
}


