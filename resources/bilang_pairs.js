//rules for being a valid bilingual-text object:
//Be a javascript object
//have fields zh, eng, and theme
//zh and eng must be an array of sentences, where a 'sentence' is an array of words.
//The SENTENCES must be aligned chunks: same number of 'em, same order, corresponding meanings.
//The WORDS must be 'reasonable sized chunks to blank out in a cloze exercise', no need to match these cross-language
//The THEME must be one of the theme options in the cloze theme drop-down input.
bi_text_pairs = [
    {zh:[
	["又是,","牙","医界","的","一天"],
	["作为","一名","牙医,","我的","日常","充满了","各种","挑战","胜利","和","大量的","微笑"],
	["这是","一个","要求","精确、","同情心","和","一丝","艺术","的","职业"],
	["所以,","让","我","带","你们","走进","我","牙医","世界","的","一个","典型","日子"],
	["早晨","到来,","办公室","充满了","期待"],
	["病人们","陆续","进来,","有些","带着","忧虑","的","表情,","有些","带着","一丝","希望。"],
	["他们","的","口腔","健康","是","我的","责任，","我","对此","充满","敬意。"],
	["我","首先","会","查看","当天","的","日程","安排，","确保","每个","预约","都","得到","应有的","关注。"],
	["从","例行","的","洁牙","到","复杂的","手术，","每个","病人","都有","独特","的","需求","和","关切。"],
	["仔细","聆听","是","至关重要的，","让","他们","放心","并","解决","他们","的","恐惧。"],
	["当","第一个","病人","坐到","牙医","椅","上","时，","我","开始","进行","检查。"],
	["我","可靠","的","工具","成为","我","手","的","延伸，","细致","地","探索","口腔","的","地形。","通过","每一次","探针","和","镜子,","我","发现","需要","关注","的","区域，","识别","出","蛀牙、","牙龈","疾病","或","其他","异常。"],
	["牙医椅","成为","一个","脆弱","的","地方，","但","也是","一个","充满","希望","的","地方。"]
    ],
     eng:[
	 ["Another","day","in","the","world","of","dentistry."],
	["As","a","dentist,","my","daily","life","is","filled","with","various","challenges,","victories,","and","plenty","of","smiles."],
	["It","is","a","profession","that","demands","precision,","empathy,","and","a","touch","of","artistry."],
	["So,","let","me","take","you","through","a","typical","day","in","my","dental","world."],
	["The","morning","arrives,","and","the","office","is","filled","with","anticipation."],
	["Patients","come","in","one","by","one,","some","with","worried","expressions,","others","with","a","glimmer","of","hope."],
    ["Their","oral","health","is","my","responsibility,","and","I","hold","it","with","utmost","respect."],
    ["I","start","by","reviewing","the","day\'s","schedule,","ensuring","that","each","appointment","receives","the","attention","it","deserves."],
	 ["From","routine","cleanings","to","complex","procedures,","each","patient","comes","with","unique","needs","and","concerns."],
    ["Active","listening","is","crucial,","reassuring","them","and","addressing","their","fears."],
    ["When","the","first","patient","sits","in","the","dental","chair,","I","begin","the","examination."],
	 ["My","reliable","tools","become","an","extension","of","my","hand,","delicately","exploring","the","terrain","of","their","mouth."],
    ["Through","every","probe","and","mirror,","I","discover","areas","that","require","attention,","identifying","cavities,","gum","diseases,","or","other","abnormalities."],
    ["The","dental","chair","becomes","a","vulnerable","place","but","also","a","place","filled","with","hope"]
     ],
theme:"medical"
},
    
{
    zh:[
    ["有", "一只", "小山羊", "走丢","了"],
    ["它", "离开","了", "它的", "家，", "迷路了"],
    ["小山羊", "感到", "非常", "害怕", "和", "孤单"],
    ["幸运的是", "一位", "好心的", "农夫", "发现了", "它"],
    ["农夫", "带着", "小山羊", "回到了", "它的", "家"],
    ["小山羊", "和", "它的", "家人", "团聚了"],
    ["它们", "都", "非常", "高兴，", "庆祝着", "团圆"],
    ["小山羊", "再也", "不会", "迷路了"],
    ["它", "学会了", "留在", "家人","附近"],
    ["这是", "一个", "快乐的", "结局。"]
],
    eng:[
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
    ],
    theme:"goats"
}
]// array of all stories

function get_bilang_text_obj(theme){
    if(theme=="rnd" || arguments.length==0){
	return(shuffle(bi_text_pairs)[0])
    }else{
	function theme_match(myobj){
	    return myobj.theme==theme
	}
	return(shuffle(bi_text_pairs.filter(theme_match))[0])
    }
}
