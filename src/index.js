let addToy = false;

document.addEventListener('click', (event) => {

  if (event.target.classList.contains('like-btn')) {

    let card = event.target.closest('div.card')
    let likesDisplay=card.querySelector('p')
    let likes=parseInt(likesDisplay.textContent.split(" ")[0])
    let newLikes=likes+1
    fetch(`http://localhost:3000/toys/${card.dataset.id} `, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes 
      })
    })
      .then(r =>r.json())
      .then(() => {
        likesDisplay.textContent=newLikes+" Likes"
      })
  }

})

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function processNewCard(e) {
    let newName = e.target.name.value
    let newImage = e.target.image.value
    let newLikes = 0
    let postOptions = {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    postOptions.body=JSON.stringify({
      "name": newName,
      "image": newImage,
      "likes": newLikes
    })

    fetch("http://localhost:3000/toys",postOptions).then(r=>r.json)
      .then(j=>{
        let toyCollectionDiv = document.querySelector('#toy-collection')
        let newCard = document.createElement('div')
        newCard.classList.add('card')
        newCard.dataset.id=j.id
        console.log(j)
        const image = j.image
        const likes = j.likes
        const name = j.name

        let nameDisplay = document.createElement("h2")
        nameDisplay.innerHTML = name
        newCard.append(nameDisplay)

        let imageDisplay = document.createElement("img")
        imageDisplay.src = image
        imageDisplay.classList.add('toy-avatar')
        newCard.append(imageDisplay)

        let likesDisplay = document.createElement("p")
        likesDisplay.innerHTML = likes + " Likes"
        newCard.append(likesDisplay)

        let buttonDisplay = document.createElement("button")
        buttonDisplay.classList.add("like-btn")
        buttonDisplay.innerHTML = "Like <3"
        newCard.append(buttonDisplay)

        toyCollectionDiv.append(newCard)
      })
  }

  const createToyForm = document.querySelector('.add-toy-form')
  createToyForm.addEventListener('submit', (e) => processNewCard(e))


  let toyCollectionDiv = document.querySelector('#toy-collection')
  fetch('http://localhost:3000/toys').then(r => r.json())
    .then(j => {
      for (const toy of j) {
        let newCard = document.createElement('div')
        newCard.classList.add('card')
        newCard.dataset.id=toy.id
        console.log(toy)

        const image = toy.image
        const likes = toy.likes
        const name = toy.name

        let nameDisplay = document.createElement("h2")
        nameDisplay.innerHTML = name
        newCard.append(nameDisplay)

        let imageDisplay = document.createElement("img")
        imageDisplay.src = image
        imageDisplay.classList.add('toy-avatar')
        newCard.append(imageDisplay)

        let likesDisplay = document.createElement("p")
        likesDisplay.innerHTML = likes + " Likes"
        newCard.append(likesDisplay)

        let buttonDisplay = document.createElement("button")
        buttonDisplay.classList.add("like-btn")
        buttonDisplay.innerHTML = "Like <3"
        newCard.append(buttonDisplay)

        toyCollectionDiv.append(newCard)
      }
    })



  });
