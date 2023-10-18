//HELPER FNS AND HOUSEKEEPING
function toUberdiv(myhtml){
    document.getElementById("uberdiv").innerHTML = myhtml;
}

function shuffle(arr){
    return(arr.sort(()=>Math.random() - 0.5))
}

function shuffleslice(arr, n_items){
    return(arr.sort(() => Math.random() - 0.5).slice(0,n_items))
}


//GLOBAL STATE VARS

//Word list resources live in resources/word_lists.js, made available for this script by index.html
//Available but not defined here: eng_concrete_nouns (an array of strings)

let live_item = 0;
let itemlist = [1,2]; //startfresh gives a new list 1 longer
let responselist = [];
let correct_count = 0;

//USER ACTIONS
function mempalace_startfresh(){
    live_item = 0;
    //resources getter functions check targ_language
    if(text_type=="words"){ 
	itemlist = get_wordlist(itemlist.length + 1)
    } else if(text_type=="texts"){
	//get_monologue checks targ_languauge
	itemlist = get_monologue(itemlist.length + 1)
    }
    
    responselist = [];
    correct_count = 0;
    viewItem();
}

function checkHandler(accept){
    if(accept){correct_count = correct_count + 1}
    live_item = live_item + 1;
    if(live_item < itemlist.length){
	checkResponses();
    } else{
	outro();
    }
}

function kbd_getResponse(e){
    if(event.key==='Enter'){
	responselist.push(e.value)
	nextTestHandler()
    }
}

function nextTestHandler(){
    live_item = live_item + 1;
    if(live_item < itemlist.length){
	testItem();
    } else {
	live_item = 0;
	checkResponses();
    }
}

function nextViewHandler(){
    live_item = live_item + 1;
    if(live_item < itemlist.length){
	viewItem();
    } else {
	//setup test
	live_item = 0;
	testItem();
    }
}

//DRAW TO THE SCREEN FUNCTIONS
function viewItem(){
    console.log("tl check")
    console.log(targ_lang)
    console.log(text_type)
    console.log("endcheck")
    
    headerprompt = "<h1>Place this in your next location:</h1>";
    itemview = "<p>"+itemlist[live_item]+"</p>";
    responsezone = "<p><button onClick=nextViewHandler()>NEXT</button></p>"
   
    toUberdiv(headerprompt+itemview+responsezone)

}

function testItem(){
    headerprompt = "<h1>You are in location "+(live_item+1)+" of "+(itemlist.length)+"</h1>";
    itemview = "<p>Recall your prompt: <input type='text' id='responsetext'/ onkeydown=kbd_getResponse(this)></p>";
    
    toUberdiv(headerprompt+itemview)

    document.getElementById('responsetext').focus();
}

function checkResponses(){
    headerprompt= "<h1>Check your answers:</h1>"
    itemcheck = "<p>Original was "+(itemlist[live_item])+" you said "+(responselist[live_item])+"</p>"
    acceptreject = "<p><button onclick=checkHandler(true)>Accept match</button><button onclick=checkHandler(false)>Reject: mistake</button></p>";
    toUberdiv(headerprompt+itemcheck+acceptreject)
}

function outro(){
    feedback = "<h1>You accepted "+correct_count+" of "+(itemlist.length)+" ("+(Math.round(correct_count/itemlist.length*100))+"%)";
    options = "<p><button onclick=mempalace_startfresh()>Success! Make it harder</button></p>"+
	"<p><button onClick=location.reload()>Main menu</button></p>";
    toUberdiv(feedback+options)
}

//MAIN
//viewItem()
