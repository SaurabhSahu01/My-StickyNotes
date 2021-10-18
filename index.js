// adding function - "Add Note" button and storing data in localStorage 
showCards();
let myBtn = document.getElementById("myBtn");
myBtn.addEventListener('click', function (e) {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    let myTxt = document.getElementById("myTxt");
    let myTitle = document.getElementById("myTitle");

    if (notes == null) {
        notesObj = [];
        if (myTxt.value != "") {
            notesObj.push(myTxt.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
        }
    }
    else {
        notesObj = JSON.parse(notes);
        if (myTxt.value != "") {
            notesObj.push(myTxt.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
        }
    }
    if(title == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }
    if((myTxt.value != "") && (myTitle.value == "")){
        titleObj.push("Note");
    }
    else if((myTxt.value != "") && (myTitle.value != "")){
        titleObj.push(myTitle.value);
    }
    localStorage.setItem("title", JSON.stringify(titleObj));
    
    let icon = localStorage.getItem("icon");
    if (icon == null) {
        iconObj = [];
    }
    else {
        iconObj = JSON.parse(icon);
    }
    if(myTxt.value != ""){
        iconObj.push("off");
    }
    localStorage.setItem("icon", JSON.stringify(iconObj));
    let date = localStorage.getItem("date");
    let today = new Date();
    let hour = ("0" + today.getHours()).slice(-2);
    let minute = ("0" + today.getMinutes()).slice(-2);
    let localDate = today.toLocaleDateString();
    let cardTime =  `${hour}:${minute}, ${localDate}`;
    if(date == null){
        dateObj = [];
    }
    else{
        dateObj = JSON.parse(date);
    }
    if(myTxt.value != ""){
        dateObj.push(cardTime);
    }
    localStorage.setItem("date",JSON.stringify(dateObj));
    myTxt.value = "";
    myTitle.value = "";
    showCards();
});

// function to add cards when user will press the add button 

function showCards() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }

    // notes
    let html = "";
    notesObj.forEach(function (e, index) {
        html += `<div class="card mx-4 my-3 noteCard" style="width: 18rem; background-image: url('back8.jpeg');">
        <div class="card-body">
            <img  src = "bulboff.gif" style="height:25px; float: right;" id="${index + 1000}" class="imgClass" onclick="bookmark(this.id);" >
            <h5 class="card-title" id="cardTitle">${titleObj[index]}</h5>
            <p class="card-text">${e}</p>
            <a class="btn btn-primary" id="${index}" onclick="deleteButton(this.id);">Delete</a>
            <h6 style="float:right; color: rgba(0,100,0,0.5);"></h6>
        </div>
    </div>`;
        let notesElm = document.getElementById("notes");
        if (notesObj.length == 0) {
            notesElm.innerHTML = `<h5>Please add some notes!</h5>`;
        }
        else {
            notesElm.innerHTML = html;
        }
    });
    let icon = localStorage.getItem("icon");
    if (icon == null) {
        iconObj = [];
    }
    else {
        iconObj = JSON.parse(icon);
    }
    iconObj.forEach(function (e, index) {
        let iconElem = document.getElementById(`${index + 1000}`);
        if (e == "on") {
            iconElem.src = "bulbon.gif";
        }
        else {
            if(iconElem != null){
                iconElem.src = "bulboff.gif";
            }   
        }
    });
    let date = localStorage.getItem("date");
    if(date == null){
        dateObj = [];
    }
    else{
        dateObj = JSON.parse(date);
    }
    dateObj.forEach(function (e,index){
        let dateElem = document.getElementsByTagName("h6");
        dateElem[index].innerHTML = dateObj[index];
    })
}

// "Delete" button function 

function deleteButton(index) {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    if (notesObj.length == 0) {
        location.reload();
    }

    if (title == null) {  // title was not getting updated in the previous code
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }
    titleObj.splice(index, 1);
    localStorage.setItem("title", JSON.stringify(titleObj));
    let icon = localStorage.getItem("icon");
    if (icon == null) {
        iconObj = [];
    }
    else {
        iconObj = JSON.parse(icon);
    }
    iconObj.splice(index, 1);
    localStorage.setItem("icon", JSON.stringify(iconObj));
    let date = localStorage.getItem("date");
    if(date == null){
        dateObj = [];
    }
    else{
        dateObj = JSON.parse(date);
    }
    dateObj.splice(index,1);
    localStorage.setItem("date",JSON.stringify(dateObj));
    showCards();
}

// adding search option 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let titleTxt = element.getElementsByTagName("h5")[0].innerText;
        let dateTxt = element.getElementsByTagName("h6")[0].innerText;

        let text1 = cardTxt.toLowerCase();  // resolved bug of not searching the first word
        let text2 = text1 + " " + titleTxt.toLowerCase() + " " + dateTxt; // now title and dates can also be searched

        if (text2.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
// bookmark function 

function bookmark(index) {
    let icon = localStorage.getItem("icon");
    let iconElem = document.getElementById(index);

    if (icon == null) {
        iconObj = [];
    }
    else {
        iconObj = JSON.parse(icon);
    }
    if (iconElem.src.includes('on')) {
        iconObj[`${index - 1000}`] = "off";
    }
    else {
        iconObj[`${index - 1000}`] = "on";
    }
    localStorage.setItem("icon", JSON.stringify(iconObj));
    showCards();
}
