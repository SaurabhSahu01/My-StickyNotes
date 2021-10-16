// adding function - "Add Note" button and storing data in localStorage 
localStorage.clear();
showCards();
let myBtn = document.getElementById("myBtn");
myBtn.addEventListener('click', function (e){
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    let myTxt = document.getElementById("myTxt");
    let myTitle = document.getElementById("myTitle");

    if(notes == null){
        notesObj = [];
        if(myTxt.value != ""){
            notesObj.push(myTxt.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
        }
    }
    else{
        notesObj = JSON.parse(notes);
        if(myTxt.value != ""){
            notesObj.push(myTxt.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
        }
    }
    if(title == null){
        titleObj = [];
        if(myTitle.value == ""){
            titleObj.push("Note");
        }
        else{
            titleObj.push(myTitle.value);
        }
    }
    else{
        titleObj = JSON.parse(title);
        if(myTitle.value == ""){
            titleObj.push("Note");
        }
        else{
            titleObj.push(myTitle.value);
        }
    }
    localStorage.setItem("title",JSON.stringify(titleObj));
    myTxt.value = "";
    myTitle.value = "";
    let icon = localStorage.getItem("icon");
    if(icon == null){
        iconObj = [];
    }
    else{
        iconObj = JSON.parse(icon);
    }
    iconObj.push("off");
    localStorage.setItem("icon",JSON.stringify(iconObj));
    showCards();
});

// function to add cards when user will press the add button 

function showCards(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let title = localStorage.getItem("title");
    if(title == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }

    // notes
    let html = "";
   notesObj.forEach(function (e,index){
        html += `<div class="card mx-4 my-3 noteCard" style="width: 18rem; background-image: url('back8.jpeg');">
        <div class="card-body">
            <img  src = "bulboff.gif" style="height:25px; float: right;" id="${index+1000}" class="imgClass" onclick="bookmark(this.id);" >
            <h5 class="card-title" id="cardTitle">${titleObj[index]}</h5>
            <p class="card-text">${e}</p>
            <a class="btn btn-primary" id="${index}" onclick="deleteButton(this.id);">Delete</a>
        </div>
    </div>`;
    let notesElm = document.getElementById("notes");
    if(notesObj.length == 0){
        notesElm.innerHTML = `<h5>Please add some notes!</h5>`;
    }
    else{
        notesElm.innerHTML = html;
    }
    });  
    let icon = localStorage.getItem("icon");
    if(icon == null){
        iconObj = [];
    }
    else{
        iconObj = JSON.parse(icon);
    }
    iconObj.forEach(function (e,index){
        let iconElem = document.getElementById(`${index+1000}`);
        if(e == "on"){
            iconElem.src = "bulbon.gif";
        }
        else{
            iconElem.src = "bulboff.gif";
        }
    });
}

// "Delete" button function 

function deleteButton(index){
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    if(notesObj.length == 0){
        location.reload();
    }

    if(title == null){  // title was not getting updated in the previous code
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }
    titleObj.splice(index,1);
    localStorage.setItem("title",JSON.stringify(titleObj));
    let icon = localStorage.getItem("icon");
    if(icon == null){
        iconObj = [];
    }
    else{
        iconObj = JSON.parse(icon);
    }
    iconObj.splice(index,1);
    localStorage.setItem("icon",JSON.stringify(iconObj));
    showCards();
}

// adding search option 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let text = cardTxt.toLowerCase();  // resolved bug of not searching the first word
        if(text.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})

// bookmark function 

function bookmark(index){
    let icon = localStorage.getItem("icon");
    let iconElem = document.getElementById(index);

    if(icon == null){
        iconObj = [];
    }
    else{
        iconObj = JSON.parse(icon);
    }
    if(iconElem.src.includes('on')){
        iconObj[`${index-1000}`] = "off";
    }
    else{
        iconObj[`${index-1000}`] = "on";
    }
    localStorage.setItem("icon",JSON.stringify(iconObj));
    showCards();
}
