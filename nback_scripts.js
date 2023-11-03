//let targ_lang = "blank lang" //Basically all exercises care about these, so they're declared in index.html. Probably an antipattern
//let text_type = "blank text type"
let wins_to_increase = 5; //need consecutive wins to increase the current n
let fails_to_decrease = 3; //'lives': cumulative, reset to zero on decrease
let current_wins = 0;
let current_fails = 0;
let current_n = 1;

let nback_itemlist = [];

function nback_respond(response){

    newest = nback_itemlist[nback_itemlist.length-1] //newest
    oldest = nback_itemlist[0]
    response_status = ( (newest == oldest) ? response=="same" : response=="different" )
    
    if(response_status == true){
	current_wins = current_wins + 1;
	//flash_border("green")
	document.getElementById("nback_outer").style="border:4px solid green"
    } else{
	//flash_border("red")
	current_fails = current_fails + 1;
	document.getElementById("nback_outer").style="border:4px dashed red"
    }

    //trigger list length adjustments if you're gonna:
    if(current_wins >= current_n + wins_to_increase){
	nback_itemlist = [];
	current_n = current_n+1;
	current_wins = 0;
	current_fails = 0;
	document.body.style.backgroundColor = "green";
	//flash_background("green")
    }
    if(current_fails == fails_to_decrease){
	nback_itemlist = [];
	current_n = Math.max(current_n - 1, 1)
	current_wins = 0;
	current_fails = 0;
	document.body.style.backgroundColor = "red";
	//flash_background("black")
    }
    
    
    nback_itemlist.shift() //removes [0]
    //timeout is to leave feedback onscreen, vanishes on re-drawing.
    setTimeout(nback_drawnext, 450) //drawnext appends a new item
}

function nback_pushitem(){
    if(Math.random() < 0.5 || (nback_itemlist.length < current_n+1)){//current_n is the GAP, n+2 is the list length
	if(targ_lang == "eng"){
	    nback_itemlist.push(shuffle(common_eng)[0])
	}else if(targ_lang == "zh"){
	    nback_itemlist.push(shuffle(common_zh)[0])
	}else if(targ_lang == "mix"){
	    Math.random() < 0.5 ? nback_itemlist.push(shuffle(common_eng)[0]) : nback_itemlist.push(shuffle(common_zh)[0]);
	}
    } else {//end if pushing novel
	nback_itemlist.push(nback_itemlist[0])//push a match. List is recent-last, oldest first, match matches oldest
    }
}

function start_nback(){
    
    if(isNaN(parseInt(document.getElementById("nback_to_increase").value)) ||
       isNaN(parseInt(document.getElementById("nback_to_decrease").value))){
	alert("to-increase and to decrease need to be integers")
	return;
    }
	     
    targ_lang = document.querySelector('input[name="targ_language"]:checked').value;
    text_type = document.querySelector('input[name="text_type"]:checked').value;
    wins_to_increase = parseInt(document.getElementById("nback_to_increase").value);//TODO user input: need to handle garbage!
    fails_to_decrease = parseInt(document.getElementById("nback_to_decrease").value);

    if(targ_lang == "rnd"){
	targ_lang = shuffle(["zh","eng","mix"])[0];
    }
    if(text_type == "rnd"){
	text_type = shuffle(["words","sentences"])[0];
    }

    nback_drawnext();
}

function nback_drawnext(){
    document.body.style.backgroundColor = "grey";//undoes feedback-flash
    
    nback_pushitem(); //adds to the end: last is most recent.

    my_table = "<div id='nback_outer' class='nback_outer_div'><p class='nback_tomatch_p'>"+ //
    nback_itemlist[nback_itemlist.length-1]+//most recent item is visible
    "</p>"

    my_table = my_table+"<p class='nback_inner_p'>"
    for(i=1;i<nback_itemlist.length;i++){
	my_table = my_table + "?"
    }
    my_table = my_table+"</p>"
    if(nback_itemlist.length==current_n+2){
	my_table = my_table + "<p class= 'nback_tomatch_p'>?</p>"
    }
//    for(i=1;i<nback_itemlist.length;i++){
//	my_table = my_table + "<p class="+(i<current_n+1 ? 'nback_inner_p' : 'nback_tomatch_p')+">?</p>"
//    }
    
    //current_n refs n blanked items, +2 is to add current_target and candidate
    nback_itemlist.length < current_n + 2 ? my_table = my_table + "<p class='nback_inner_p'><button onclick='nback_drawnext()'>LOAD</button></p>" : my_table = my_table + "<p class='nback_response_p'><button onclick=nback_respond('same')>Same</button>&nbsp<button onclick=nback_respond('different')>Different</button></p>"
    
    my_table = my_table + "</div>"+
	"<div> <div style='text-align:left; width:45%; margin:auto; display:inline-block;'>Hits: "+(current_wins)+" / "+(current_n + wins_to_increase)+"</div><div style='text-align:right; display:inline-block; width:45%;margin:auto;'>"+current_fails+" /"+fails_to_decrease+" :Misses</div>"+
	"<h3>Level "+(current_n)+"</h3>"
    
    //current_target = nback_itemlist.shift() //removes and returns first element: do this on response only if the list is long enough
    toUberdiv(my_table+"</br><p><button onclick=location.reload()>Main menu</button></p>")
}

function nback_home(){
    which_keylistener = "nback"
    
    toUberdiv(
	"<button onclick='start_nback()'> Start n-back</button>"+
	    "    <div>"+
	    "    <h2>Settings</h2>"+
	    "<p>Increase list length at level + <input type='text' id='nback_to_increase' value='5'> wins</p>"+
	    "<p>Decrease list length every <input type='text' id='nback_to_decrease' value='3'> failures</p>"+
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
	    "      <p><button onclick=location.reload()>Main menu</button><p>"+
	    "    </div>"
    )}
