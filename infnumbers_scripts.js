//HELPERS AND TOOLS:

const cn = window.ChineseNumbering; //chinese number scripts loaded by index.html todo: npm install this

function numberPicker(){
    //practice-friendly numbers
    n_digits = 3 //sometimes the rnd digit selection gives you leading zeros.
    while(Math.random()<current_sizeprob && n_digits < 12){ //let users modify the prob... but keep the cap, toChineseNumber breaks at 13 digits
	n_digits = n_digits + 1
    }

    somedigits = ['0','1','2','3','4','5','6','7','8','9']

    astring = ""
    while(astring.length < n_digits){
	astring = astring + shuffle(somedigits)[0]
    }
    while(astring.substring(0,1)=='0')astring=astring.substring(1)
    return(astring)
}

function numberToChinese(n){
    return cn.numberToChinese(n)
}

let bob;

function numberToEnglish(n){
//adapted from http://www.java2s.com/ref/javascript/javascript-algorithm-string-convert-number-to-english.html
function numberToEnglish_no_and(number) {
  // import helper functions
  var placeArray = arrayifyNumber(number);
  var transcribe = tscribe();
  var maps = addMaps();

  // concat the transcribed number to results string
  var transcribedResult = '';
  var subsetCount = placeArray.length;
  var transcribedSegment;

  for(var x = 0; x < placeArray.length; x++){
    subsetCount--;
    transcribedSegment = transcribe(placeArray[x]);
    if(transcribedSegment.length !== 0){
      transcribedResult += transcribedSegment + ' ' + maps.subsetMap[subsetCount] + ' ';
    }
  }

  if(number == 0) return 'zero'; 
  if(number == 10) return 'ten'; 

  return transcribedResult.trim();
}

var tscribe = function(){
  return function(subset){
    var maps = addMaps();
    var numLength = subset.length;

    var transcribeOneDigit = function(subset){
      return maps.onesMap[subset[0]]
    };

    var transcribeTwoDigits = function(subset){
      var tensPlace = subset[0];
      var onesPlace = subset[1];
      var tensDash = '';

      if(onesPlace != 0) tensDash = '-';


      if(tensPlace === '1'){
        return maps.teensMap[onesPlace];
      } else if(tensPlace > 5 && tensPlace != 8) {
        return maps.onesMap[tensPlace] + 'ty' + tensDash + maps.onesMap[onesPlace];
      } else {
        if(tensPlace == 0){
          return maps.onesMap[onesPlace];
        } else if(onesPlace == 0){
          return maps.tensMap[tensPlace];
        } else {
          return maps.tensMap[tensPlace] + '-' + maps.onesMap[onesPlace];
        }
      }
    }

    var transcribeTreeDigits = function(subset){
      var hundredsPlace = subset[0];
      var tensPlace = subset[1];

      var tensHundredsSpace;
      tensPlace != 0 ? tensHundredsSpace = ' ' : tensHundredsSpace = '';

      // if the hundreds place is 0 we don't want to include it's suffix
      return hundredsPlace == 0 ? '' : maps.onesMap[hundredsPlace] + ' hundred ' + tensHundredsSpace;//SL: added trailing space
    }

    // transcribing
    if(numLength === 1) return transcribeOneDigit(subset);
    if(numLength === 2) return transcribeTwoDigits(subset);
    if(numLength === 3){
      var arrayMachine = [];
      var slicedArr = subset.slice(1);

      return (transcribeTreeDigits(subset) + transcribeTwoDigits(slicedArr));
    }
  }
}

var addMaps = function() {
  return {
    // 355,003
    onesMap : {
      '0' : '',
      '1' : 'one',
      '2' : 'two',
      '3' : 'three',
      '4' : 'four',
      '5' : 'five',
      '6' : 'six',
      '7' : 'seven',
      '8' : 'eight',
      '9' : 'nine',
    },
    teensMap : {
      '0' : '',
      '1' : 'eleven',
      '2' : 'twelve',
      '3' : 'thirteen',
      '4' : 'fourteen',
      '5' : 'fifteen',
      '6' : 'sixteen',
      '7' : 'seventeen',
      '8' : 'eighteen',
      '9' : 'nineteen',
    },
    tensMap : {
      '0' : '',
      '2' : 'twenty',
      '3' : 'thirty',
      '4' : 'forty',
      '5' : 'fifty',
      '8' : 'eighty'
    },
    subsetMap : {
      0 : '',
      1 : 'thousand',
      2 : 'million',
      3 : 'billion',
      4 : 'trillion',
      5 : 'quadrillion',
      6 : 'quintillion'
    }
  }
}

var arrayifyNumber = function(number){
  // break number into subsets of 3 digits
  var splitNum = number.toString().split('');
  var placeArray = [];

  while(splitNum.length > 3){
    placeArray.unshift(splitNum.splice(splitNum.length-3));
  }

  placeArray.unshift(splitNum);
   
  return placeArray;
}

    unchunk = numberToEnglish_no_and(n).split(/\s/)
    dont_and_me = ['hundred','thousand','million','billion','trillion','quadrillion']
    
    if(unchunk.length > 1 && ! dont_and_me.includes(unchunk[unchunk.length-1])){
	lastchunk = unchunk.pop()
	unchunk.push("and")
	unchunk.push(lastchunk)
    }
    
    unchunk = unchunk.join(' ')
    return unchunk; 
}

//DRAW TO SCREEN BIT:
let current_number = 0;
let current_sizeprob = .6;//used in numberpicker
let show_eng = false;
let show_zh = false;
let show_numeral = true;

function change_sizeprob(amt){

    function get_amt(){
    newsize = current_sizeprob + amt;

    //cap min and max probs
    if(newsize <= .2){return(0.2)}    
    if(newsize >= 1){return(1)}

	return(newsize)
    }
    current_sizeprob = get_amt()
    document.getElementById("showsize").innerHTML = "Random number size:"+Math.round(current_sizeprob*100)+"%"
}

//toggle fns are hella repetitive, there's got to be a better way
function statustext(status){
    return status ? "Open" : "Hidden"
}

function toggle_eng(){
    show_eng = !show_eng
    document.getElementById('toggleeng').textContent = statustext(show_eng)
    document.getElementById('eng_number').innerHTML = (show_eng ? numberToEnglish(current_number) : "???")
}

function toggle_numeral(){
    show_numeral = !show_numeral
    document.getElementById('togglenum').textContent = statustext(show_numeral)
    document.getElementById('numeral').innerHTML = (show_numeral ? current_number : "???")
}

function toggle_zh(){
    show_zh = !show_zh
    document.getElementById('togglezh').textContent = statustext(show_zh)
    document.getElementById('zh_number').innerHTML = (show_zh ? numberToChinese(current_number) : "???")
}


function reveal(){
    document.getElementById("eng_number").innerHTML = numberToEnglish(current_number);
    document.getElementById("numeral").innerHTML = current_number;
    document.getElementById("zh_number").innerHTML = numberToChinese(current_number);
}

function draw_numberChallenge(){
    current_number = numberPicker()

    drawme = 
	"<div>"+ //uberwrapper	
    "<div class='number_framediv'>"+
	"<div class='number_innerdiv'><strong>English</strong></div>"+
	"<div class='number_innerdiv'><strong>Numeral</strong></div>"+
	"<div class='number_innerdiv'><strong>Chinese</strong></div>"+
	"</div>"+
	
    "<div class='number_framediv'>"+
	"<div class='number_innerdiv'><button id='toggleeng' onclick='toggle_eng()'>"+statustext(show_eng)+"</button></div>"+
	"<div class='number_innerdiv'><button id='togglenum' onclick='toggle_numeral()'>"+statustext(show_numeral)+"</button></div>"+
	"<div class='number_innerdiv'><button id='togglezh' onclick='toggle_zh()'>"+statustext(show_zh)+"</button></div>"+
	"</div>"+
	
    "<div class='number_framediv'>"+
	"<div class='number_innerdiv'><span id='eng_number'>"+(show_eng ? numberToEnglish(current_number) : "???" )+"</span></div>"+
	"<div class='number_innerdiv'><span id='numeral'>"+(show_numeral ? current_number : "???" )+"</span></div>"+
	"<div class='number_innerdiv'><span id='zh_number'>"+ (show_zh ? numberToChinese(current_number) : "???" )+"</span></div>"+
	"</div>"+
    "<div class='number_framediv'>"+
	"<div class='number_innerdiv'><button onclick='reveal()'>REVEAL</button></div>"+
	"<div class='number_innerdiv'></div>"+
	"<div class='number_innerdiv'><button onclick='draw_numberChallenge()'>NEXT</button></div>"+
	"</div>"+


    "<div class='number_framediv'>"+
	"<div class='number_innerdiv'><button onclick='change_sizeprob(-0.05)'>Smaller numbers</button></div>"+
	"<div class='number_innerdiv'><span id='showsize'>Random number size:"+Math.round(current_sizeprob*100)+"%</span></div>"+
	"<div class='number_innerdiv'><button onclick='change_sizeprob(0.05)'>Larger numbers</button></div>"+
	"</div>"+
    "<div>"+
	"<div class='number_innerdiv'><button onClick=location.reload()>Back to Main Menu</button></div>"+
	"<div class='number_innerdiv'></div>"+
	"<div class='number_innerdiv'></div>"+
	"</div>"+

    

	"</div>"//end uberwrapper
    
    toUberdiv(drawme);
}

function numbers_home(){
    //bounce to exercise
    which_keylistener = "numbers" //key listener lives in index.html. Ugh.
    draw_numberChallenge()
}
//TODOS: looks like 7019 is a problem for numberToChinese? Wassup with that. Can fix?
