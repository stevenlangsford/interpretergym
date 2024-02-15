const lcwc_instructions = ["Look-cover-write-check starts with some prompt text.","When you click the 'cover' button, the prompt text will vanish and be replaced by an input box.","When you're done trying to reproduce the input, click the 'check' button (or use the keyboard shortcut ctrl+enter to submit)","The original prompt and your reproduction will appear side-by-side in two blue boxes","It's up to you whether to accept your reproduction or not. You can be strict or forgiving about paraphrasing/typos, it's up to you.","If you accept, some more text will be added to the prompt","If you reject, the same prompt will be shown again.","Enjoy!"]

const lcwc_motivation = "<h1>Look cover write check</h1> <p>This is just another 'shadowing' exercise. Get some text, repeat it back. It's not fundamentally different from the memory palace exercise.</p><p>The format does seem to encourage more verbatim memorization than the memory palace one though? See what you think.</p><button onclick='location.reload()'>Main menu</button>"

let lcwc_length = 1
let lcwc_text = []

function lcwc_howtoplay(){
    if(instruction_index == lcwc_instructions.length){
	document.getElementById("instructionnext").disabled = true;
	return;
    }
    toUberdiv(
	"<h1>How to play look-cover-write-check</h1>"+
	    lcwc_instructions[instruction_index]+
	    "<p><button id='instructionnext' onclick=lcwc_howtoplay()>Next</button></p>"+
	"<p><button onclick='location.reload()'>Main menu</button></p>"
    )
    instruction_index = instruction_index + 1;
}

function lcwc_whytoplay(){
    toUberdiv(lcwc_motivation+random_eyecandy());
}
function lcwc_gettext(){
    while(lcwc_text.length < lcwc_length){	

	pulled_text = shuffle(targ_language=="eng" ? eng_monologue_library : zh_monologue_library)[0] //by-reference (right?)
	
	for(i=0;i<pulled_text.length;i++){
	    if(targ_language == "eng"){
		sentences = pulled_text[i].split(/[\.!\?:]/)
	    }else if (targ_language == "zh") {
		sentences = pulled_text[i].split(/[。？！：]/)
	    }
	    for(asentence = 0; asentence < sentences.length; asentence++){
		if(sentences[asentence]==undefined || sentences[asentence].length==0)continue; //sometimes split on punctuation produces null chunks?		
		lcwc_text.push(sentences[asentence])
		if(lcwc_text[lcwc_text.length - 1].length < 10){
		    asentence++;//is it gross to mess with loop var?
		    lcwc_text[lcwc_text.length - 1]+=sentences[asentence]
		    console.log("added to a short sentence")
		}
	    }
	}//end push individual sentences from each chunk in the text.
    }//end while lcwc_text less than target length
}

function lcwc_start(){
        if(isNaN(parseInt(document.getElementById("lcwc_startlen").value))){
	alert("Start length needs to be an integer")
	return;
    }

    targ_language = document.querySelector('input[name="targ_language"]:checked').value;
    lcwc_length = parseInt(document.getElementById("lcwc_startlen").value);

    if(targ_language == "rnd"){
	targ_language = shuffle(["eng","zh"])[0]
    }

    lcwc_gettext()
    // Todo: get some texts from the bilang resources?
    // total_length = bi_text_pairs.length + monos.length;
    // apick = Math.floor(Math.random()*total_length);
    // console.log(total_length)
    lcwc_draw()
}


function lcwc_draw(){
    prompt = "<div class='lcwc_prompt_div'>"

    for(i=0; i < lcwc_length;i++){
	prompt = prompt + "<p>"+lcwc_text[i]+"<p>"
    }   
    prompt = prompt + "</div><button onclick='lcwc_cover()'>Cover</button>"
    
    toUberdiv(prompt)
}

function lcwc_keydown(){
     if (event.ctrlKey && event.keyCode === 13) {
	 lcwc_check()
  }
}

function lcwc_cover(){
    toUberdiv(
	"<textarea id='responsetext' onkeydown=lcwc_keydown(this) cols='70' oninput='this.style.height = \"\";this.style.height = this.scrollHeight + \"px\"'></textarea>"+
	    "<p><button onclick='lcwc_check()'>Check<br/(ctrl+enter)></button>"
    )
    
    document.getElementById('responsetext').focus();
}


function lcwc_check(){
    //Get the user's answer from the textbox first:
    usertext = document.getElementById("responsetext").value
    
    //toUberdiv a 'check' screen.
    //Align how? Top bottom? Highlighting on matches?
    checker = "<div id='twocol_container'><div class='twocol_child' id='lcwc_original'><h2>Original</h2>"
    for(i=0; i < lcwc_length;i++){
	checker = checker + "<p>"+lcwc_text[i]+"<p>"
    } 
    checker = checker + "</div>"+ //end lcwc_original
	"<div class='twocol_child' id='lcwc_response'><h2>You said:</h2>"+
	usertext +
	"</div></div>"+//first end lcwc response, second end twocol_container
	"<div style='width:100%' class = 'lcwc_acceptrejectdiv'><button onclick = 'lcwc_accept()'>Accept</button><button onclick='lcwc_reject()'>Reject</button></div>"+
	    "      <br/><p><button onclick=location.reload()>Main menu</button><p>"
    //accept button: adds to the text length? Pulls a new random text? (should be a menu setting)
    //reject button: repeat this text.
    toUberdiv(checker)
}
function lcwc_accept(){
    lcwc_length += 1;
    if(lcwc_length > lcwc_text.length){
	lcwc_gettext();//re-start -> get new texts
    }else{
	lcwc_draw();//re-draw with same text but longer length
    }
    
}
function lcwc_reject(){
    lcwc_draw()//go again, same text.
}

function lcwc_home(){
    
    toUberdiv(
	random_eyecandy()+
	    "      <p><button onclick=location.reload()>Main menu</button><p>"+
	    "    <div class='settings_div'>"+
	    "    <h2>Settings</h2>"+
	    "<p>Start length <br/><input type='text' id='lcwc_startlen' value='1' size='2'></p>"+
	    "      <h3>Language</h3>"+
	    "      <input type='radio' id='eng' name='targ_language' value='eng'>"+
	    "      <label for='eng'>English</label><br>"+
	    "      <input type='radio' id='zh' name='targ_language' value='zh'>"+
	    "      <label for='zh'>Chinese</label><br>"+
	    "      <input type='radio' id='rnd' name='targ_language' value='rnd' checked>"+
	    "      <label for='rnd'>Surprise me</label><br>"+
	"<button onclick='lcwc_start()'> Start <br/>Look-cover-write-check</button>"+
	    "    </div>"
    )//end toUberdiv
 }
