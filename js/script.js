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
     //                   *DISPLAY VIDEOS*               //
const loadVideos = (category) => {
  document.getElementById('api-card').classList.remove('hidden')
  document.getElementById('spinner').classList.add('hidden')
                 fetch(`https://openapi.programming-hero.com/api/peddy/pets?category/${category}`)
                 .then(res => res.json())
                 .then(data => displayVideos(data.pets)
                 )
                 .catch(err => console.error(err))
}

const displayVideos = (videos) => {
                    const cardContainer = document.getElementById('card-container')
                    cardContainer.innerHTML = ''
             if(videos.length === 0){
                            cardContainer.classList.remove('grid')
                            cardContainer.innerHTML = `
                              <div class = "flex flex-col h-[400px] sm:h-[600px] justify-center items-center gap-4">
                              <img src="images/error.webp" alt="">
                              <h1 class= "text-2xl md:text-3xl lg:text-4xl font-bold "> No Information Here IN This Category</h1>
                              </div>
                            `}
                            else{
                                                cardContainer.classList.add('grid')        
                            }
              videos.forEach(item => {
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
                            <button  onclick="addImg('${item.image}')" class = "bg-green-700 text-white flex justify-center py-2 w-full border text-2xl lg:text-3xl  rounded-xl ">
                            <i class="fa-solid fa-thumbs-up "></i></button>
                            <button  onclick="CountdownModal(this)" id="myBtn" class = "w-full bg-green-700 text-white py-2 border rounded-xl text-xl font-semibold ">Adopt</button>
                             <button onclick="detailsModalCall('${item.petId}')" class = "bg-green-700 text-white font-semibold text-xl w-full py-2 border rounded-xl ">Details</button>
                             </div>
                            
                        </div>
                      </div>
                    `
                    cardContainer.appendChild(div)
             });           
}

const detailsModalCall = (id) => {
  
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
                 .then(res => res.json())
                 .then(data => displayModal(data.petData))
                 .catch(err => console.error(err))
                 
                }

const displayModal = (item) => {
  const modalContainer = document.getElementById("details-modal-div")
  modalContainer.innerHTML = `
                                <img class= "w-full rounded-xl" src = ${item.image}/> 
                                <div class="space-y-2">
                                <h2 class="text-2xl font-semibold mt-3">${item.pet_name}</h2>
                                <div class = "flex flex-col sm:flex-row justify-between">
                          <p class= "flex text-xl"><img src="images/Frame (2).png" alt=""/> Breed: ${item.breed ? item.breed : 'Not Available'}</p>
                          <p class= "flex text-xl" ><img src="images/Frame.png" alt=""/> Birth : ${item.date_of_birth ? item.date_of_birth :'Not Available'}</p>
                                </div>
                          <div class = "flex flex-col sm:flex-row justify-between">
                          <p class= "flex text-xl"> <img src="images/Frame (1).png" alt=""/> Gender : ${item.gender ? item.gender :'Not Available'}</p>
                          <p class= "flex text-xl"><img src="images/Frame (3).png" alt=""/> Price : ${item.price ? item.price : 'Not Available'}</p>
                          </div>
                          <p class="text-xl">vaccinated_status: ${item.vaccinated_status ? item.vaccinated_status : 'Not'}</p>
                          <div>
                          <h1 class= "font-semibold text-2xl mb-4">Details Description :</h1>
                          <p class= "flex text-xl "> ${item.pet_details ? item.pet_details : 'Not Available'}</p>
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

const CountdownModal = (x) => {
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
            x.textContent = 'Adopted'
            x.classList.add('text-[#A9A9A9]','bg-[#DCDCDC]')
            x.disabled = true ;
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