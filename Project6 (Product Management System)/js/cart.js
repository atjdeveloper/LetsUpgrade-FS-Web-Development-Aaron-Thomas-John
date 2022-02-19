let cart=[];


if(localStorage.getItem('cart')===null || localStorage.getItem('products')==="[]"){
    
    localStorage.setItem('cart',JSON.stringify(cart));
}else{
    cart = JSON.parse(localStorage.getItem('cart'));
    
}


function removeProduct(id) {
    let index = cart.findIndex((product)=>{
        return product.id===id;
    })
    cart.splice(index,1);
    displayProducts(cart);
    localStorage.setItem('cart',JSON.stringify(cart));

}

function changeQuantity(status,id){
    let product = cart.find((product)=>product.id===id);
    if(status=="increase"){
        product.quantity=Number(product.quantity)+1;
        displayProducts(cart);
        localStorage.setItem('cart',JSON.stringify(cart));
    }else{

        if(product.quantity==1){
            let confirmRemoval = confirm("Do yo want to remove it?");
            if(confirmRemoval==true){
               removeProduct(id);
            }
          
        }else{
            product.quantity=Number(product.quantity)-1;
            displayProducts(cart);
            localStorage.setItem('cart',JSON.stringify(cart));
        }
        
    }
    
}


function displayProducts(productArray){
    let productString = "";

    productArray.forEach(function(product,index){
        const {id,name,color,price,category,rating,image,noofrating,quantity}= product;
        productString += 
              `
              <div class="product_container" >
              <div class="image" >
                  <img src="${image}" onclick="viewProduct('${id}')"/>
              </div>
              <div class="details" >
                  <h3 onclick="viewProduct('${id}')">${name}</h3>
                  <h3 style="color:rgb(243, 76, 76)">$ ${price}</h3>
                  <div class="rating">
                    <div class="gray_star"> 
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </div>  
                    <div class="golden_star" style="width:${noofrating>0?(rating/noofrating)*20:0*20}%"> 
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div class="quantity">
                  <button type="button" onclick="changeQuantity('decrease','${id}')">-</button>
                  <span>${quantity}</span>
                  <button type="button" onclick="changeQuantity('increase','${id}')">+</button>
                  </div>
                  <div class="product_btn">
                      <button onclick="removeProduct('${id}')">REMOVE FROM CART</button>
                  </div>
              </div>

          </div>
              `
    })

    document.getElementById("container").innerHTML = productString;
}

displayProducts(cart)