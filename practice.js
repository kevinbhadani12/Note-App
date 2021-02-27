console.log("Note App");
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e){
    console.log("clicked addBtn");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null){
        noteObj = [];
    }else{
        noteObj = JSON.parse(notes);
    }

    myObj = {
        title : addTitle.value,
        text : addTxt.value
    }
    noteObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(noteObj);
    showNotes();
})

function showNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null){
        noteObj = [];
    }else{
        noteObj = JSON.parse(notes);
    }

    let html = "";
    noteObj.forEach(function(element, index) {
        html += `
        <div class="noteCard my-2 mx-2 " style="width: 18rem;">
            <div class="card-body ">
                <h5 class="card-title">${index + 1}.  ${element.title} </h5>
                <p id="text" class="card-text"> ${element.text} </p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
            </div>
        </div>`;
    });
    let notesEle = document.getElementById("notes");
    notesEle.innerHTML = html;
    localStorage.setItem("notes", JSON.stringify(noteObj));
}

function deleteNote(index){
    console.log("i m deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null){
        noteObj = [];
    }else{
        noteObj = JSON.parse(notes);
    }
    
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showNotes();

    console.log(noteObj); 
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    let inputVal = search.value;
    // console.log(inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element){
        let cardText = element.getElementsByTagName("div")[0].innerText;
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})