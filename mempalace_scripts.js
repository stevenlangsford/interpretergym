
const mempalace_instructions =[
    "Memory palace is all about remembering lists of things.",
    "Using the memory palace technique is <strong>very strongly recommended</strong> for this exercise.",
    "There's a more detailed description of how the memory palace works in the 'why to play' section, this just covers the mechanics of what you'll see when doing the exercise.",
    "In stage one, you'll get the list. Remember each item and hit 'Next' to continue.",
    "In stage two, you'll get a series of blank text boxes. Write in each of the items you remembered. Write 'skip' or some other filler if you know you've forgotten something, doing this will help keep your responses aligned with the revealed answers in review. Press 'enter' to continue to the next item.",
    "In stage three, you'll get a chance to check your answers.",
    "It's up to you if you want to accept or reject each answer! If you're remembering words you might want to accept spelling mistakes or conjugations of the word, if you're remembering texts you probably want to accept if you get the key points.", "You can shift your list of answers left (to see later answers) or right (to see earlier answers) using the 'shift left' and 'shift right' buttons at the bottom of the screen. This helps re-align your answers with the originals if there's a gap in your responses that you didn't cover by entering a 'skip' response. At the end you'll get a count of how many you accepted.",
    "When you get to the end of the review, you can choose to increase the list length by one, five, or ten. Or you can go back to the main menu.",
    "In the setup menu you can choose if the items you're going to remember are individual words or chunks of a monologue.",
    "Individual words are easier, and the word list is mostly (but not exclusively!) concrete nouns that work well with the memory palace technique.",
    "Chunks of monologue are harder, but also much more realistic. If you're using memory palace, you'll have to decide for yourself how many palace locations to use for each chunk presented. You'll probably want to place an extra object to represent the breaks between each chunk so that the review stage properly aligns the things you remembered with the originals: this will only happen if you enter chunks as they were presented, ignoring how many actual locations you used to remember each.",
    "Enjoy! How long a monologue can you remember?"
]

const mempalace_motivation = "<h1>Why play memory palace</h1>"+
      "<p>This is a memory exercise: you get chunks of text presented in a list, and then have to repeat them back.</p>"+
      "<p>It's called 'memory palace' as an invitation to try doing it using the memory palace technique.</p>"+
      "<p> The technique involves getting very well practiced with a tour of a familiar location. Then, as you receive things you want to remember, you place reminder objects in the locations along the tour. When you want to recall the information, you mentally re-walk the tour, encountering the reminder objects you placed previously as you go around.</p>"+
      "<p>The 'list of words' version is easier to practice the palace technique with. You get one object per location, and most of the objects in the list are concrete things that you can just place directly. It doesn't take too long to get good at remembering lists of concrete objects this way.</p>"+
"The texts version is harder, and more realistic for the interpreting memory case. You have to decide yourself how to break the text into chunks, and how much information you're going to try to associate with each location. Also it can be tricky to come up with good cue objects quickly that will remind you effectively of what was said in the text when you encounter them on the recall tour.</p>"+
     "<p>You can read about the memory palace technique on wikipedia, <a href='https://en.wikipedia.org/wiki/Method_of_loci'>Wikipedia</a> or this book <a href='https://artofmemory.com/blog/moonwalking-with-einstein-joshua-foer/'> Moonwalking with Einstein </a> is a pretty entertaining pop-sci treatment (from a journalist who got assigned to cover the world memory championships and got interested enough to return as a competitor)."+
     "<p>The memory palace technique is <strong>overwhelmingly</strong> the most popular technique among competitive memory athletes.</p>"+
     "<p>It's also very well studied. See for example <a href='https://www.nature.com/articles/nn988'>Maguire et al (2003) Routes to remembering: the brains behind superior memory</a>"+
     " The main take-home message from the literature seems to be that memory palace is very effective and you don't need to be some kind of genius to learn it. (Also, learning it doesn't make you a genius at other things, it's pretty specific in what it can do).</p>"+
     "<h3>The memory palace technique</h3>"+
     "<p>Pick a place that you know very well. A house you grew up in is often a good choice, a park you know well, or maybe a workplace or school/university.</p>"+
     "<p>The most important thing about this place is that it should support a connected chain of distinct locations. These are going to be the 'loci' that will hold your memory prompts.</p>"+    
     "<p>One important feature of the loci is that they should be well connected in a sensible order.</p>"+
     "<p>The other important feature of the loci is that they should be very easy to tell apart.</p>"+
      "<p>That's all you need. Very distinctive places, lots of them, and a natural path that tours through them so that each one is well-connected to the next one.</p>"+
      "<p>There are two parts to practicing the technique. It does take a bit of investment in practice time before it becomes useful, it's one of those things that seems pointless until you work with it a bit.</p>"+
      "<p>One part of the practice is getting very familiar with the locations in your tour.</p>"+
      "<p>There's no place for doing that part of the exercise on this web page, but it's an important part of the exercise (according to the memory coaches in that book 'Moonwalking with Einstein'). Write down the locations in your tour and review them often. Draw a little mud-map. Then write out the list from memory. Check it against your master list. Mentally run through the tour on public transport or in bed before you fall asleep, etcetera. Then do it all again. There's quite a bit of grind. </p>"+
      "<p>The other main skill that takes practice is coming up with good cues to put in the locations.</p>"+
      "<p>These are the things that will remind you of what you wanted to remember when you run through your tour of locations at recall time. They have to be concrete things that you can imagine putting in the physical locations of your memory palace, they have to be memorable, and they have to be strong reminders of the things they stand for.</p>"+
      "<p>Some general tips:</p>"+
      "<ul>"+
       "<li>A reminder should be some kind of physical object. Writing a word you want to remember on an imaginary post-it-note and sticking that to your location is probably not going to work.</li>"+
     "<li>Make it unusual. The rule of thumb is: if you saw this in real life, would you definitely tell your friends about it?</li>"+
     "<li>One simple way to 'make it unusual' is to make the thing huge or tiny. Vulgar is also often effective.</li>"+
     "<li>Make it active. Things that are doing something: spinning, burning, swaying, biting, falling, are more striking than static.</li>"+
     "<li>Interact with the location: Sit on something, swing off something, be hiding badly behind something that is part of that location.</li>"+
    "<li>Make it personal. Associations that are in-jokes with yourself are usually more memorable than conventional metaphors.</li>"+
    "<li>More is more. Often putting more details in can make the whole thing easier to remember. Several objects can combine into one super-cue, and that's often a good idea. Things like 'Queen Elizabeth throwing darts at a cactus' packs a lot of info into one location, and this kind of overloading generally makes the cue easier rather than harder to remember.</li>"+
     "</ul></p>"+
    // "<p>Here's an example to get the feeling.</p>"+
    // "<p>Imagine your memory palace is the house you grew up in and you're starting from the mailbox. Ahead of time, you prepared a tour that starts at the mailbox, then goes up the driveway, to a pot-plant by the front door, and then to front door. (Your tour continues inside the house, but this example is only a couple items long.) Now you're interpreting for a doctor who has just started listing out symptoms of high blood pressure.</p>"+
    // "<p>The doctor says \"High blood pressure can cause headaches, especially in the morning or after physical exertion.\"</p>"+
    // "<p>You put a very sore head in your letterbox.</p>"+
    // "<img src='resources/headache_palace_prompt.png' width='200' height='200'>"+
    // "<p>Then an exhausted rooster in a judo outfit in the driveway. Roosters crow in the morning, and this one has just been physically exerting itself. It's not obvious from the picture, but the rooster also has a headache (because the info is about the headaches)</p>"+
    // "<img src='resources/exhausted_rooster.png' width='200' height='200'>"+
    // "<p>The doctor continues: \"Another symptom is dizziness and lightheadedness: Due to the impact of high blood pressure on blood flow, you may experience dizziness or a lightheaded sensation.\"</p>"+
    // "<p>Your next location is the pot plant by the door: you pick a spinning top to represent dizziness and have it float around the plant like a balloon as it spins.</p>"+
    // "<img src='resources/potplant.jpeg' width='200' height='200'>"+
    // "<p>You get the idea! When the doctor finishes their list, you can go back and re-do the tour: first the mailbox with the severed head to remind you of headaches, then up the driveway where the exhausted rooster with a headache is, to remind you that this is morning and after physical activity, then to the pot plant where you have placed a reminder of dizziness and lightheadedness.</p>"+
    // "<p>There are a couple advantages to this technique. When it comes to sheer volume, it's very hard to beat. With practice, memory palace users can remember startlingly long lists.</p>"+
    // "<p>But, possibly more importantly, you very often notice when you've forgotten something! In this example, if you remember headaches and dizziness, you are definitely going to notice that the thing you put in the driveway is missing (and you'll know what to ask for: the thing in the driveway is the bit just after the headaches.)</p>"+
    // "<p>Something I have noticed doing this drill a few times in a row is that I get interference from things that were in the same location on the previous tour. So I like to start the next tour where the last tour ended, and continue on to locations I haven't used yet for as long as possible. That means I have to prepare many more locations than I can use on any one tour, but then they do all get used if I do a few tours in a row. Then when I do run out and loop around to re-using locations, there's much less interference. You'll probably want to add your own customizations to the technique depending on what works best for you! This is just one example.</p>"+
     "<p>Researchers seem to agree that pretty much anyone can learn to use a memory palace, it's really mostly just about showing up and doing the practice. Very much like lifting weights in the gym, it's a bit tedious, but if you put in the reps, you get the gains. Also like lifting weights in the gym, it's possible to end up building muscles that are mainly good for bodybuilding (memory competitions) rather than a sport (interpreting), so it's good to mindfully check that it's actually helping.</p><p>It can be fun though: it's pretty satisfying to stick the landing on a really long tour.</p>"+
    // "<p>For more on this technique, try <a href='https://en.wikipedia.org/wiki/Method_of_loci'>Wikipedia</a> or <a href='https://artofmemory.com/blog/moonwalking-with-einstein-joshua-foer/'>this pretty entertaining pop-sci book from a journalist who got assigned to cover the world memory championships and got interested enough to return as a competitor.</a>"+
     "<p>Good luck have fun!</p>"+
     "<p><button onclick=location.reload()>Main menu</button></p>"
    

    

function mempalace_howtoplay(){
    if(instruction_index == mempalace_instructions.length){
	document.getElementById("instructionnext").disabled = true;
	return;
    }
    toUberdiv(
	"<h1>How to play Memory Palace</h1>"+
	    mempalace_instructions[instruction_index]+
	    "<p><button id='instructionnext' onclick=mempalace_howtoplay()>Next</button></p>"+
	"<p><button onclick='location.reload()'>Main menu</button></p>"
    )
    instruction_index = instruction_index + 1;
}
function mempalace_whytoplay(){
    toUberdiv(mempalace_motivation);
}


function mempalace_home(){
    document.getElementById("uberdiv").innerHTML = ""+
//	"      <p><button onClick=viewTour()> tour my palace </button></p>      "
	"<button onclick='location.reload()'>Back to Main menu</button>"+
    random_eyecandy()+
	"    <div class='settings_div'>"+
	"    <h2>Settings</h2>"+
	"<p>Start length: <input type='text' id='startlength' value='5' size='2'></p>"+
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
    "      <p><button onClick=mempalace_submit_settings_start()>Start memory palace</button></p>"+
	"    </div>"
}


//GLOBAL STATE VARS

//Word list resources live in resources/word_lists.js, made available for this script by index.html
//Available but not defined here: eng_concrete_nouns (an array of strings)

let live_item = 0;
let itemlist = [1,2];//placeholder 
let responselist = [];
let correct_count = 0;
let ans_offset = 0;

//USER ACTIONS
function mempalace_startfresh(new_length){
    live_item = 0;
    ans_offset = 0;
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
	//get_monologue checks targ_language. Should that happen here? Dunno
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
    responsezone = "<p><button onClick=nextViewHandler()>NEXT</button></p>"+
	"<button style='position:absolute; bottom:0; left:0' onclick='location.reload()'>Main menu</button>"
   
    toUberdiv(headerprompt+itemview+responsezone)

}

function testItem(){
    headerprompt = "<h1>You are in location "+(live_item+1)+" of "+(itemlist.length)+"</h1>";
    itemview = //"<p>Recall your prompt: <input type='text' id='responsetext'/ onkeydown=kbd_getResponse(this)></p>"+
	"<p>Recall your prompt:</p><br/> "+
	"<textarea id='responsetext' onkeydown=kbd_getResponse(this) oninput='this.style.height = \"\";this.style.height = this.scrollHeight + \"px\"'></textarea>"+
	"<p>Press 'Enter' to record and continue </p>"
	"<button style='position:absolute; bottom:0; left:0' onclick='location.reload()'>Main menu</button>"
    
    toUberdiv(headerprompt+itemview)
    document.getElementById('responsetext').focus();
}


function ansoffset(mv){
    ans_offset = ans_offset + mv;
    checkResponses()//redraws 
}

function show_ans(){
    if(live_item + ans_offset < 0 || live_item + ans_offset >= responselist.length){
	return("*** no response ***")
    }else{
	return(responselist[live_item + ans_offset])
    }
}

function checkResponses(){
    headerprompt= "<h1>Check your answers:</h1>"
    itemcheck = "<p>Original was <br/><strong> "+(itemlist[live_item])+"</strong> <br/> you said <br/> "+(show_ans())+"</p><br/><br/>"
    acceptreject = "<p><button onclick=checkHandler(true)>Accept match</button><button onclick=checkHandler(false)>Reject: mistake</button></p><br/>";
    move_answers = "<p><button onclick='ansoffset(1)'> \<\<\< Shift all answers left</button> <button onclick='ansoffset(-1)'>Shift all answers right\>\>\></button>"+
	"<button style='position:absolute; bottom:0; left:0' onclick='location.reload()'>Main menu</button>"
    toUberdiv(headerprompt+itemcheck+acceptreject+move_answers)
}

function outro(){
    feedback = "<h1>You accepted "+correct_count+" of "+(itemlist.length)+" ("+(Math.round(correct_count/itemlist.length*100))+"%)";
    options =
	"<p><button onclick=mempalace_startfresh("+(itemlist.length+1)+")>Ok, +1</button>"+
	"<button onclick=mempalace_startfresh("+(itemlist.length+5)+")>Easy, +5</button>"+
	"<button onclick=mempalace_startfresh("+(itemlist.length+10)+")>Unleash, +10</button>"+
	"<button onclick=mempalace_startfresh("+(itemlist.length)+")>Again at this length</button></p>"+
	"<p><button onClick=location.reload()>Main menu</button></p>";
    toUberdiv(feedback+options)
}
   function mempalace_submit_settings_start(){
      targ_lang = document.querySelector('input[name="targ_language"]:checked').value;
      text_type = document.querySelector('input[name="text_type"]:checked').value;
	  
       if(isNaN(
         parseInt(document.getElementById("startlength").value)
       )){
	   alert("Start length must be an integer")
	   return;
       }

      mempalace_startfresh(
          parseInt(document.getElementById("startlength").value)
	  )
  }


//MAIN
//viewItem()
