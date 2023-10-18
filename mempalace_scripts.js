//HELPER FNS AND HOUSEKEEPING
function toUberdiv(myhtml){
    document.getElementById("uberdiv").innerHTML = myhtml;
}

function shuffleslice(arr, n_items){
    return(arr.sort(() => Math.random() - 0.5).slice(0,n_items))
}


//GLOBAL STATE VARS

//Word list resources live in resources/word_lists.js, made available for this script by index.html
//Available but not defined here: eng_concrete_nouns (an array of strings)

let live_item = 0;
let list_length = 3;
let itemlist = shuffleslice(eng_concrete_nouns,list_length);

//USER ACTIONS
function nextHandler(){
    live_item = live_item + 1;
    viewItem();
}

function tryagainHandler(){
    list_length = list_length+1
    console.log("tryagain")
    console.log(list_length)
}

//DRAW TO THE SCREEN FUNCTIONS
function viewItem(){

    headerprompt = "<h1>Place this in your next location:</h1>";
    itemview = "<p>"+itemlist[live_item]+"</p>";
    responsezone = "<p><button onClick=nextHandler()>NEXT</button></p>"
   
    toUberdiv(headerprompt+itemview+responsezone)

}

function testItem(){
}

function outro(){
    toUberdiv("<button onClick=tryagainHandler()>TAG</button>")
}

//MAIN
//viewItem()
