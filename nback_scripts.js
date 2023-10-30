//let targ_lang = "blank lang" //Basically all exercises care about these, so they're declared in index.html. Probably an antipattern
//let text_type = "blank text type"
let wins_to_increase = 5; //need consecutive wins to increase the current n
let fails_to_decrease = 3; //'lives': cumulative, reset to zero on decrease
let current_wins = 0;
let current_fails = 0;
let current_n = 1;

let nback_itemlist = [];

function nback_respond(response){
    target_was = nback_itemlist.shift() //removes and returns element 0

    console.log(response)
    console.log("target was"+ target_was)
    console.log(nback_itemlist)
    response_status = nback_itemlist[0] == nback_itemlist[nback_itemlist.length] ? response=="same" : response=="different"
    console.log(response_status)
    console.log("***")
    nback_drawnext()
}

function nback_pushitem(){
    if(Math.random() < 0.5 || nback_itemlist.length == 0){
    if(targ_lang == "eng"){
	nback_itemlist.push(shuffle(common_eng)[0])
    }else if(targ_lang == "zh"){
	nback_itemlist.push(shuffle(common_zh)[0])
    }else if(targ_lang == "mix"){
	Math.random() < 0.5 ? nback_itemlist.push(shuffle(common_eng)[0]) : nback_itemlist.push(shuffle(common_zh)[0]);
    }
    } else {//end if pushing novel (.5 chance or if list empty)
	nback_itemlist.push(nback_itemlist[nback_itemlist.length-1])//push a match item
	//p(match) is .5 + chance-of-accidental-redraw, no-one cares.
    }
}

function start_nback(){
    targ_lang = document.querySelector('input[name="targ_language"]:checked').value;
    text_type = document.querySelector('input[name="text_type"]:checked').value;
    wins_to_increase = document.getElementById("nback_to_increase").value;
    fails_to_decrease = document.getElementById("nback_to_decrease").value;

    if(targ_lang == "rnd"){
	targ_lang = shuffle(["zh","eng","mix"])[0];
    }
    if(text_type == "rnd"){
	text_type = shuffle(["words","sentences"])[0];
    }

    nback_drawnext();
    // console.log("Starting nback")
    // console.log(wins_to_increase)
    // console.log(fails_to_decrease)
    // console.log(targ_lang)
    // console.log(text_type)
    // console.log()
}

function nback_drawnext(){
    nback_pushitem(); //adds to the end: last is most recent.

    my_table = "<div class='nback_outer_div'><p class='nback_inner_p'>"+
    nback_itemlist[nback_itemlist.length-1]+//most recent item is visible
    "</p>"
    for(i=1;i<nback_itemlist.length;i++){
	my_table = my_table + "<p class="+(i<current_n+1 ? 'nback_inner_p' : 'nback_final_p')+">?</p>"
    }
    
    //current_n refs n blanked items, +2 is to add current_target and candidate
    nback_itemlist.length < current_n + 2 ? my_table = my_table + "<p class='nback_inner_p'><button onclick='nback_drawnext()'>LOAD</button></p>" : my_table = my_table + "<p class='nback_response_p'><button onclick=nback_respond('same')>Same</button>&nbsp<button onclick=nback_respond('different')>Different</button></p>"
    my_table = my_table + "</div>"
    
    //current_target = nback_itemlist.shift() //removes and returns first element: do this on response only if the list is long enough
    toUberdiv(my_table)
}

function nback_home(){
    toUberdiv(
	"<button onclick='start_nback()'> Start n-back</button>"+
	    "    <div style='border:1px solid black'>"+
	    "    <h2>Settings</h2>"+
	    "<p>Increase n every <input type='text' id='nback_to_increase' value='5'> wins</p>"+
	    "<p>Decrease n every <input type='text' id='nback_to_decrease' value='3'> failures</p>"+
	    "      <h3>Language</h3>"+
	    "      <input type='radio' id='eng' name='targ_language' value='eng'>"+
	    "      <label for='eng'>English</label><br>"+
	    "      <input type='radio' id='zh' name='targ_language' value='zh'>"+
	    "      <label for='zh'>Chinese</label><br>"+
	    "      <input type='radio' id='mix' name='targ_language' value='mix'>"+
	    "      <label for='mix'>Mixture</label><br>"+
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
    )}
