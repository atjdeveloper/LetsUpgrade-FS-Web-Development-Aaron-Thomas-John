


let products=[];


if(localStorage.getItem('products')===null || localStorage.getItem('products')==="[]"){
    let info = document.getElementById('info');
    info.style.display='flex';
    localStorage.setItem('products',JSON.stringify(products));
}else{
    products = JSON.parse(localStorage.getItem('products'));
    let info = document.getElementById('info');
    info.style.display='none';
}


function toggleAddModal(event,open){

    if(event.target.className==='add_modal' || event.target.className.includes('add_modal_close')){
        open=false;
    }else{
        open=true;
    }

    let modal = document.getElementById("add_modal");
    open===true?modal.style.display='flex':modal.style.display='none';
}

let updateId;
let productId;

function toggleUpdateModal(event,open,id){

    if(event.target.className==='update_modal' || event.target.className.includes('update_modal_close')){
        open=false;
    }else{
        open=true;
    }

    let modal = document.getElementById("update_modal");
    open===true?modal.style.display='flex':modal.style.display='none';


    if(id!==null){
        updateId = id;
        productId = products.find((product)=>product.id===id);
        document.getElementById('update_name').value=productId.name;
        document.getElementById('update_image').value=productId.image;
        document.getElementById('update_color').value=productId.color;
        document.getElementById('update_category').value=productId.category;
        document.getElementById('update_price').value=productId.price;
        document.getElementById('update_sideImage').value=productId.sideImage;
    
    }
}




function updateProduct(){

    productId.name= document.getElementById('update_name').value;
    productId.image = document.getElementById('update_image').value;
    productId.color = document.getElementById('update_color').value;
    productId.category = document.getElementById('update_category').value;
    productId.price = document.getElementById('update_price').value;
    productId.sideImage = document.getElementById('update_sideImage').value;

    localStorage.setItem('products',JSON.stringify(products));
    displayProducts(products);
}


function addProduct(){
    let product= {rating:0,noofrating:0}

    if(localStorage.getItem('productId')==null){
        localStorage.setItem('productId',"1");
        product.id="p1";
    }else{
        let lastId = Number(localStorage.getItem('productId'));
        let newId = lastId + 1;
        localStorage.setItem('productId',newId.toString())
        product.id="p"+(++lastId);
    }


    product.name= document.getElementById('add_name').value;
    product.image = document.getElementById('add_image').value;
    product.color = document.getElementById('add_color').value;
    product.category = document.getElementById('add_category').value;
    product.price = document.getElementById('add_price').value;
    product.sideImage = document.getElementById('add_sideImage').value;

    products.push(product);
    localStorage.setItem('products',JSON.stringify(products));
    document.getElementById('add_form').reset();
    displayProducts(products);
}

function deleteProduct(id) {
    let index = products.findIndex((product)=>{
        return product.id===id;
    })
    products.splice(index,1);
    displayProducts(products);
    localStorage.setItem('products',JSON.stringify(products));

}



function displayProducts(productArray){
    let productString = "";

    productArray.forEach(function(product,index){
        const {id,name,color,price,category,rating,image}= product;
        productString += 
              `
               <tr>
               <td>${index+1}</td>
               <td>${id}</td>
               <td>${name}</td>
               <td><img src=${image} /></td>
               <td>${rating}</td>
               <td>${category}</td>
               <td>${price}</td>
               <td>
                 <button class="btn" onclick="toggleUpdateModal(event,true,'${id}')">Update</button>
                 <button class="btn" id="delete" onclick="deleteProduct('${id}')">Delete</button>
               </td>

               </tr>
              `
    })

    document.getElementById("tbody").innerHTML = productString;
}

displayProducts(products);


