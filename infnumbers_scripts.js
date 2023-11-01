//HELPERS AND TOOLS:

const cn = window.ChineseNumbering; //chinese number scripts loaded by index.html todo: npm install this

function numberPicker(){
    //practice-friendly numbers
    n_digits = 3 //sometimes the rnd digit selection gives you leading zeros.
    while(Math.random()<current_sizeprob && n_digits < 12){ //let users modify the prob... but keep the cap, toChineseNumber breaks at 13 digits
	n_digits = n_digits + 1
    }

    console.log(n_digits)
    somedigits = ['0','1','2','3','4','5','6','7','8','9']

    astring = ""
    while(astring.length < n_digits){
	astring = astring + shuffle(somedigits)[0]
    }
    console.log("picking "+astring)
    while(astring.substring(0,1)=='0')astring=astring.substring(1)
    return(astring)
}

function numberToChinese(n){
    return cn.numberToChinese(n)
}

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
      return hundredsPlace == 0 ? '' : maps.onesMap[hundredsPlace] + ' hundred' + tensHundredsSpace;
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
    // console.log(placeArray);
   // bob = placeArray
    //if there's more than one chunk, say 'and' before the last one
   
  return placeArray;
}


    unchunk = numberToEnglish_no_and(n).split(/\s/)
    if(unchunk.length > 1){
	lastchunk = unchunk.pop()
	unchunk.push("and")
	unchunk.push(lastchunk)
	unchunk = unchunk.join(' ')
    }
    return unchunk; 
}

//https://stackoverflow.com/questions/46534376/javascript-convert-arabic-numerals-to-chinese-characters
function numberToChinese(n){
  if (!Number.isInteger(n) && n < 0) {
    throw Error('请输入自然数');
  }

  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const positions = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿'];
  const charArray = String(n).split('');
  let result = '';
  let prevIsZero = false;
  //处理0  deal zero
  for (let i = 0; i < charArray.length; i++) {
    const ch = charArray[i];
    if (ch !== '0' && !prevIsZero) {
      result += digits[parseInt(ch)] + positions[charArray.length - i - 1];
    } else if (ch === '0') {
      prevIsZero = true;
    } else if (ch !== '0' && prevIsZero) {
      result += '零' + digits[parseInt(ch)] + positions[charArray.length - i - 1];
    }
  }
  //处理十 deal ten
  if (n < 100) {
    result = result.replace('一十', '十');
  }
  return result;
}

//DRAW TO SCREEN BIT:
let current_number = 0;
let current_sizeprob = .6;//used in numberpicker
let show_eng = false;
let show_zh = false;
let show_numeral = true;

function change_sizeprob(amt){
    newsize = current_sizeprob + amt;

    //cap min and max probs
    if(newsize < .2){return(0.2)}    
    if(newsize > .99){return(0.99)}

    return(newsize)
    
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
	"<div class='number_innerdiv'><button>Show</button></div>"+
	"<div class='number_innerdiv'><button>Hide</button></div>"+
	"<div class='number_innerdiv'><button>Show</button></div>"+
	"</div>"+
	
    "<div class='number_framediv'>"+
	"<div class='number_innerdiv'>L_LEFT</div>"+
	"<div class='number_innerdiv'>L_CENTER</div>"+
	"<div class='number_innerdiv'>L_RIGHT</div>"+
	"</div>"+
    "<div class='number_framediv'>"+
	"<div class='number_innerdiv'></div>"+
	"<div class='number_innerdiv'><button>REVEAL</button></div>"+
	"<div class='number_innerdiv'></div>"+
	"</div>"+


    "<div class='number_framediv'>"+
	"<div class='number_innerdiv'><button>Smaller numbers</button></div>"+
	"<div class='number_innerdiv'>Random number size:"+(current_sizeprob*100)+"%</div>"+
	"<div class='number_innerdiv'><button>Larger numbers</button></div>"+
	"</div>"+


    
	"</div>"//end uberwrapper
    
    toUberdiv(drawme);
}
