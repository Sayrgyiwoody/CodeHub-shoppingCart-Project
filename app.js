let productDiv = document.getElementById("productDiv");
let showDiv = document.querySelector(".show");
let productOrder = document.querySelector(".productOrder");
//If nothing in UI show


//Product List UI all
function renderProduct() {
    products.forEach((product) => {
        productDiv.innerHTML += `
        <div class="col-12 col-lg-6 mb-4">
            <div class="card card-ctr">
            <div class="card-body">
            <img src=${product.src} class="w-100" />
            <hr />
            <p class="fs-5 fw-bold">${product.name}</p>
            <p>
              Price - <span class="text-primary fs-5 fw-bold">$${product.price}</span>
            </p>
            <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addToCart(${product.id})">
              Add to cart
            </div>
          </div>
        </div>
      </div>`
    })
};

renderProduct();

//create new array to add items
carts = JSON.parse(localStorage.getItem("CartList")) || [];

//Click to add to cart Array
function addToCart(id) {
    if (carts.some((cart)=>cart.id===id)){
        changeQuantity("plus",id);
    }else {
        let cart = products.find((product)=>product.id===id);
    carts.push({
      ...cart,
      quantity:1
    });
    UpdateCart();
    }
}




//Render and show each item
function renderProductCart() {
  showDiv.innerHTML = "";
  productOrder.innerHTML = "";
  carts.forEach((cart)=> {
    productOrder.innerHTML += `
                    <tr>
                      <td>
                        <img src=${cart.src} id="img-cart" title="${cart.name}" />
                      </td>
                      <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
                      <td>
                        <i
                          class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQuantity('minus',${cart.id})"
                        ></i
                        ><span class="mx-2 fs-5 pt-3">${cart.quantity}</span
                        ><i
                          class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQuantity('plus',${cart.id})"
                        ></i>
                      </td>
                      <td>
                        <i
                          class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="deleteCart(${cart.id})"
                          title="Remove"
                        ></i>
                      </td>
                    </tr>`;
  })
  showHide();
};


//Update quantity increase/decrease

function changeQuantity(condition,id) {
  carts = carts.map((cart)=> {
    let quantity = cart.quantity;
    if (cart.id === id) {
      if(condition == "plus") {
        quantity++;
        
      }else if (condition == "minus" && quantity > 1) {
        quantity--;
      }
    }
    return {
      ...cart,
      quantity :quantity,
    };  
  });  
  UpdateCart();
};

//To show total quantity and price
function renderNumber() {
  let totalPrice = 0, 
    totalQuantity = 0;
    carts.forEach(cart => {
      totalPrice += cart.quantity * cart.price ;
      totalQuantity += cart.quantity;
    })
    document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`;
    document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
}

//Delete cart from order
function deleteCart(id) {
  carts = carts.filter(cart=>cart.id!==id);
  UpdateCart();
}

//Show Hide Text
function showHide() {
  if (!productOrder.innerHTML) {
    showDiv.innerHTML = `<h5 class="my-3 text-center text-primary">No item in Cart <i class="fa-solid fa-circle-xmark"></i></h5>
    <hr>`;
  }
}


//Update everyTime user make changes

function UpdateCart() {
  renderProductCart();
  renderNumber();
  localStorage.setItem("CartList",JSON.stringify(carts));
};

UpdateCart();