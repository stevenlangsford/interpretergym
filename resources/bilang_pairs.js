//rules for being a valid bilingual-text object:
//Be a javascript object
//have fields zh, eng, theme, and name
//zh and eng must be an array of sentences, where a 'sentence' is an array of words.
//The SENTENCES must be aligned chunks: same number of 'em, same order, reasonably-close to the same meaning over the whole sentence.
//The WORDS must be 'reasonable sized chunks to blank out in a cloze exercise', no need to match these cross-language
//The THEME must be one of the theme options in the cloze theme drop-down input.
//NAME should be unique


//template:
//{zh:[],
// eng:[],
// theme:"blank_theme",
//name:"blank_name"}

const bi_text_pairs = [
    {zh:[["下午","好，","约翰","先生。","您","今天","有","什么","问题","需要","咨询？"],["您好，","医生。","我","非常","担心","我","手臂","上","的","这个","斑点。","我","读","了","一些","关于","皮肤癌","症状","的","资料，","我","觉得","可能","是","一种","严重","的","情况。"],["我","理解","您","的","担忧，","约翰","先生。","让","我","来","看看。","嗯，","根据","我","的","检查，","这个","斑点","看起来","是","良性","痣。","没有","显示","出","任何","令人担忧","的","皮肤","癌症","症状。"],["医生，","您","确定","吗？","我","已经","担心","了","几个","星期","了。","在我看来，","它","看起来","并","不","正常。"],["我","完全","理解","您","的","焦虑，","约翰","先生。","然而，","我","接受","了","识别","潜在","皮肤","癌症","病例","的","训练，","在","这种","情况","下，","我","确信","是","不太可能","的。","该","斑点","的","特征","更","符合","无害","痣","的","特点。","不过，","如果","您","希望","绝对","确定，","我","可以","安排","进行","活检。"],["活检？","那","不是","侵入","性","的","吗？","我","不","确定","是否","愿意","接受","那个。"],["我","完全","理解","您","的","犹豫，","约翰","先生。","活检","是","一种","更为","确切","的","检测","方法，","但","考虑","到","该","斑点","的","外观","和","我","的","专业知识，","我","真的","认为","是","不必要","的。","然而，","如果","这能","给","您","带来","安心，","我们","可以","进一步","讨论","这个","程序，","并","解答","您","可能","有","的","任何","疑虑。"],["谢谢您，","医生。","我","感谢您","的","细致","和","理解。","我会","相信","您","的","专业","意见，","尽量","不过","多","担心。"],["听到","这个","很","好，","约翰","先生。","请","记住，","如果","您","有","任何","新","的","或","令人担忧","的","症状，","请","随时","联系","我。","我","在","这里","支持","您，","确保","您","的","健康。"]],eng:[["Good","afternoon, ","Mr. ","Johnson. ","How","can","I","help","you","today?"],["Hi, ","Doctor. ","I'","m","really","concerned","about","this","spot","on","my","arm. ","I'","ve","been","reading","about","skin","cancer","symptoms, ","and","I","think","it","might","be","something","serious."],["I","understand","your","concerns, ","Mr. ","Johnson. ","Let'","s","take","a","look","at","it. ","Hmm, ","based","on","my","examination, ","the","spot","appears","to","be","a","benign","mole. ","It","doesn'","t","exhibit","any","concerning","signs","of","skin","cancer."],["Are","you","sure, ","Doctor? ","I'","ve","been","worrying","about","it","for","weeks","now. ","It","just","doesn'","t","look","right","to","me."],["I","completely","understand","your","anxiety, ","Mr. ","Johnson. ","However, ","I'","ve","been","trained","to","identify","potential","skin","cancer","cases, ","and","in","this","instance, ","I'","m","confident","that","it'","s","unlikely. ","The","characteristics","of","the","spot","align","more","with","a","harmless","mole. ","Nonetheless, ","I","can","order","a","biopsy","if","you'","d","like","to","be","absolutely","certain."],["A","biopsy? ","Isn'","t","that","invasive? ","I'","m","not","sure","if","I","want","to","go","through","that."],["I","completely","understand","your","hesitation, ","Mr. ","Johnson. ","A","biopsy","is","a","more","definitive","test, ","but","given","the","appearance","of","the","spot","and","my","expertise, ","I","genuinely","believe","it'","s","unnecessary. ","However, ","if","it","would","provide","you","with","peace","of","mind, ","we","can","discuss","the","procedure","further","and","address","any","concerns","you","may","have."],["Thank","you, ","Doctor. ","I","appreciate","your","thoroughness","and","understanding. ","I'","ll","trust","your","professional","opinion","and","try","not","to","worry","too","much."],["That'","s","great","to","hear, ","Mr. ","Johnson. ","Remember, ","if","you","have","any","new","or","concerning","symptoms, ","don'","t","hesitate","to","reach","out. ","I'","m","here","to","support","you","and","ensure","your","well-","being."]],theme:"NEW"},
   
    {zh:[
    ["早上好。","我","是","李医生。","您","来","看病","有","什么","不舒服","吗？"],
    ["早上好，","医生。","我","最近","感觉","头晕、","心跳","加快，","有","些","疲倦。"],
    ["好的，","这","些","症状","可能","与","血压","有","关。","您","有","家族","中","有","高","血压","的","病史","吗？"],
    ["我","父母","中","没有","高","血压，","但","我","没有","做过","相关","的","检查。"],
    ["明白","了。","鉴于","您","的","症状，","我","建议","您","先","测量","一下","血压，","并","进行","一些","进","一步","的","检查，","以", "确诊","是否","存在","血压","问题。","同时，","建议","您","控制","一下","饮食，","减少","盐分","的","摄入","并","适量","增加","运动。"],
    ["好的，","我","会","按照","您","的","建议","去","做","的。","谢谢","医生！"],
    ["不","用","客气，","保持","良好","的","生活","习惯","对","您","的","健康","至关","重要。","我","会","开","一份","检查单，","您","可以","到","附近","的","医院","进行","检查。","如果","有","任何","问题，","请","随时","与","我","联系。","祝","您","早日","恢复！"]
],
eng:[
    ["Good", "morning.","I'm,", "Dr.", "Li.", "Are", "you", "feeling", "some", "discomfort?"],
    ["Good", "morning", "Doctor.", "Lately,", "I've", "been", "feeling", "dizzy", "with", "a", "faster", "heartbeat,","and", "some", "fatigue."],
    ["Alright,", "these", "symptoms", "could", "be", "related", "to", "blood", "pressure.", "Do", "you", "have", "a", "family", "history", "of", "high", "blood", "pressure?"],
    ["My","parents", "don't", "have", "high", "blood", "pressure,", "but", "I", "haven't", "had", "any", "relevant", "tests", "done."],
    ["Understood.", "Given", "your", "symptoms,", "I", "suggest", "measuring", "your", "blood", "pressure", "first", "and", "conducting", "further", "tests", "to", "confirm", "if", "there's", "a", "blood", "pressure", "issue.", "Meanwhile,", "I", "recommend", "controlling", "your", "diet,", "reducing", "salt", "intake,", "and", "undertaking", "moderate", "exercise."],
    ["Okay,", "I", "will", "follow", "your", "advice.", "Thank", "you,", "Doctor!"],
    ["You're", "welcome.", "Maintaining", "healthy","habits", "is", "crucial", "for", "your", "wellbeing.", "I'll", "provide", "you", "with","a","referral", "letter", "so", "you", "can", "get", "the", "necessary", "tests", "done", "at", "a", "nearby", "hospital.", "Feel", "free", "to", "reach", "out", "if", "you", "have", "any", "questions.", "Wishing", "you", "a", "speedy", "recovery!"]
],
 theme:"medical",
 name:"basic_blood_pressure"},
    {zh:[
	["又是,","牙医界","的","一天"],
	["作为","一名","牙医,","我的","日常","充满了","各种","挑战","胜利","和","大量的","微笑"],
	["这是","一个","要求","精确、","同情心","和","一丝","艺术","的","职业"],
	["所以,","让","我","带","你们","走进","我","牙医","世界","的","一个","典型","日子"],
	["早晨","到来,","办公室","充满","了","期待"],
	["病人们","陆续","进来,","有些","带着","忧虑","的","表情,","有些","带着","一丝","希望。"],
	["他们","的","口腔","健康","是","我的","责任，","我","对此","充满","敬意。"],
	["我","首先","会","查看","当天","的","日程","安排，","确保","每个","预约","都","得到","应有的","关注。"],
	["从","例行","的","洁牙","到","复杂的","手术，","每个","病人","都有","独特","的","需求","和","关切。"],
	["仔细","聆听","是","至关重要的，","让","他们","放心","并","解决","他们","的","恐惧。"],
	["当","第一个","顾客","坐到","牙医","椅","上","时，","我","开始","进行","检查。"],
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
	 ["When","the","first","client","sits","in","the","dental","chair,","I","begin","the","examination."],
	 ["My","reliable","tools","become","an","extension","of","my","hand,","delicately","exploring","the","terrain","of","their","mouth."],
	 ["Through","every","probe","and","mirror,","I","discover","areas","that","require","attention,","identifying","cavities,","gum","diseases,","or","other","abnormalities."],
	 ["The","dental","chair","becomes","a","vulnerable","place","but","also","a","place","filled","with","hope"]
     ],
     theme:"medical",
     name:"dentist_day"
    },
    
    {
	zh:[
	    ["有", "一只", "小山羊", "走丢","了"],
	    ["幸运的是", "一位", "好心的", "农夫", "找到","了", "它"],
	    ["农夫", "带着", "小山羊", "回到了", "它的", "家"],
	    ["它们", "都", "非常", "高兴，", "庆祝着", "团圆"],
	    ["这","是", "一个", "快乐的", "结局。"]
	],
	eng:[
	    ["Once", "upon", "a", "time,", "a", "little", "goat", "got", "lost."],
	    ["Luckily,", "a", "kind", "farmer", "found", "it."],
	    ["The", "farmer", "brought", "the", "little", "goat", "back", "to", "its", "home."],
	    ["They", "were", "all", "very", "happy", "and", "celebrated", "their", "reunion."],
	    ["And", "they", "all", "lived", "happily", "ever", "after."]
	],
	theme:"goats",
	name:"lost_goat"
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
