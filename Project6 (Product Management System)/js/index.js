let products=[];
let cart=[];

if(localStorage.getItem('products')===null || localStorage.getItem('products')==="[]"){
    
    localStorage.setItem('products',JSON.stringify(products));
}else{
    products = JSON.parse(localStorage.getItem('products'));
    
}


if(localStorage.getItem('cart')===null || localStorage.getItem('products')==="[]"){
    
    localStorage.setItem('cart',JSON.stringify(cart));
}else{
    cart = JSON.parse(localStorage.getItem('cart'));
    
}

let allFilteredProduct = products;



let productRatingId;
function viewProduct(id){
    productRatingId=id;
    document.getElementById('modal').style.display='flex';
    let product = products.find((product)=>{
        return product.id===id;
    });
    // console.log(product);
    document.getElementById('singlepro-image').src=product.image;
    document.getElementById('singlepro-name').innerText=product.name;
    document.getElementById('singlepro-price').innerText="₹ "+ product.price;
    document.getElementById('singlepro-category').innerText=product.category;
    document.getElementById('noof-rating').innerText=`( ${product.noofrating} ) ratings`;
    if(product.noofrating>0){
        let star = document.getElementById('gold-star-rate');
        let rating = product.rating/product.noofrating
        star.style.width=(rating*20)+"%";
    }else{
        let star = document.getElementById('gold-star-rate');
        star.style.width=(0*20)+"%";
    }

    let sideimage = product.sideImage.split(",");
    console.log(sideimage);
    let sideImageString="";
    sideimage.forEach((image,index) => {
        sideImageString+=
          `
              <div class="side_image_container">
                 <img onclick="changeImage('${image}')" src="${image}"/>
              </div>
          `
    })
    document.getElementById('side_image').innerHTML=sideImageString;

}


function changeImage(url){
    document.getElementById('singlepro-image').src=url;
}

function closeModal(event){

    if(event.target.className==="modal"){
        document.getElementById('modal').style.display='none';
    }
    
}


function clearStar(){
    let stars = document.getElementsByClassName('user-rate');

    for(let i=0;i<5;i++){
        stars[i].style.color='grey';
    }
}



function userRating(rating){
    
    clearStar();
    let stars = document.getElementsByClassName('user-rate');

    for(let i=0;i<rating;i++){
        stars[i].style.color='gold';
    }
}

function setRating(rating){
   let product = products.find((product)=>{
       return product.id===productRatingId;
   });
   
   product.rating+=rating;
   product.noofrating+=1;
   localStorage.setItem('products',JSON.stringify(products));
   if(product.noofrating>0){
    let star = document.getElementById('gold-star-rate');
    let rating = product.rating/product.noofrating
    star.style.width=(rating*20)+"%";
   }else{
    let star = document.getElementById('gold-star-rate');
    star.style.width=(0*20)+"%";
   }
   displayProducts(allFilteredProduct);
   document.getElementById('noof-rating').innerText=`( ${product.noofrating} ) ratings`;
   
   clearStar();

}


function openFilterPanel(status){
    let panel = document.getElementById('top_panel');
    status==true?panel.style.marginTop="0px":panel.style.marginTop="-120px"
    
}


let filters={
    nameFilter:{
        status:false,
        value:""
    },
    minRatingFilter:{
        status:false,
        value:""
    },
    maxRatingFilter:{
        status:false,
        value:""
    },
    minPriceFilter:{
        status:false,
        value:""
    },
    maxPriceFilter:{
        status:false,
        value:""
    }
}



function clearFilter(){
    let filters={
        nameFilter:{
            status:false,
            value:""
        },
        minRatingFilter:{
            status:false,
            value:""
        },
        maxRatingFilter:{
            status:false,
            value:""
        },
        minPriceFilter:{
            status:false,
            value:""
        },
        maxPriceFilter:{
            status:false,
            value:""
        }
    }

    displayProducts(products);
    document.getElementById('top_panel').reset();
}


function search(data,property,value){
    let filteredProduct = data.filter(function(product,index){
        return product[property].toLowerCase().includes(value.toLowerCase());
    })

    return filteredProduct;
}


function searchMinMax(data,property,minValue,maxValue){
    let filteredProduct = data.filter(function(product,index){
        if(property==="rating"){
            let rating = product[property]/product.noofrating;
            return Number(rating)>=Number(minValue)&&Number(rating)<=Number(maxValue);
        }
        return Number(product[property])>=Number(minValue)&&Number(product[property])<=Number(maxValue);
    })

    return filteredProduct;
}


function addToCart(id){
    let checkForProduct = cart.find((product)=>product.id===id);
    if(checkForProduct===undefined){
        let productToAdd = allFilteredProduct.find((product)=>product.id===id);
        productToAdd.quantity=1;
        cart.push(productToAdd);
        showToast("Added successfully","success");
        localStorage.setItem("cart",JSON.stringify(cart));
    }else{
        showToast("Already added to cart","error");
    }
}


function showToast(msg,type){
    let toast = document.getElementById("toast");
    toast.innerHTML=`<p>${msg}</p><button id="toast_btn" onclick="hideToast()">&#10006;</button>`;
    toast.style.display="flex";

    if(type=="success"){
        toast.style.backgroundColor="rgb(188, 247, 188)";
        toast.style.color="rgb(23, 73, 23)";
        document.getElementById('toast_btn').style.color="rgb(23, 73, 23)";
    }

    if(type=="error"){
        toast.style.backgroundColor="rgb(255, 132, 101)";
        toast.style.color="rgb(97, 50, 38)";
        document.getElementById('toast_btn').style.color="rgb(97, 50, 38)"
    }

    setTimeout(function(){
        toast.style.display="none";
    },8000)
}

function hideToast(){
    document.getElementById('toast').style.display="none";
}

function filter(filterProperty,value){
    allFilteredProduct = products;

    if(value!==""){
       filters[filterProperty].status = true;
       filters[filterProperty].value=value;
    }else{
        filters[filterProperty].status=false;
        filters[filterProperty].value="";
    }
     
    if(filters.nameFilter.status===true){
        allFilteredProduct = search(allFilteredProduct,"name",filters.nameFilter.value);
    }

    if(filters.minRatingFilter.status===true){
        allFilteredProduct = searchMinMax(allFilteredProduct,"rating",filters.minRatingFilter.value,5);
    }
   
    if(filters.maxRatingFilter.status===true){
        allFilteredProduct = searchMinMax(allFilteredProduct,"rating",0,filters.maxRatingFilter.value);
    }

    if(filters.minPriceFilter.status===true){

        let prices = products.map((product)=>{
            return product.price;
        })
        allFilteredProduct = searchMinMax(allFilteredProduct,"price",filters.minPriceFilter.value,Math.max(...prices))
    }

    if(filters.maxPriceFilter.status===true){
        allFilteredProduct = searchMinMax(allFilteredProduct,"price",1,filters.maxPriceFilter.value)
    }
    displayProducts(allFilteredProduct)

}


function displayProducts(productArray){
    let productString = "";

    productArray.forEach(function(product,index){
        const {id,name,color,price,category,rating,image,noofrating}= product;
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
                  <div class="product_btn">
                      <button onclick="addToCart('${id}')">ADD TO CART</button>
                  </div>
              </div>

          </div>
              `
    })

    document.getElementById("container").innerHTML = productString;
}

displayProducts(allFilteredProduct);