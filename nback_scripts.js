//let targ_lang = "blank lang" //Basically all exercises care about these, so they're declared in index.html. Probably an antipattern
//let text_type = "blank text type"
let wins_to_increase = 5; //need consecutive wins to increase the current n
let fails_to_decrease = 3; //'lives': cumulative, reset to zero on decrease
let current_wins = 0;
let current_fails = 0;
let current_n = 1;

let nback_itemlist = [];

let nback_instructions = [
    "<p>The first thing you see in the N-back game is an 'item' with a yellow border around it, and a 'load' button with a green border around it.</p>",
    "<p>Click the load button (or press any key) to load the next item. You will see a new item appear at the top of the screen. The one you were just looking at goes into the N-back queue. You can't see anything in the N-back queue, all the items in the queue are hidden behind question marks.</p>",
	    "<p>Each time you load an item, the top item will move into the queue of question marks, and a new item will appear at the top.  <p>The question marks represent a queue of hidden items.</p> <p>Keep loading until the queue is full.</p>",
	    "When the queue is full, the most recent item in the queue (the one you can see) and the oldest item in the queue (which is hidden) will both get a yellow border.</p>",
	    "<p>The task is to say whether these two items match or not.</p>",
	    "<p>If you think they are the same, click the 'same' button OR press the 'a' key on your keyboard.</p>",
	    "<p>If you think they are different, click the 'different' button OR press the 'l' key on your keyboard.</p>",
	    "<p>Here's the most important bit: when you make a response, a new item is added to the beginning of the list, and the last item (the one you just judged) falls off the end.</p>",
	    "<p>All the items in the queue advance by one, but you can't see that happening because they're all hidden behind question marks.</p>",
	    "<p>The task is still the same: judge whether the most-recent item (which is visible at the top of the screen) matches the oldest item in the queue (hidden at the bottom). Every time you make a response, every item shifts down by one.</p>",
	    "<p>You get feedback on your responses. If you were right, the border will flash solid green, if you were wrong, it'll flash dashed red.</p>",
	    "<p>If you get enough answers right, you'll go to the next level, which means increasing the length of the hidden queue.</p>",
	    "<p>When that happens, the whole screen will flash green, and your current queue of items will be emptied back to zero. You'll need to fill it again using the load button (or by pressing any key). When it gets to the new length that matches the level you're on, you can start making same-or-different judgments again.</p>",
	    "<p>Similarly, if you get too many wrong you'll go down a level. The screen flashes red, the queue of items empties, and you'll load a new queue at the new (shorter) queue length. When the queue is full the same-or-different task begins again.</p>",
	    "<p>On the start menu, you can choose whether items should be words or sentences, what language you want to use (or a mixture), and how easy it is to go up and down levels.</p><p>Enjoy! How long a queue can you handle?</p>"
];

let nback_motivation = "<h1>Why play N-back?</h1>"+
    "<p>N-back is a very popular task for studying working memory</p>"+
    "<p>This kind of memory is probably relevant for parsing sentences. (It's different from the kind of memory that helps you keep track of the contents of what was said! For that, try the memory palace exercise instead.)</p>"+
    "<p>Because N-back is such a popular task for testing memory, it's also popular with people trying to make 'brain training' tools to improve your memory.</p>"+
    "<p>If you look through the literature, you'll find a ton of papers saying that brain-training tools like this one don't really work.</p>"+
    "<p>But when people say this, they almost always mean that participants don't seem to be getting smarter on tests of general intelligence (or protected from dementia, or some other positive outcome the brain-training app makers are selling). People almost always get better at the brain-training task itself!</p>"+
    "<p>I think it's reasonable to say that brain-training works, but it's very specific. The ability you're training doesn't generalize.</p>"+
    "<p>So the real question here is 'does interpreting use the very-specific mental muscle that N-back is training?'</p>"+
    "<p>I don't really know for sure, but I think it might.</p>"+
    "<p>Try reading this sentence:</p>"+
    "<p><strong>\"The horse raced past the barn fell.\"</strong></p>"+
    "<p>Most English speakers find this sentence very annoying, and it often takes a couple moments to realise that it is a grammatical sentence with a perfectly reasonable meaning (The horse that was raced past the barn fell)</p>"+
    "<p>The reason it's annoying is that when you hit 'fell', you need to go back and re-organize how the parts of the sentence fit together.</p>"+
    "<p>This sentence is a famous example of a garden path sentence, so-called because it 'leads you up the garden path' towards one syntactic parse, then suddenly reveals that the sentence has a different, unexpected structure.</p>"+
    "<p>Anyway, the point is that garden path sentences just highlight memory demands that probably apply to all the sentences you meet. Parsing a sentence always involves holding the words-so-far in working memory, so that they're available for the bits of your brain that process syntax (whatever they are). Garden path sentences are special only because they make the memory demands more obvious and easier to see in research. The N-back training does seem to improve how easily people handle these awkward test sentences, so it <strong>probably</strong> improves processing on normal sentences too.</p>"+
    "<p> There are a few researchers claiming this, see <a href='https://www.tandfonline.com/doi/abs/10.1080/01690965.2012.758297'>Novick et al (2013) 'Clearing the garden-path: improving sentence processing through cognitive control training'</a> for one example.</p>"+
    "<p>There's a nice review article looking at interpreters specifically here: <a href='https://www.jbe-platform.com/content/journals/10.1075/tcb.00063.ghi'>Ghiselli (2022) Working memory tasks in interpreting studies A meta-analysis</a></p>"+
    "<p>Interpreters do better in N-back tasks, and the size of the advantage correlates with experience. But, consistent with the general story about brain-training not generalizing, you only see the advantage with language-based N-back tasks: do it with colors or numbers and the interpreters are no different from anyone else.</p>"+
    "<p>So, here's a linguistic N-back task for you, to specifically target this particular mental muscle! It's not really 'settled science' whether drilling on this can make interpreting feel easier, but I find it pretty plausible that it might.</p>"+
    "<p><button onclick=location.reload()>Main Menu</button>";

function nback_howtoplay(){
    if(instruction_index == nback_instructions.length){
	document.getElementById("instructionnext").disabled = true;
	return;
    }
    toUberdiv(
	"<h1>How to play N-back</h1>"+
	    nback_instructions[instruction_index]+
	    "<p><button id='instructionnext' onclick=nback_howtoplay()>Next</button></p>"+
	"<p><button onclick='location.reload()'>Main menu</button></p>"
    )
    instruction_index = instruction_index + 1;
}
function nback_whytoplay(){
    toUberdiv(nback_motivation);
}

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

    let nextitem = "BLANK";
    
    if(text_type == "words"){
	if(targ_lang == "eng"){nextitem = shuffle(common_eng)[0];}
	if(targ_lang == "zh"){nextitem = shuffle(common_zh)[0];}
	if(targ_lang == "mix"){nextitem = Math.random()< .5 ? shuffle(common_zh)[0] : shuffle(common_eng)[0]}
    } else if(text_type == "texts"){
	if(targ_lang == "eng"){nextitem = shuffle(shuffle(eng_monologue_library)[0])[0];}
	if(targ_lang == "zh"){nextitem = shuffle(shuffle(zh_monologue_library)[0])[0];}
	if(targ_lang == "mix"){nextitem = Math.random() < 0.5 ? shuffle(shuffle(eng_monologue_library)[0])[0] : shuffle(shuffle(eng_monologue_library)[0])[0]}
    }
    
    if(Math.random() < 0.5 || (nback_itemlist.length < current_n+1)){//current_n is the GAP, n+2 is the list length
	nback_itemlist.push(nextitem);//push novel
    } else {
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
	text_type = shuffle(["words","texts"])[0];
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
