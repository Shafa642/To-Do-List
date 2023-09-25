const inputBox = document.getElementById("taskInput");
const listContainer = document.querySelector(".list-container");
const submitButton = document.querySelector(".submit");
const listDelete = document.querySelectorAll(".listDelete")
const myTasks = document.querySelectorAll(".mytasks")
const deleteInput = document.querySelector(".input-delete")
let filter = document.querySelector(".filter-img");
let toDoList = [];


function setArray() {
    let text = ""
    toDoList.forEach((item, index) => {
        text += `<li><p>${item}</p><img class="listDelete" onclick="deleteTasks(${index})" src="./assets/remove.svg"</li>` 
    });
    listContainer.innerHTML = text;
    localStorage.setItem('data', JSON.stringify(toDoList));
}

let existedData = localStorage.getItem('data', (toDoList))
if (existedData) {
    toDoList = JSON.parse(existedData)
    setArray();
}


function addTask() {
    if (inputBox.value === '') {
        alert("You must write something")
    } else {
        toDoList.push(inputBox.value)
        setArray(toDoList)
    }
    inputBox.value = "";
    saveData();
}

submitButton.addEventListener("click", addTask);


function deleteTasks(toDoIndex) {
    toDoList = toDoList.filter((item, index) => {
        if (index !== toDoIndex) {
            return item
        }
    })

    setArray()
   
}



filter.addEventListener('mouseover', (e) => {
    if (e.target.getAttribute('src') == './assets/defaultup.png') {
        e.target.setAttribute("src", "./assets/upfilter.png");
    } else {

        e.target.setAttribute("src", "./assets/downfilter.png");
    }
});

filter.addEventListener('mouseout', (e) => {
    if (e.target.getAttribute("src") == "./assets/upfilter.png") {
        e.target.setAttribute("src", "./assets/defaultup.png");
    } else {
        e.target.setAttribute("src", "./assets/defaultdown.png");
    }
});


filter.addEventListener("click", (e) => {
    if (e.target.getAttribute("src") == "./assets/downfilter.png") {
        toDoList.sort();
        setArray(toDoList);
        e.target.setAttribute("src", "./assets/upfilter.png")
    }
    else {
        toDoList.sort().reverse();
        setArray(toDoList);
        e.target.setAttribute("src", "./assets/downfilter.png")
    }
})


deleteInput.addEventListener('click', () => {
    inputBox.value = ""
});






function saveData() {
    localStorage.setItem("data", JSON.stringify(toDoList));
 }
