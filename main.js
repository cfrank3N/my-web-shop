//Validation for the form
//Valid expressions for each field
const regexName = new RegExp(/^(?!.{50})[A-Za-zåäöÅÄÖ\s]+\s[A-Za-zåäöÅÄÖ\s]+$/); //Done
const regexPhone = new RegExp(/^[0-9\-\(\)\s]{4,50}$/); //Done
const regexEmail = new RegExp(/^(?!.{50})[A-Za-zåäöÅÄÖ\.-_0-9]+@[A_Za-zåäöÅÄÖ\.-_0-9]+\.[a-z]{2,}$/); //Done
const regexStreet = new RegExp(/^(?!.{50})[A-Za-zåäöÅÄÖ\s0-9]{2,}$/); //Done
const regexZipCode = new RegExp(/^[0-9]{5}|[0-9]{3}\s[0-9]{2}$/); //Done
const regexCity = new RegExp(/^[A-Za-zåäöÅÄÖ\s]{2,50}$/); //Done

const validations = [regexName, regexPhone, regexEmail, regexStreet, regexZipCode, regexCity];

//Adds eventlistener to form to perform validation
document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("myForm");
  if (form != null) {
    form.addEventListener("submit", validateFields);
  }
});

//Validation function for the form
function validateFields(e) {
  //Prevents the form from submitting and refreshing
  e.preventDefault();
  
  //All input values in the form to preform validation on
  let fullName = document.getElementById("name");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let street = document.getElementById("street");
  let zipCode = document.getElementById("zipCode");
  let city = document.getElementById("city");
  
  //Adds the input values to an array to validate everything in a for loop
  const values = [fullName, phone, email, street, zipCode, city];

  //Validating each field against it's corresponding expression
  for (i in values) {

    //If the expression is true add "is-valid" to the values class to display a green check-icon"
    if (validations[i].test(values[i].value)) {
      
      //Removes "is-invalid" if it was invalid in the previous attempt
      if (values[i].classList.contains("is-invalid")) {
        values[i].classList.remove("is-invalid");
      }

      //Adds valid to the input
      values[i].classList.add("is-valid");

    } else {
      //Removes "is-valid" if it was valid in the previous attempt
      if (values[i].classList.contains("is-valid")) {
        values[i].classList.remove("is-valid");
      }

      //Adds invalid to the input
      values[i].classList.add("is-invalid");
    }

    let validInputs = 0;

    values.forEach(value => value.classList.contains("is-valid") ? validInputs ++ : validInputs -= 1 );

    if (validInputs === values.length) {
      let success = new bootstrap.Modal(document.getElementById("paymentAccepted"));
      success.show();
    }
  }
}
//End of validation script

//Close modal and go back to homepage
function closeModal() {
  
  let success = new bootstrap.Modal(document.getElementById("paymentAccepted"));
  success.hide();
  setTimeout(
    () => window.location.href = "index.html",
    400
  )
  
}

let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function populateProducts() {
  await fetchProducts();
  let output = `<div class="row">`;
  for (let i in products){
    if (i % 4 == 0)
      output += `</div><div class="row">`;

    output += `
        <div class="col-sm-6 col-lg-3 my-3">
            <div class="card h-100 shadow scale-on-hover cursor-pointer rounded-5" role="button">
                <div class="card-body" data-bs-toggle="modal" data-bs-target="#productModal" onclick="populateProductPopUp(${i})">
                    <!-- pics -->
                    <div class="position-relative mt-3 card-image-container">
                        <img src="${products[i].image}" class="card-img-top card-image-custom position-absolute top-50 start-50 translate-middle img-fluid w-75 object-fit-contain" alt="${products[i].title}">
                    </div>
                    <!-- info -->
                    <div class="mt-4 ms-2">
                        <h5 class="product-title">${getFirstFiveWords(products[i].title)}</h5>
                    </div>
                </div>
                <!-- bottom section -->
                <div class="d-flex justify-content-between align-items-center mx-4 mb-4">
                    <span class="price-text">€${products[i].price.toFixed(2)}</span>
                    <button class="btn btn-custom px-4 py-2 rounded-5" onclick="addToCart(products[${i}])">Add</a> 
                </div>
            </div>
        </div>`
  }

  output += `</div>`;
  document.getElementById('prod-container').innerHTML = output;

  if (localStorage.getItem("basket") !== null) {

    let basket = JSON.parse(localStorage.getItem("basket"));

    updateBasketIcon(basket.length);
  }

}

function getFirstFiveWords(text) {
  const words = text.split(" ");
  return words.length > 5 ? words.slice(0, 6).join(" ") + "..." : text;
}

function scrollToBottom(){
  const scrollHeight = document.body.scrollHeight;

  window.scrollTo(0, scrollHeight);
}

function populateProductPopUp(index){
  document.getElementById('modal-title').textContent = products[index].title;
  document.getElementById('modal-price').textContent = `€${products[index].price.toFixed(2)}`;
  document.getElementById('modal-desc').textContent = products[index].description;
  document.getElementById('modal-img').src = products[index].image;
}


//Add items to cart, save them in local storage
function addToCart(product) {
  
  //If empty initialize an empty array and store it in local storage
  if (localStorage.getItem("basket") === null) {
    let basket = [];
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  //Get the array from local storage and add the item to the array.
  //Then insert the updated array into local storage.
  let basket = JSON.parse(localStorage.getItem("basket"));
  basket.push(product);
  localStorage.setItem("basket", JSON.stringify(basket));

  updateBasketIcon(basket.length);
}

function updateBasketIcon(number) {
  let basketIcon = document.getElementById("basket-icon");
  
  if (number === 0) {
    basketIcon.classList.add("d-none");
  } else {
    basketIcon.classList.remove("d-none");
    basketIcon.innerHTML = number;
  }
}

//Global Map of items in basket and the amount of times 
// they appear in the array basket from local storage
//key=JSON object as string value=number of key item in local storage
let basketMap = new Map();

//populate basket
function populateBasket() {

  let basketLayout = document.getElementById("basket");
  let content = `<h3 class="mt-5 fw-bold">Your cart</h3>`;

  if (localStorage.getItem("basket")) {

    let basket = JSON.parse(localStorage.getItem("basket"));

    //Clear the map of JSON-strings to update it so that it 
    //reflects the current state of the array in local storage
    basketMap.clear();

    //kind of sort the array to prevent items changing order with themselves on the basket page
    basket = basket.sort((x, y) => x.id - y.id);
  
    //Update map
    basket.forEach(item => {
      let itemAsString = JSON.stringify(item); //Convert intem to string to make it a unique entry in the map
      let count = basketMap.get(itemAsString) || 0; //Tries to get the value of the key item from the map. Otherwise 0
      basketMap.set(itemAsString, count + 1); //Updates the value of the key item, or inserts it if the item doesn't exist
    });
    
    basketMap.forEach((value, key) => {
      let item = JSON.parse(key);
      content += `
      <div class="row">
      <div class="col-sm-7 my-3">
        <div class="card h-100 p-3 border-0 rounded-5 shadow-sm">
          <div class="card-header bg-white border-0 m-0 p-0">
            <button
              type="button"
              class="btn float-end "
              id="remove-item"
              aria-label="Close"
              onclick="removeFromBasket(${item.id}); populateBasket();"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg>
            </button>
          </div>
          <div class="row g-0 align-items-center">
            <div class="col-md-4">
              <img
                id="product-img"
                src="${item.image}"
                class="img-fluid rounded-4"
                alt="Product Image"
                style="max-height: 7rem;"
              />
            </div>

            <div class="col-md-8 d-flex flex-column justify-content-center">
              <div class="card-body d-flex flex-column justify-content-center h-100">
                <h5 class="text-muted mb-1" id="product-name">
                  ${item.title}
                </h5>

                <h3 class="fw-bold" id="product-price">Price €${item.price.toFixed(2)}</h3>
              </div>
            </div>
          </div>
          <div class="card-footer bg-white border-0 p-0">
            <button class="btn btn-custom text-white rounded-start-0 rounded-end-5 float-end" onclick="addOneItem(${item.id}); populateBasket();">+</button>
            <button class="btn btn-custom text-white rounded-0 float-end">${value}</button>
            <button class="btn btn-custom text-white rounded-start-5 rounded-end-0 float-end" onclick="removeOneItem(${item.id}); populateBasket();">-</button>
          </div>
        </div>
      </div>
      <div class="col-sm-7 col-md-5 col-lg-5 my-3">
        <div class="card h-100 p-3 border-0 rounded-5 shadow-sm">
          <div class="card-header bg-white border-0 mb-0 p-0">
          </div>
          <div class="row g-0 align-items-center h-100">
            <div class="col-sm-12 d-flex flex-column justify-content-center">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="text-muted mb-1" id="product-name">
                  Total price of product
                </h5>
                <h3 class="fw-bold" id="product-price">€${calcPrice(item.price, value).toFixed(2)}</h3>
              </div>
            </div>
          </div>
          <div class="card-footer bg-white border-0 p-0">
          </div>
        </div>
      </div>
      </div>
      `;
    });

    updateBasketIcon(basket.length);
  } else {
    basketMap.clear();
  }

  basketLayout.innerHTML = content;

  orderCost();
}
/*
Function that removes an item in it's entirety from the basket.

Function gets the id of a product as an argument.
Converts that id to a number and checks if there's a current basket-array in local storage.
If there is it gets the stored array, then it does two things in the forEach loop:
If the argument passed to the function matches the current items id, it stores that item-object as a string
in the variable itemToRemove. If the argument passed to the function doesn't match the current items id
it instead adds it to the variable newBasket. itemToRemove is then removed from the Map basketMap,
and the new array newBasket is entered into local storage as the new "basket".
*/

function removeFromBasket(itemID) {

  itemID = Number(itemID);

  if (localStorage.getItem("basket")) {

    let basket = JSON.parse(localStorage.getItem("basket"));

    let itemToRemove = "";
    let newBasket = [];

    basket.forEach(item => {
      if (item.id === itemID) {
        itemToRemove = JSON.stringify(item);
      } else {
        newBasket.push(item);
      }
    })



    localStorage.setItem("basket", JSON.stringify(newBasket));
  }

}

/*
Empties the entire basket in local storage if there is one.
It also clears the Map basketMap since it get's it information from the 
basket array stored in local storage.
*/

function emptyBasket() {

  if (localStorage.getItem("basket")) {

    let basket = JSON.parse(localStorage.getItem("basket"));

    basket.splice(0, basket.length);
    
    basketMap.clear();

    localStorage.setItem("basket", JSON.stringify(basket));

  }

}

function addOneItem(itemID) {

  itemID = Number(itemID);

  if (localStorage.getItem("basket")) {
    let basket = JSON.parse(localStorage.getItem("basket"));
    
    for (item of basket) {
      if (item.id === itemID) {
        let newItem = item;
        basket.push(newItem);
        localStorage.setItem("basket", JSON.stringify(basket));
        break;
      }
    }
  }
}

function removeOneItem(itemID) {

  itemID = Number(itemID);

  let basketItem = "";

  if (localStorage.getItem("basket")) {
    let basket = JSON.parse(localStorage.getItem("basket"));
    
    basketMap.forEach((value, key) => {
      item = JSON.parse(key);

      if (item.id === itemID) {
        basketItem = JSON.stringify(item);
      }
    });

    if (basketMap.get(basketItem) > 1) {
      for (item of basket) {
        if (item.id === itemID) {
          let index = basket.indexOf(item);
          basket.splice(index, 1);
          break;
        }
      }
    } 
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function calcPrice(price, amountOfProduct) {
  return price * amountOfProduct;
}

function orderCost() {
  if (localStorage.getItem("basket")) {

    //Get current basket from local storage
    let basket = JSON.parse(localStorage.getItem("basket"));

    //Get elements to update
    let totalCost = document.getElementById("order-cost");

    //Assign total price of basket in order summary
    sumOfBasket = 0;
    basket.forEach(item => sumOfBasket += item.price);
    totalCost.innerHTML = `Total cost: €${sumOfBasket.toFixed(2)}`;

  }
}

function orderSummary() {

  //Get elements to update
  let summary = document.getElementById("order-summary");
  
  //Set elements innerHTML to blank
  summary.innerHTML = "";

  //Assign innerHTML per item in basketMap
  basketMap.forEach((value, key) => {
    let item = JSON.parse(key);
    let val = Number(value);
    summary.innerHTML += `
                <tr>
                  <td class="font-weight-normal" scope="col">
                    ${getFirstFiveWords(item.title)}
                  </td>
                  <td scope="col">x ${val}</td>
                  <td scope="col">${calcPrice(item.price, val).toFixed(2)}</td>
                </tr>
                `
  });
}

/*
<img
                      src="${item.image}"
                      class="img-fluid"
                      alt="Product Image"
                    />
 */