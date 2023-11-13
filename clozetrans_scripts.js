//todo: fetch these from some library!
//what're you going to do about punctuation? Right now gloms to prev word
let reference_story = [
    ["有", "一只", "小山羊", "走丢","了"],
    ["它", "离开","了", "它的", "家，", "迷路了"],
    ["小山羊", "感到", "非常", "害怕", "和", "孤单"],
    ["幸运的是", "一位", "好心的", "农夫", "发现了", "它"],
    ["农夫", "带着", "小山羊", "回到了", "它的", "家"],
    ["小山羊", "和", "它的", "家人", "团聚了"],
    ["它们", "都", "非常", "高兴，", "庆祝着", "团圆"],
    ["小山羊", "再也", "不会", "迷路了"],
    ["它", "学会了", "留在", "家人"],
    ["这是", "一个", "快乐的", "结局。"]
]

let target_story = [
  ["Once", "upon", "a", "time,", "a", "little", "goat", "got", "lost."],
  ["It", "wandered", "away", "from", "its", "home", "and", "got", "lost."],
  ["The", "little", "goat", "felt", "very", "scared", "and", "lonely."],
  ["Luckily,", "a", "kind", "farmer", "found", "it."],
  ["The", "farmer", "brought", "the", "little", "goat", "back", "to", "its", "home."],
  ["The", "goat", "and", "its", "family", "were", "reunited."],
  ["They", "were", "all", "very", "happy", "and", "celebrated", "their", "reunion."],
  ["The", "little", "goat", "would", "never", "get", "lost", "again."],
  ["It", "learned", "to", "stay", "close", "to", "its", "family"],
  ["And", "they", "all", "lived", "happily", "ever", "after."]
]

let cloze_sentence_pointer = 0
let cloze_word_pointer = 0;
let leftovers = "";

function cloze_onchangeHandler(){
    console.log("onchange saw |" +
		document.getElementById('cloze_input').value+
		"| looking for |"+
		target_story[cloze_sentence_pointer][cloze_word_pointer]+"|"+
		(target_story[cloze_sentence_pointer][cloze_word_pointer]==
		 document.getElementById('cloze_input').value)
	       )//ok
my_input = document.getElementById('cloze_input').value.trim();
    
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
	todo_words = todo_words + target_story[cloze_sentence_pointer][i]+targ_sep;
    }
    
    current_target = done_words+todo_words+
	"<br/>"+
     "<input type='text' id='cloze_input' autofocus>"
    current_reference = reference_story[cloze_sentence_pointer].join(ref_sep)

    
    if(cloze_sentence_pointer + 1 < target_story.length){
	future_target = target_story[cloze_sentence_pointer + 1].join(targ_sep)
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


function clozetrans_home(){
    which_keylistener = "cloze"
    
    //assumes targ_lang is eng or zh.
    targ_lang = "eng"
    
    //todo: menus here, pick source and target languages, maybe also gap density and maybe maybe topic?

    init_cloze();//turn into a button when home is a menu.
}
