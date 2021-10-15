// adding function - "Add Note" button and storing data in localStorage 
showCards();
let myBtn = document.getElementById("myBtn");
myBtn.addEventListener('click', function (e){
    let notes = localStorage.getItem("notes");
    let myTxt = document.getElementById("myTxt");

    if(notes == null){
        notesObj = [];
        if(myTxt.value != ""){
            notesObj.push(myTxt.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
        }
    }
    else{
        notesObj = JSON.parse(localStorage.getItem("notes"));
        if(myTxt.value != ""){
            notesObj.push(myTxt.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
        }
    }
    myTxt.value = "";
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

    let html = "";
   notesObj.forEach(function (e,index){
        html += `<div class="card mx-4 my-3 noteCard" style="width: 18rem; background-image: url('back8.jpeg');">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
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
}

// "Delete" button function 

function deleteButton(index){
    let notes = localStorage.getItem("notes");

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
    showCards();
}

// adding search option 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let text = cardTxt.toLowerCase();  // removed bug of not searching the first word
        if(text.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})