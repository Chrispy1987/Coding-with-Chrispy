//DOM 
const showAllBands = document.querySelector("#showAllBands");
const showLikedBands = document.querySelector("#showLikedBands");
const addBand = document.querySelector("#addBand");
const bandList = document.querySelector(".bandList");


//Global variables
const arr = [];

//Convert existing array into an array of objects
//Obj - bandName
//Obj - likedStatus
const convertArray = () => {
    for(let i = 0; i < bands.length; i++) {
        let merge = {bandName: bands[i], likeStatus : "Like"};
        arr.push(merge);
    }
    console.log(arr);
}


//create new list depending on parameter:
//intialise - show all bands and buttons
//show-all-bands - show all bands and buttons
//show-only-liked - show only liked bands and their buttons
const createList = (modify) => { 
    
    //clear current list
    while(bandList.firstChild) {
        bandList.removeChild(bandList.firstChild);
    }
    
    if(modify !== "show-liked-only") {
        const h2Element = document.createElement("h2");
        h2Element.textContent = "BAND LIST";
        bandList.appendChild(h2Element); 
    } else {
        const h2Element = document.createElement("h2");
        h2Element.textContent = "LIKED BANDS";
        bandList.appendChild(h2Element);
    }

    for(index in arr) {
        const bandName = arr[index].bandName;
        const likeStatus = arr[index].likeStatus;
        const createListItem = document.createElement("li");
        const createButton = document.createElement("button");        

        if(modify !== "show-liked-only") {                                             
            createListItem.innerText = bandName;
            bandList.append(createListItem);
            
            createButton.innerText = likeStatus;
            createButton.className = "likeButton"; 
            createButton.id = index;
            createButton.style.color = likeStatus === "Like" ? "black" : "green";
            createButton.style.fontWeight = likeStatus === "Like" ? "normal" : "bold";       
            createListItem.append(createButton); 

            createButton.addEventListener("click", function () {
                const index = this.id;
                const likeStatus = arr[index].likeStatus;
                arr[index].likeStatus = likeStatus === "Like" ? "Unlike" : "Like";
                this.innerText = likeStatus === "Like" ? "Unlike" : "Like";
                this.style.color = likeStatus === "Like" ? "green" : "black";
                this.style.fontWeight = likeStatus === "Like" ? "bold" : "normal";
            })
        } else {        
            if (likeStatus === "Unlike") {
                createListItem.innerText = bandName;
                bandList.append(createListItem);

                createButton.innerText = likeStatus;
                createButton.className = "likeButton"; 
                createButton.id = index; 
                createButton.style.color = likeStatus === "Like" ? "black" : "green";
                createButton.style.fontWeight = likeStatus === "Like" ? "normal" : "bold";
                createListItem.append(createButton); 

                createButton.addEventListener("click", function () {
                    const index = this.id;
                    arr[index].likeStatus = "Like"; 
                    createList("show-liked-only");
                })                     
            }        
        }
    }
    //check if Liked List is empty 
    if (modify === "show-liked-only") {
        if (bandList.childElementCount < 2) {
            alert("You don't like any bands!");
            createList("reinitialise");
        }
    }    
}

//Add a new band object to the array. Alert if band already exists in the list
const addNewBand = (bandName) => {
    const inputFilter = bandName.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
    console.log(inputFilter);

    for (index in arr) {
        const comparison = arr[index].bandName.toLowerCase();
        console.log(comparison);
        if (inputFilter.match(comparison.toLowerCase())) {
            alert(`${inputFilter} is already on the list!`);
            return;
        }
    }
    if(inputFilter !== "") {
        let merge = {bandName: inputFilter, likeStatus: "Like"};
        arr.push(merge);
        createList("addBand");
        alert(`${inputFilter} has been added to your list!`);
    }
}

//Event Listeners
showLikedBands.addEventListener("click", function () {
    createList("show-liked-only");
});

showAllBands.addEventListener("click", function () {
    createList("show-all-bands");
})

addBand.addEventListener("click", function () {
    const userInput = prompt("Please enter a band name");
    addNewBand(userInput);    
})


//Run functions on page load
convertArray();
createList("initialise");

