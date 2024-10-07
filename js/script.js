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
                                        <div id= "btn-${item.category}" onclick="displayOneBtn('${item.category}')" class= "category-btn flex justify-center gap-5  py-5 w-full border " style="border-radius: 20px;">
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
                  item.classList.remove('bg-green-100','rounded-full')
                  
                  }
                  const activeBtn = document.getElementById(`btn-${category}`)
                  activeBtn.classList.add('bg-green-100','rounded-full')
                  
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
                console.log(item.pet_details);
                
                    const div = document.createElement('div')
                    div.innerHTML = `
                    <div class="card card-compact object-cover border h-full">
                        <figure class= "mt-2 h-[250px] sm:h-[200px] ">
                          <img class= "h-full px-2 w-full rounded-xl"
                            src=${item.image}/>
                        </figure>
                        <div class="card-body">
                          <h2 class="text-2xl font-semibold mt-3">${item.pet_name}</h2>
                          <p class= "flex items-center  text-xl"><img src="images/Frame (2).png" alt=""> Breed : ${item.breed ? item.breed : 'Not Available'}</p>
                          <p class= "flex items-center  text-xl" ><img src="images/Frame.png" alt=""> Birth : ${item.date_of_birth? item.date_of_birth:'Not Available'}</p>
                          <p class= "flex items-center  text-xl"> <img src="images/Frame (1).png" alt=""> Gender : ${item.gender?item.gender:'Not Available'}</p>
                          <p class= "flex items-center  text-xl "><img src="images/Frame (3).png" alt=""> Price : ${item.price ? item.price: 'Not Available'}</p>
                          <div class=" flex justify-between gap-4">
                            <button  onclick="addImg('${item.image}')" class = "flex justify-center py-2 w-full border  rounded-xl"><img class="w-[30px]" src="images/Vector.png" alt=""></button>
                            <button onclick="CountdownModal()" id="myBtn" class = "w-full py-2 border rounded-xl text-xl font-semibold text-green-700">Adopt</button>
                            <button onclick="detailsModal('${item.image}','${item.pet_name}','${item.breed}','${item.date_of_birth}','${item.gender}','${item.price}','${item.vaccinated_status}','${item.pet_details}')" class = " font-semibold text-xl w-full py-2 border rounded-xl text-green-700">Details</button>
                          </div>
                        </div>
                      </div>
                    `
                    cardContainer.appendChild(div)
                    
              });
              
}
// {
//   "petId": 1,
//   "breed": "Golden Retriever",
//   "category": "Dog",
//   "date_of_birth": "2023-01-15",
//   "price": 1200,
//   "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//   "gender": "Male",
//   "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//   "vaccinated_status": "Fully",
//   "pet_name": "Sunny"
// }
const detailsModal = (one, two, three, four, five, six, seven, eight) => {
  const modalContainer = document.getElementById("details-modal-div")
       modalContainer.innerHTML = `
                                <img class= "w-full rounded-xl" src = ${one}/> 
                                <div class="space-y-2">
                                <h2 class="text-2xl font-semibold mt-3">${two}</h2>
                                <div class = "flex flex-col sm:flex-row justify-between">
                          <p class= "flex text-xl"><img src="images/Frame (2).png" alt=""/> Breed: ${three ? three : 'Not Available'}</p>
                          <p class= "flex text-xl" ><img src="images/Frame.png" alt=""/> Birth : ${four ? four:'Not Available'}</p>
                                </div>
                          <div class = "flex flex-col sm:flex-row justify-between">
                          <p class= "flex text-xl"> <img src="images/Frame (1).png" alt=""/> Gender : ${five ? five :'Not Available'}</p>
                          <p class= "flex text-xl"><img src="images/Frame (3).png" alt=""/> Price : ${six ? six : 'Not Available'}</p>
                          </div>
                          <p class="text-xl">vaccinated_status: ${seven ? seven : 'Not Available'}</p>
                          <div>
                          <h1 class= "font-semibold text-2xl mb-4">Details Description</h1>
                          <p class= "flex text-xl "> ${eight ? eight : 'Not Available'}</p>
                          </div>
                        
                          </div>
                         
       `


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

const CountdownModal = () => {
  document.getElementById('my_modal_2').classList.remove('hidden')
   const modalContainer = document.getElementById("adopt-modal-div")
       modalContainer.innerHTML = `
       <i class="fa-solid fa-handshake text-6xl text-red-500"></i>
       <h1 class="text-3xl font-bold">Congrats</h1>
                <p class= "text-xl font-medium">Adoption Process Is Start For your Pet</p>
                  <p id="countdown" class= "text-2xl font-semibold"></p>`

       document.getElementById('my_modal_2').showModal()

       // modal.classList.remove('hidden')
  const count = document.getElementById("countdown");
    let countTime = 3; 

    let countInterval = setInterval(function() {
        count.textContent = countTime 
        countTime--;

        if (countTime < 0) {
            clearInterval(countInterval);
            // document.getElementById('my_modal_2').classList.add('hidden')
            document.getElementById('my_modal_2').close()
        }
    }, 1000);
  
  
}

const SortPetsByPrice = async() => {
  const allBtn = document.getElementsByClassName('category-btn');
                for(let item of allBtn){
                  item.classList.remove('bg-green-100')
                  }
  document.getElementById('api-card').classList.remove('hidden')
  document.getElementById('spinner').classList.add('hidden')
  try {
      const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
      const data = await res.json();
      const sortPets = data.pets.sort((a, b) => b.price - a.price);
      displayVideos(sortPets);
  }
   catch (error) {
      console.error( error);
  }
}

const sortCall = () => {
  document.getElementById('api-card').classList.add('hidden')
  document.getElementById('spinner').classList.remove('hidden')
  setTimeout(() => {
    SortPetsByPrice()
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