
//HOMEWORK: https://gist.git.generalassemb.ly/katie/45f1fc1c9f6a668a9d5d7f7f2381ec05

const animals = [
    {name: 'Truffle', picture: 'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210806141558-restricted-04b-truffles-the-kitty-glasses-kids.jpeg', status: 'available', species: 'cat'},
    {name: 'Mittens', picture: 'https://media.istockphoto.com/photos/british-kitten-with-mittens-picture-id156711869?k=20&m=156711869&s=612x612&w=0&h=QrtVAIMWnbiSucDXbKuqhOvswMCEKM7Z8NwUfhFs5sQ=', status: 'hold', species: 'cat'},
    {name: 'Shadow', picture: 'https://render.fineartamerica.com/images/rendered/default/greeting-card/images/artworkimages/medium/2/black-lab-pup-1-jonathan-ross.jpg?&targetx=-25&targety=0&imagewidth=551&imageheight=700&modelwidth=500&modelheight=700&backgroundcolor=222524&orientation=1', status: 'available', species: 'dog'},
    {name: 'Tiger', picture: 'https://www.thesprucepets.com/thmb/upOmMUmAG50RM0VoDXAOScLNKKQ=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1252795793-e24d7e980ed44d16934346866800953b.jpg', status: 'available', species: 'dog'},    {name: 'Marmalade', picture: 'https://media.istockphoto.com/photos/furry-british-breed-cat-white-color-on-isolated-black-background-picture-id980122588?k=20&m=980122588&s=612x612&w=0&h=k42voAupT85hJ0OXjKsp9drPumY5YBBAsBr1-SVK_XQ=', status: 'adopted', species: 'cat'},
    {name: 'Fluffy', picture: 'https://assets.rbl.ms/5074143/origin.jpg', status: 'available', species: 'cat'},
  ]

//Global variables
const animalList = document.getElementById("animalList");  
let screenState;

//Clear list 
const clearList = () => {
  while(animalList.hasChildNodes()) {
    animalList.firstChild.remove();
  }
}

//Using the animals array of objects, create a list of pets using grid layout
const createAnimalList = () => {  
  clearList();
  screenState = "all";
  let index = 0;  

  for (const animal of animals) { 
      const newImage = document.createElement("img");
      newImage.src = animal.picture;
      newImage.classList.add("animalImg");
      newImage.style.opacity = animal.status === "adopted" ? "0.3" : "1";

      const listItem = document.createElement("li");
      listItem.innerHTML = `${animal.name} <span class="${animal.species} ${animal.status} ${index} spanEle">${animal.status}</span>`;

      animalList.appendChild(listItem);
      animalList.appendChild(newImage);
      index +=1;     
  }
  createButtons();
}

const createButtons = () => {
  const statusList = document.querySelectorAll(".spanEle");   

  for (const item of statusList) {
    const index = item.classList[2];

    switch(item.classList[1]) {
      case "available":
        const claimButton = document.createElement("button");
        claimButton.textContent = "Adopt"
        claimButton.classList.add("claimButton");
        //Event listener for CLAIM button
        claimButton.addEventListener("click", function () {
          animals[index].status = "hold";
          if (screenState === "available-only") {
            item.parentElement.nextElementSibling.remove();
            item.parentElement.remove();
          } else {
            createAnimalList();
          }
        });
        item.append(claimButton);
        break;
      case "hold":
        const finaliseButton = document.createElement("button");
        finaliseButton.textContent = "Confirm"
        finaliseButton.classList.add("finaliseButton");
        //Event listener for FINALISE button
        finaliseButton.addEventListener("click", function () {
          animals[index].status = "adopted";
          createAnimalList();
        })
        item.append(finaliseButton);

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel"
        cancelButton.classList.add("cancelButton");
        //Event listener for CANCEL button
        cancelButton.addEventListener("click", function () {
          animals[index].status = "available";
          createAnimalList();
        })
        item.append(cancelButton);
        break;
      default:
        break;
    } 
  }
}

const showAvailablePets = () => {  
  //Check if there are any pets available (no point displaying an empty screen!)
  let availability = 0;  
  for (const index in animals) {
    animals[index].status === "available" ? availability++ : availability;
  }  
  if (availability === 0) {
    return alert("There are no available pets");
  }   

  //If there are pets available, filter out the unavailable ones
  screenState = "available-only";
  const statusList = document.querySelectorAll(".spanEle"); 
  
  for (const item of statusList) {
    const index = item.classList[2];
    switch(item.classList[1]) {
      case "adopted" :
      case "hold" :
        item.parentElement.nextElementSibling.remove();
        item.parentElement.remove();
        break;      
    }    
  }
}

//Check selection value, pass animal type into next function
const checkFilter = () => {
  const type = document.querySelector("#animalFilter").value;
  switch (type) {
    case "" :
      return alert("Please select filter type");
    default: 
      filterAnimalType(type);
      break;
  }
}

//Filter results to only show the requested animal type
const filterAnimalType = (type) => {
  createAnimalList();

  screenState = "available-only";
  const statusList = document.querySelectorAll(".spanEle"); 
  
  for (const item of statusList) {
    const index = item.classList[2];
    switch(item.classList[0]) {
      case type :
        break;
      default :
        item.parentElement.nextElementSibling.remove();
        item.parentElement.remove();
        break;      
    }    
  }
}

//User to provide pets name and a link to their picture. Reload list
const addNewPet = () => {  
  let getPetName = prompt("Please enter the animals name");  

  while (getPetName === "" || null) {
    getPetName = prompt("Please enter the animals name");  
  }
  const getPetImage = prompt(`Please provide a URL link to a picture of the ${getPetName}`);
  while (getPetImage === "") {
    getPetImage = prompt(`Please provide a URL link to a picture of the ${getPetName}`);
  }
  while (getPetName === "" || null) {
    getPetName = prompt(`What species of animal is ${getPetName}?`);  
  }
  const getSpecies = prompt(`What species of animal is ${getPetName}?`);
  while (getSpecies === "") {
    getSpecies = prompt("Please provide a URL link to a picture of the animal");
  }
  animals.push({name: getPetName, picture: getPetImage, status: "available", species: getSpecies})
  createAnimalList();
}

//Sort results either alphabetically or by status
const sortItems = () => {
  const sortType = document.querySelector("#sort").value;
  switch(sortType) {
    case "alphabetical" :
      animals.sort((firstIndex, secondIndex) => {
        const name1 = firstIndex.name.toLowerCase();
        const name2 = secondIndex.name.toLowerCase();

        if (name1 < name2) {
          return -1;
        }
        if (name1 > name2) {
          return 1;
        }
        return 0
      })
      createAnimalList();
      break;
    case "status" :
      animals.sort((firstIndex, secondIndex) => {
        const status1 = firstIndex.status.toLowerCase();
        const status2 = secondIndex.status.toLowerCase();

        if (status1 < status2) {
          return -1;
        }
        if (status1 > status2) {
          return 1;
        }
        return 0
      })
      createAnimalList();
  }
}



//Menu Event Listers
document.querySelector(".showAll").addEventListener("click", createAnimalList);
document.querySelector(".showAvailable").addEventListener("click", showAvailablePets);
document.querySelector(".addPet").addEventListener("click", addNewPet);
document.querySelector(".filterButton").addEventListener("click", checkFilter);
document.querySelector(".sortButton").addEventListener("click", sortItems);

//First load
createAnimalList();
