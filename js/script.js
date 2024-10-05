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
                                        <div class= "flex gap-5 px-20 py-5 w-full border rounded-xl ">
                                        <img src=${item.category_icon}/>
                                        <button class="text-3xl font-semibold">${item.category}</button>
                                        </div>
                                        `
                                        buttonContainer.appendChild(div)
                                        
                    });
                    
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
const loadVideos = async() => {
                 fetch('https://openapi.programming-hero.com/api/peddy/pets')
                 .then(res => res.json())
                 .then(data => displayVideos(data.pets)
                 )
                 .catch(err => console.error(err))
}

const displayVideos = (videos) => {
                    const cardContainer = document.getElementById('card-container')
              videos.forEach(item => {

                    const div = document.createElement('div')
                    div.innerHTML = `
                    <div class="card card-compact object-cover border">
                                                                                                    <figure class= "mt-2 h-[200px]">
                                                                                                      <img class= "h-full rounded-xl"
                                                                                                        src=${item.image}/>
                                                                                                    </figure>
                                                                                                    <div class="card-body">
                                                                                                      <h2 class="card-title">${item.pet_name}</h2>
                                                                                                      <p>Breed : ${item.breed ? item.breed : 'Not Available'}</p>
                                                                                                      <p>Birth : ${item.date_of_birth? item.date_of_birth:'Not Available'}</p>
                                                                                                      <p>Gender : ${item.gender?item.gender:'Not Available'}</p>
                                                                                                      <p>Price : ${item.price ? item.price: 'Not Available'}</p>
                                                                                                      <div class="card-actions justify-end">
                                                                                                        <button class="btn btn-primary">Buy Now</button>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                  </div>
                    `
                    cardContainer.appendChild(div)
                    
              });
              
}

loadBtn()
loadVideos()