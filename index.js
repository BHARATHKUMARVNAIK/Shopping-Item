
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" 
import { getDatabase, ref , push ,onValue ,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL : "https://playground-scrimba-f9c26-default-rtdb.asia-southeast1.firebasedatabase.app/Market-Iteams"

}


const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "Market-Iteams")


// accessing elements
let shoppinglistIteam = document.getElementById("list-iteams");
let inputFieldtEl = document.getElementById("input-el");

// accessing buttons 
const addButtonEl = document.getElementById("button-el");





addButtonEl.addEventListener("click",function(){
    let inputValue = inputFieldtEl.value

    push(shoppingListInDB,inputValue)
    
    clearInputField();

})



onValue(shoppingListInDB,function(snapshot){

    if(snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl();

        for(let i = 0 ; i < itemsArray.length;i++){

            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];

            appendIteamToShoppingListEl(currentItem)
        }
    }else{
        shoppinglistIteam.innerHTML = "No, Iteams in the list "
    }
})


function clearInputField(){
    inputFieldtEl.value = " "
}


function clearShoppingListEl(){
    shoppinglistIteam.innerHTML = " "
}


function appendIteamToShoppingListEl(item){
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li")
    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick",function(){

        let exactLocationOfItemInDB = ref(database, `Market-Iteams/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppinglistIteam.append(newEl);
}













