
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productImage = document.getElementById("productImage");

var productList = [];

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentIndex;

var regex = {
    productName : {
        value : /^[A-Z][a-z0-9]{5,12}$/,
        isValid : false
    },
    productPrice : {
        value : /^(100|[1-9]\d{2,3}|10000)$/,
        isValid : false
    },
    productDesc : {
        value : /.{10}/,
        isValid : false
    },
    productCategory : {
        value : /^(TV|Mobile|Laptops|Screens|Others)$/,
        isValid : false
    }

}





if(localStorage.getItem("productList")!=null){
    productList = JSON.parse(localStorage.getItem("productList"));
    display(productList);
}







function addProduct(){
    
    
    var product = {
        name :productName.value ,
        price : productPrice.value,
        category :productCategory.value,
        decs : productDesc.value,
        image : `images/${productImage.files[0]?.name}`,
        id : productList.length

    }
    
    productList.push(product);
    updateLocalStorage()
    display(productList)
    updateInputValue()
    addBtn.disabled = true 
    

}

function display(List) {
    var cartona =``;
    for(var i=0 ;i<List.length ;i++){
        cartona +=  ` <div class="col-md-4">
         <div class="item text-white border border-info rounded-3 overflow-hidden">
            <img src="${List[i].image}" class="w-100 mb-3" alt="">
            <div class="p-3">
               <input value="${i}" type="hidden" class"d-none"/>
               <h2>Name: ${List[i].newName ? List[i].newName : List[i].name }</h2>
               <p class="fs-4">Desc: ${List[i].decs}</p>
               <h3>Price: ${List[i].price}</h3>
               <h3 class="mb-4">Category: ${List[i].category}</h3>
               <button onclick="getDataToUpdate(${i})" class="btn btn-outline-warning w-100 mb-3">Update</button>
                <button onclick="deleteProduct(${List[i].id})" class="btn btn-outline-danger w-100">Delete</button>
            </div>
            
         </div>
      </div>`
    }
    document.getElementById("myData").innerHTML = cartona
}


function deleteProduct(index){
    for(var i =0 ; i < productList.length ;i++){
        if(productList[i].id === index) {
            productList.splice(i,1);

        }
    }
    updateLocalStorage()
    display(productList);

    
}


function updateInputValue(config){
    productName.value =  config ? config.name : null;
    productPrice.value = config ? config.price : null;
    productCategory.value = config ? config.category : null;
    productDesc.value = config ? config.decs : null;
    


}
function getDataToUpdate(index){
    currentIndex = index;

    updateInputValue(productList[index])

    addBtn.classList.add('d-none');
    updateBtn.classList.remove("d-none");


}
function updateProduct(){
    productList[currentIndex].name = productName.value;
    productList[currentIndex].price = productPrice.value;
    productList[currentIndex].category = productCategory.value;
    productList[currentIndex].decs = productDesc.value;
    display(productList)
    updateBtn.classList.add("d-none")
    addBtn.classList.remove("d-none")
    updateLocalStorage()
    updateInputValue() 


}
function updateLocalStorage(){
    localStorage.setItem("productList",JSON.stringify(productList))

}
function search(searchValue){
   
    
    var searchItem = []
    for(var i = 0 ; i < productList.length ; i++){
        var item = productList[i]
        if(item.name.toLowerCase().includes(searchValue.toLowerCase())){
        item.newName = item.name.toLowerCase().replace(searchValue.toLowerCase(),`<span class='text-danger'>${searchValue}</span>`)
        searchItem.push(item)
        }
    }
    
    display(searchItem)
}
    // updateLocalStorage()
    // display(productList)


function validateProductInput(element){
    
    if(regex[element.id].value.test(element.value) == true ){
        element.nextElementSibling.classList.add('d-none')
        console.log("match");
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        regex[element.id].isValid = true


    }else {
        element.nextElementSibling.classList.remove('d-none')
        console.log("not match");
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
        regex[element.id].isValid = false
  
    }

    toggleAddBtn()
}
function toggleAddBtn(){
    if(regex.productName.isValid && regex.productPrice.isValid && regex.productCategory.isValid && regex.productDesc.isValid){
        addBtn.disabled = false 
    }else {
        addBtn.disabled = true 

    }
}



