const cloze_instructions =[
    "The cloze text is presented in a 3x2 grid.",
    "The top row is the last chunk, the middle row is the one you're working on, and the bottom row is the next upcoming chunk. Each row has two columns. You're working on the left one, which is full of cloze gaps. The right one (in the other language) is complete.",
    "Type the next word into the text box in the middle of the left col. You need to type everything, not just the gaps.",
    "When you complete the target word, it will turn blue, and you move to the next word (or gap)",
    "Some notes: first, the meanings only <strong>mostly sort of</strong> correspond between the two columns. These are not necessarily good translations! But they can help you fill in the gaps.",
    "You can/should ignore punctuation and case.",
    "Simultaneously entering several words all at once (eg with whatever Chinese input system you prefer) is fine.", "The definition of a 'word' is a bit ambiguous in Chinese, sometimes a target 'word' might include more characters than you were expecting, and the input won't be accepted until the 'word' the computer is expecting is complete.","The blanks are all drawn the same size no matter what word is underneath.","If you get stuck, the 'flash answer' button will show you the target text (in the most annoying way possible. This is deliberate. Sorry.)","Good luck have fun."
			  ];
			  
const cloze_motivation = "<h1>Why play Cross-language Cloze</h1>"+
      "<p>This cloze completion exercise is not really ideal translation practice, but I'm hoping it's better than nothing</p>"+
      "<p>Translation practice is hard (maybe impossible?) to automate, because there are <strong>always</strong> several defensible options, often with different tradeoffs. There's very little value in translating practice without feedback, and it's hard to automate feedback when there's no single correct solution.</p>"+
      "<p>But what this does do is set up a guessing game a bit like a crossword puzzle, where the clues are both the local context and a meaning expressed in the other language. It's probably useful to get practice in combining these two sources of information?</p>"+
      "<p>Probably most of the value of this exercise is in getting comfortable 'shadowing' in the language you're inputting. Hopefully there's also some value in getting exposure to the content of the dialogs, which are supposed to be jammed with interpreting-relevant terms. But since the cross-language hints are there, there could also be some opportunities to disambiguate a cloze gap by exercising some kind translation-muscle occasionally.</p>"+
      "<p>Currently, the bilingual texts are machine generated and I have low confidence in them. It seems to be easier for the robots to translate a text they generated themselves as opposed to one you supply, but they still contain some unidiomatic expressions, and occasionally major omissions or distortions. Hopefully better than nothing, but I'm also hoping to improve these texts in the future.</p>"+
      "<p>Good luck have fun!</p>"+
  "<p><button onclick=location.reload()>Main menu</button></p>"

function cloze_howtoplay(){
    if(instruction_index == cloze_instructions.length){
	document.getElementById("instructionnext").disabled = true;
	return;
    }
    toUberdiv(
	"<h1>How to play the Cloze bilingual-crossword not-really-translation game</h1>"+
	    cloze_instructions[instruction_index]+
	    "<p><button id='instructionnext' onclick=cloze_howtoplay()>Next</button></p>"+
	"<p><button onclick='location.reload()'>Main menu</button></p>"
    )
    instruction_index = instruction_index + 1;
}
function cloze_whytoplay(){
    toUberdiv(cloze_motivation);
}


//todo: fetch these from some library!
//Are you ok with punctuation glomming onto the words? Probably not.
let reference_story = []
let target_story = []
let cloze_sentence_pointer = 0
let cloze_word_pointer = 0;
let leftovers = "";
let prob_mask = .5; //Set in menu. Actually prob of clear text, ie 1-pmask, whups.

let masked_target = [];
let current_theme = "rnd"

function cloze_onchangeHandler(){
 
    my_input = document.getElementById('cloze_input').value.trim().replace(/[。，、？！‘,\.?!]/g,"").toLowerCase()
    tomatch = target_story[cloze_sentence_pointer][cloze_word_pointer].trim().replace(/[。，、？！‘,\.?!]/g,"").toLowerCase()

    if(my_input.startsWith(tomatch)){
	leftovers = my_input.replace(tomatch,"")
//	leftovers = my_input.replace(target_story[cloze_sentence_pointer][cloze_word_pointer],"").replace(/[。，、？！‘,\.?!]/g,"")
	
	document.getElementById('cloze_input').value=="";
	cloze_word_pointer = cloze_word_pointer +1;
	if(cloze_word_pointer >= target_story[cloze_sentence_pointer].length){
	    cloze_sentence_pointer = cloze_sentence_pointer +1;
	    cloze_word_pointer = 0;
	    if(cloze_sentence_pointer >= target_story.length){		
		my_text = get_bilang_text_obj(current_theme)
		cloze_word_pointer = 0;
		cloze_sentence_pointer = 0;
		masked_target = [];
		
		for(i=0; i<target_story.length;i++){
		    masked_target.push([])
		    for(j=0;j<target_story[i].length;j++){
			masked_target[i].push(
			    Math.random() > prob_mask ? target_story[i][j] : "□□□"
			)
		    }
		}//end setting up masked_target
		
	    }//end if sentence pointer runs off the end of the story
	}//end if word pointer runs off the end of the sentence
	init_cloze()
    }
}

function flash_ans(){
    targ_sep = targ_lang == "eng" ? " " : "";
    alert(target_story[cloze_sentence_pointer].join(targ_sep))
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
	"<td id='cloze_target_cell' class='cloze_cell'>"+
	current_target+
	"<br/><button onclick='flash_ans()'>flash answer</button>"+
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
     "</table>"+
	"<div style='position:absolute;bottom:0;left:0;margins:auto;width:50%'><p><button onclick='location.reload()'>Main menu</button></p></div>"
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
    prob_mask = parseFloat(document.getElementById('blank_prob_slider').value)/100;

    current_theme = document.getElementById('cloze_theme').value //gets re-used after wiping input element from page
    my_text = get_bilang_text_obj(current_theme)

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
	"<option value='NEW'>NEW</option>"+
	"<option value='goats'>Goats</option>"+
	"<option value='medical'>Medical</option>"+
	    "</select><br/>"+
	"<p><button onclick='location.reload()'>Back to Main menu</button></p>"+
	"    </div>"
    )
    

}

