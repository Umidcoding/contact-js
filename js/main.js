let elForm = document.querySelector(".contact__form");
let resultList = document.querySelector('.contact__list');
let contactBtns = document.querySelector('.contact__btns');
let btns = document.querySelectorAll('.contact__ctbtn');
// input=======================================================================================
let inputName = document.querySelector('.name');
let inputRelation = document.querySelector('.relation');
let inputTel = document.querySelector('.tel');
let inputSearch = document.querySelector('.searchinp');

elForm.addEventListener("submit", addContact);
contactBtns.addEventListener("click", resFunc)

let arr = []
let family = []
let freinds = []
let relatives = []


function removeClass() {
  btns.forEach((btn => {
    btn.classList.remove('active')
  }))
}

removeClass();
showContent()


function showContent(index = 0) {
  btns[index].classList.add('active')
}

function addContact(e) {
  e.preventDefault();
  let nameValue = inputName.value;
  let relationValue = inputRelation.value;
  let telValue = inputTel.value;

  if(telValue.match(/^(\+998?\d{9})$/)) {
    let newContact = {
      name:nameValue.toLowerCase(),
      rel:relationValue,
      tel:telValue
    }
    arr.push(newContact)

    

    
    if(relationValue === "Family") {
      family.push(newContact)
     
      
    } else if(relationValue === "Freinds") {
      freinds.push(newContact)
      
    } else if(relationValue === "Relatives") {
      relatives.push(newContact)
    }

    showContact(arr)
    e.target.reset()
  } else {
    alert("Raqamni to'g'ri formatda kiriting.")
  }
}


function showContact(data) {
  resultList.innerHTML = ''

  data.forEach((item, index) => {
    let li = document.createElement('li');
    li.classList.add('list-group-item','contact__item')

    let h3 = document.createElement('h3')
    h3.textContent = item['name']
    let isName = h3.textContent.charAt(0).toUpperCase() + h3.textContent.slice(1)
    h3.textContent = isName
    let p = document.createElement('p');
    p.textContent = item['rel']

    let a = document.createElement('a');
    a.classList.add('btn', 'btn-primary');
    a.textContent = item['tel']
    a.setAttribute("href", `tel:${item.tel}`)

    li.append(h3,p,a);
    resultList.append(li)
  })
}

function resFunc(event) {
  
  if(event.target && event.target.classList.contains('contact__ctbtn')) {
    btns.forEach((item,index) => {
      if(event.target == item) {
        removeClass();
        showContent(index);
      }
    })
    let selectedCategory = event.target.textContent;
    let filteredContacts = arr.filter(item => item.rel === selectedCategory);
    showContact(filteredContacts);
    console.log(filteredContacts)
    if(selectedCategory === "All") {
      showContact(arr)
    }   
  }
}

inputSearch.addEventListener("keyup", (e) => {
  let value = e.target.value.toLowerCase();
  let filterName = arr.filter(isname => isname.name.includes(value) || isname.tel.includes(value))

  showContact(filterName)
 })