//*                 DISPLAY BUTTONS                *//
const loadBtn = () => {
                    fetch('https://openapi.programming-hero.com/api/peddy/categories')
                    .then(res => res.json())
                    .then(data => displayBtn(data.categories)
)
.catch(error => console.error(error))
}

const displayBtn =(buttons) => {
                    const buttonContainer = document.getElementById('button-container')
                    buttons.forEach((item) => {
                                        
                                        const div = document.createElement('div')
                                div.innerHTML= `
                                        <div id= "btn-${item.category}" onclick="displayOneBtn('${item.category}')" class= "category-btn flex justify-center gap-5  py-5 w-full border rounded-xl ">
                                        <img src=${item.category_icon}/>
                                        <button  class="text-3xl font-semibold">${item.category}</button>
                                        </div>
                                        `
                                        buttonContainer.appendChild(div)
                                        
                    });
                    
}

const loadCategoryVideos = (category) => {
  document.getElementById('api-card').classList.remove('hidden')
  document.getElementById('spinner').classList.add('hidden')
                    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
                    .then(res => res.json())
                    .then(data => {
                      const allBtn = document.getElementsByClassName('category-btn');
                for(let item of allBtn){
                  item.classList.remove('bg-green-100')
                  }
                  const activeBtn = document.getElementById(`btn-${category}`)
                  activeBtn.classList.add('bg-green-100')
                  
                            displayVideos(data.data)
                    
})
                    .catch(err => console.error(err))
                    
}

const displayOneBtn = (category) => {
  document.getElementById('api-card').classList.add('hidden')
  document.getElementById('spinner').classList.remove('hidden')
                    setTimeout(() => {
                      loadCategoryVideos(category)
                    },2000)
                    
}

// {
//                     "petId": 4,
//                     "breed": "Holland Lop",
//                     "category": "Rabbit",
//                     "date_of_birth": "2023-06-30",
//                     "price": 200,
//                     "image": "https://i.ibb.co.com/4g3Jrjf/pet-4.jpg",
//                     "gender": "Female",
//                     "pet_details": "This adorable female Holland Lop rabbit, born on June 30, 2023, is known for her calm and gentle nature. She thrives in quiet environments and enjoys being handled with care. Priced at $200, she is an ideal pet for those looking for a low-maintenance, friendly rabbit. Note that she is not vaccinated.",
//                     "vaccinated_status": "Not",
//                     "pet_name": "Nibbles"
//                 }

                    //                   *DISPLAY VIDEOS*               //
const loadVideos = (category) => {
  document.getElementById('api-card').classList.remove('hidden')
  document.getElementById('spinner').classList.add('hidden')
                 fetch(`https://openapi.programming-hero.com/api/peddy/pets?category/${category}`)
                 .then(res => res.json())
                 .then(data => displayVideos(data.pets)
                 )
                 .catch(err => console.error(err))
                 console.log(category);
                 
}

const displayVideos = (videos) => {
                    const cardContainer = document.getElementById('card-container')
                    cardContainer.innerHTML = ''

                    if(videos.length === 0){
                            cardContainer.classList.remove('grid')
                            cardContainer.innerHTML = `
                              <div class = "flex flex-col h-[400px] sm:h-[600px] justify-center items-center gap-4">
                              <img src="images/error.webp" alt="">
                              <h1 class= "text-2xl font-bold "> No Content Here IN This Category</h1>
                              </div>
                            `}
                            else{
                                                cardContainer.classList.add('grid')        
                            }
              videos.forEach(item => {

                    const div = document.createElement('div')
                    div.innerHTML = `
                    <div class="card card-compact object-cover border">
                        <figure class= "mt-2 h-[250px] sm:h-[200px] ">
                          <img class= "h-full px-2 w-full rounded-xl"
                            src=${item.image}/>
                        </figure>
                        <div class="card-body">
                          <h2 class="card-title">${item.pet_name}</h2>
                          <p class= "flex"><img src="images/Frame (2).png" alt=""> Breed : ${item.breed ? item.breed : 'Not Available'}</p>
                          <p class= "flex" ><img src="images/Frame.png" alt=""> Birth : ${item.date_of_birth? item.date_of_birth:'Not Available'}</p>
                          <p class= "flex"> <img src="images/Frame (1).png" alt=""> Gender : ${item.gender?item.gender:'Not Available'}</p>
                          <p class= "flex"><img src="images/Frame (3).png" alt=""> Price : ${item.price ? item.price: 'Not Available'}</p>
                          <div class=" flex justify-between gap-4">
                            <button  onclick="addImg('${item.image}')" class = "flex justify-center py-2 w-full border rounded-xl"><img src="images/Vector.png" alt=""></button>
                            <button onclick="CountdownModal()" id="myBtn" class = "w-full py-2 border rounded-xl text-green-700">Adopt</button>
                            <button onclick="detailsModal('${item.image}','${item.pet_name}','${item.breed}','${item.date_of_birth}','${item.gender}','${item.price}')" class = " w-full py-2 border rounded-xl text-green-700">Details</button>
                          </div>
                        </div>
                      </div>
                    `
                    cardContainer.appendChild(div)
                    
              });
              
}

const detailsModal = (one, two, three, four, five, six) => {
  const modalContainer = document.getElementById("details-modal-div")
       modalContainer.innerHTML = `
                                <img class= "w-full rounded-xl" src = ${one}/> 
                                <div class="card-body">
                                <h2 class="card-title">${two}</h2>
                          <p class= "flex"><img src="images/Frame (2).png" alt=""> Breed : ${three ? three : 'Not Available'}</p>
                          <p class= "flex" ><img src="images/Frame.png" alt=""> Birth : ${four ? four:'Not Available'}</p>
                          <p class= "flex"> <img src="images/Frame (1).png" alt=""> Gender : ${five ? five :'Not Available'}</p>
                          <p class= "flex"><img src="images/Frame (3).png" alt=""> Price : ${six ? six : 'Not Available'}</p>
                          </div>
       `


        // document.getElementById('showModalData').click()
        document.getElementById('my_modal_5').showModal()
  
}

const addImg = (img) => {
  const cardImgAdd = document.getElementById('card-image-add')
  const div = document.createElement('div')
  div.innerHTML = `<figure class= "mt-2">
                            <img class= " rounded-xl" src = ${img}/> 
                            </figure>
  `
  cardImgAdd.appendChild(div)
  
}

const modal = document.getElementById("myModal");
const CountdownModal = () => {
  
  modal.classList.remove('hidden')
  const count = document.getElementById("countdown");
    let countTime = 3; 

    let countInterval = setInterval(function() {
        count.textContent = countTime 
        countTime--;

        if (countTime < 0) {
            clearInterval(countInterval);
            modal.style.display = "none";
        }
    }, 1000);
  
  
}

const loadVideosCall = () => {
  document.getElementById('api-card').classList.add('hidden')
  document.getElementById('spinner').classList.remove('hidden')
  setTimeout(() => {
    loadVideos()
  }, 2000);
}

loadBtn()
loadVideosCall()