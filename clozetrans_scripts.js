//todo: fetch these from some library!
//Are you ok with punctuation glomming onto the words? Probably not.
let reference_story = []
let target_story = []
let cloze_sentence_pointer = 0
let cloze_word_pointer = 0;
let leftovers = "";
let prob_mask = .5; //Set in menu. Actually prob of clear text, ie 1-pmask, whups.

let masked_target = [];

function cloze_onchangeHandler(){
    console.log("onchange saw |" +
		document.getElementById('cloze_input').value+
		"| looking for |"+
		target_story[cloze_sentence_pointer][cloze_word_pointer]+"|"+
		(target_story[cloze_sentence_pointer][cloze_word_pointer]==
		 document.getElementById('cloze_input').value)
	       )//ok
    my_input = document.getElementById('cloze_input').value.trim()
    
    if(my_input.startsWith(target_story[cloze_sentence_pointer][cloze_word_pointer])){
	console.log("got a match");
	leftovers = my_input.replace(target_story[cloze_sentence_pointer][cloze_word_pointer],"")
	document.getElementById('cloze_input').value=="";
	cloze_word_pointer = cloze_word_pointer +1;
	if(cloze_word_pointer >= target_story[cloze_sentence_pointer].length){
	    cloze_sentence_pointer = cloze_sentence_pointer +1;
	    cloze_word_pointer = 0;
	}
	init_cloze()
    }
}

function init_cloze(){

    targ_sep = targ_lang == "eng" ? " " : "";
    ref_sep = targ_lang == "eng" ? "" : " ";
    
    prev_target = "&nbsp";
    prev_reference = "&nbsp";
    current_target = "";
    current_reference = "";
    future_target = "&nbsp";
    future_reference = "&nbsp";
    
    if(cloze_sentence_pointer > 0){
	prev_target = target_story[cloze_sentence_pointer-1].join(targ_sep)
	prev_reference = reference_story[cloze_sentence_pointer-1].join(ref_sep)
    }

    done_words = "<span class='cloze_done_span'>";
    for(i=0;i<cloze_word_pointer;i++){
	done_words = done_words + target_story[cloze_sentence_pointer][i]+targ_sep;
    }
    todo_words = "</span>"
    for(i=cloze_word_pointer;i<target_story[cloze_sentence_pointer].length;i++){
	todo_words = todo_words + masked_target[cloze_sentence_pointer][i]+targ_sep;
    }
    
    current_target = done_words+todo_words+
	"<br/>"+
     "<input type='text' id='cloze_input' autofocus>"
    current_reference = reference_story[cloze_sentence_pointer].join(ref_sep)

    
    if(cloze_sentence_pointer + 1 < target_story.length){
	future_target = masked_target[cloze_sentence_pointer + 1].join(targ_sep)
	future_reference = reference_story[cloze_sentence_pointer + 1].join(ref_sep)
    }
    
    cloze =
	"<table class='cloze_table'>"+
	"<tr class='cloze_row'>"+
	"<td class='cloze_cell'>"+
	prev_target+
	"</td>"+
	"<td class='cloze_cell'>"+
	prev_reference+
	"</td>"+
	"</tr>"+
	"<tr>"+
	"<td class='cloze_cell'>"+
	current_target+
	"</td>"+
	"<td class='cloze_cell'>"+
	current_reference+
	"</td>"+
	"</tr>"+
	"<tr>"+
	"<td class='cloze_cell'>"+
	future_target+
	"</td>"+
	"<td class='cloze_cell'>"+
	future_reference+
	"</td>"+
	"</tr>"+
     "</table>"
    toUberdiv(cloze)
    
    document.getElementById("cloze_input").addEventListener('input', cloze_onchangeHandler);
    document.getElementById("cloze_input").value = leftovers;
    if(leftovers.length > 0)cloze_onchangeHandler(); //pretent leftovers were typed in, catch cont. matches
    document.getElementById("cloze_input").focus()
}

function cloze_submit_settings_start(){
    //assumes targ_lang is eng or zh.
 
    targ_lang = document.querySelector('input[name="targ_language"]:checked').value;
    if(targ_lang == "rnd") {
	targ_lang = shuffle(["zh","eng"])[0]
    }
    console.log(document.getElementById('cloze_theme').value)
    prob_mask = parseFloat(document.getElementById('blank_prob_slider').value)/100;

    my_text = get_bilang_text_obj(document.getElementById('cloze_theme').value)

    target_story = targ_lang == "eng" ? my_text.eng : my_text.zh;
    reference_story = targ_lang =="eng" ? my_text.zh : my_text.eng;

    for(i=0; i<target_story.length;i++){
    masked_target.push([])
    for(j=0;j<target_story[i].length;j++){
	masked_target[i].push(
	    Math.random() > prob_mask ? target_story[i][j] : "□□□"
	)
    }
}

   
    init_cloze();//turn into a button when home is a menu.
}

function clozetrans_home(){
    which_keylistener = "cloze"
    toUberdiv(
    random_eyecandy()+
    "      <p><button onClick=cloze_submit_settings_start()>Start cloze translation</button></p>"+
	"    <div class='settings_div'>"+
	"    <h2>Settings</h2>"+
	"      <h3>Cloze Language</h3>"+
	"      <input type='radio' id='eng' name='targ_language' value='eng'>"+
	"      <label for='eng'>English</label><br>"+
	"      <input type='radio' id='zh' name='targ_language' value='zh'>"+
	"      <label for='zh'>Chinese</label><br>"+
	"      <input type='radio' id='rnd' name='targ_language' value='rnd' checked>"+
	    "      <label for='rnd'>Surprise me</label><br>"+
	    "<h3>How many blanks</h3>"+
	    "0 to 100%"+
	    "<input type='range' min='0' max='100' value='30' class='slider' id='blank_prob_slider'>"+
	    "      <h3>Text theme</h3>"+
	"<select id='cloze_theme'>"+
	"<option value='rnd'>Surprise me</option>"+
	"<option value='goats'>Goats</option>"+
	"<option value='medical'>Medical</option>"+
	    "</select><br/>"+
	"<p><button onclick='location.reload()'>Back to Main menu</button></p>"+
	"    </div>"
    )
    

}
