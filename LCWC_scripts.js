const lcwc_instructions = ["bite me"]
const lcwc_motivation = "I mean it"

let lcwc_length = 1
let lcwc_text = ["lcwc", "default text"]

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
    toUberdiv(lcwc_motivation);
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
    
    // Todo: get some texts from the bilang resources?
    // total_length = bi_text_pairs.length + monos.length;
    // apick = Math.floor(Math.random()*total_length);
    // console.log(total_length)
    
    lcwc_text = shuffle(targ_language=="eng" ? eng_monologue_library : zh_monologue_library)[0] //js will by-reference right :-P

    draw_lcwc()
}


function draw_lcwc(){
    prompt = "<div class='lcwc_prompt_div'>"

    for(i=0; i < lcwc_length;i++){
	prompt = prompt + "<p>"+lcwc_text[i]+"<p>"
    }   
    prompt = prompt + "</div><button onclick='lcwc_cover()'>Cover</button>"
    
    toUberdiv(prompt)
}

function lcwc_cover(){
    toUberdiv(
	"<textarea id='responsetext' oninput='this.style.height = \"\";this.style.height = this.scrollHeight + \"px\"'></textarea>"+
	    "<p><button onclick='lcwc_check()'>Check</button>"
    )
    
    document.getElementById('responsetext').focus();
}


function lcwc_check(){
    //Get the user's answer from the textbox first:
    //toUberdiv a 'check' screen.
    //Align how? Top bottom? Highlighting on matches?
    //accept button: adds to the text length? Pulls a new random text? (should be a menu setting)
    //reject button: repeat this text.
    alert("coming soon")
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
