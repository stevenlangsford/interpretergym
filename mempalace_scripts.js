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

function mempalace_home(){
    document.getElementById("uberdiv").innerHTML = ""+
	"<p>I want to:</p>"+
"    <ul>"+
"      <li><button onClick=viewTour()> tour my palace </button></li>      "+
"      <li><button onClick=mempalace_submit_settings_start()>Train my memory</button></li>"+
"    </ul>"+
"    <div style='border:1px solid black'>"+
"    <h2>Settings</h2>"+
"      <h3>Language</h3>"+
"      <input type='radio' id='eng' name='targ_language' value='eng'>"+
"      <label for='eng'>English</label><br>"+
"      <input type='radio' id='zh' name='targ_language' value='zh'>"+
"      <label for='zh'>Chinese</label><br>"+
"      <input type='radio' id='rnd' name='targ_language' value='rnd' checked>"+
"      <label for='rnd'>Surprise me</label><br>"+
"      <h3>Text type</h3>"+
"      <input type='radio' id='tt_words' name='text_type' value='words'>"+
"      <label for='eng'>Words</label><br>"+
"      <input type='radio' id='tt_texts' name='text_type' value='texts'>"+
"      <label for='zh'>Texts</label><br>"+
"      <input type='radio' id='tt_rnd' name='text_type' value='rnd' checked>"+
"      <label for='rnd'>Surprise me</label><br>"+
"    </div>"
}


//GLOBAL STATE VARS

//Word list resources live in resources/word_lists.js, made available for this script by index.html
//Available but not defined here: eng_concrete_nouns (an array of strings)

let live_item = 0;
let itemlist = [1,2]; //startfresh gives a new list 1 longer
let responselist = [];
let correct_count = 0;

//USER ACTIONS
function mempalace_startfresh(new_length){
    live_item = 0;
    //resources getter functions check targ_language
    
    if(targ_lang =="rnd"){
	targ_lang = shuffle(["zh","eng"])[0];
    }
    if(text_type=="rnd"){
	text_type = shuffle(["words","texts"])[0];
    }
    if(text_type=="words"){ 
	itemlist = get_wordlist(new_length)
    } else if(text_type=="texts"){
	//get_monologue checks targ_languauge
	itemlist = get_monologue(new_length)
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
    itemcheck = "<p>Original was <br/><strong> "+(itemlist[live_item])+"</strong> <br/> you said <br/> "+(responselist[live_item])+"</p>"
    acceptreject = "<p><button onclick=checkHandler(true)>Accept match</button><button onclick=checkHandler(false)>Reject: mistake</button></p>";
    toUberdiv(headerprompt+itemcheck+acceptreject)
}

function outro(){
    feedback = "<h1>You accepted "+correct_count+" of "+(itemlist.length)+" ("+(Math.round(correct_count/itemlist.length*100))+"%)";
    options =
	"<p><button onclick=mempalace_startfresh("+(itemlist.length+1)+")>Ok, make it harder by one</button>"+
	"<button onclick=mempalace_startfresh("+(itemlist.length+5)+")>Easy, make it harder by five</button>"+
	"<button onclick=mempalace_startfresh("+(itemlist.length)+")>Go again at this length</button></p>"+
	"<p><button onClick=location.reload()>Main menu</button></p>";
    toUberdiv(feedback+options)
}

//MAIN
//viewItem()
