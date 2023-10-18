//assumes the existence of shuffle and global var targ_language taking values eng or zh
eng_monologue_library = [
[
  "Are you tired of unhealthy fast food?",
  "Introducing the revolutionary Super Salad Maker!",
  "With our Super Salad Maker, you can create delicious and nutritious salads in minutes!",
  "Just imagine having a fresh and satisfying salad whenever you want.",
  "Our Super Salad Maker is equipped with state-of-the-art slicing and dicing technology.",
  "Chop up your favorite vegetables in seconds with the press of a button.",
  "No more tedious cutting and chopping by hand!",
  "But wait, there's more!",
  "The Super Salad Maker also comes with a variety of salad dressing dispensers.",
  "Choose from a range of flavors to add the perfect finishing touch to your salad.",
  "From tangy vinaigrettes to creamy ranch, we've got you covered.",
  "And clean-up is a breeze!",
  "The Super Salad Maker's parts are dishwasher safe, saving you time and effort.",
  "Say goodbye to the hassle of preparing salads and hello to a healthier lifestyle!",
  "But don't just take our word for it - listen to what our satisfied customers have to say:",
  "Customer 1: 'I used to dread making salads, but the Super Salad Maker has changed everything. It's so easy and convenient!'",
  "Customer 2: 'I've never had such fresh and crisp salads before. This machine is a game-changer!'",
  "Don't miss out on this incredible offer!",
  "Order your Super Salad Maker today and take the first step towards a healthier you!",
  "Operators are standing by, so call now!"
],    
    ["I understand that you've been bitten by a snake, and I want to assure you that we're here to help.",
  "Snakebites can be serious, but with prompt medical attention, the chances of a full recovery are high.",
  "The first step in your treatment is to keep calm and try to immobilize the affected limb.",
  "This will help slow down the spread of venom in your body.",
  "We'll assess the severity of the bite and identify the specific snake species, if possible.",
  "This information is crucial in determining the appropriate treatment.",
  "In most cases, we'll administer antivenom, which is a specialized medication that counteracts the snake's venom.",
  "Antivenom helps neutralize the toxins and prevent further damage.",
  "We'll closely monitor your vital signs and the progression of symptoms.",
  "It's essential to stay at the hospital for observation and ensure your safety.",
  "During your treatment, we'll provide supportive care to manage any complications or symptoms that may arise.",
  "This can include pain management, wound care, and the administration of intravenous fluids.",
  "In some cases, additional treatments like antibiotics may be necessary to prevent infection.",
  "We understand that snakebites can be emotionally distressing, so we have a team of counselors available to provide support.",
  "Once you're stable and showing signs of improvement, we'll discuss your ongoing care and any necessary follow-up appointments.",
  "Recovery from a snakebite can take time, and we'll be with you every step of the way to ensure your well-being.",
  "Remember, it's crucial to avoid attempting any home remedies or applying tourniquets on your own.",
  "These actions can worsen the situation and delay appropriate medical treatment.",
  "You've taken the right step by seeking medical help promptly, and together, we'll work towards your recovery."
]

    ]//end library

zh_monologue_library = [
[
  "您被蛇咬伤了，我想向您保证我们会尽力帮助您。",
  "蛇咬伤可能很严重，但只要及时就医，完全康复的机会是很高的。",
  "治疗的第一步是保持冷静，尽量固定受伤的肢体。",
  "这有助于减缓毒液在体内的传播。",
  "我们将评估咬伤的严重程度，并尽可能确定蛇的种类。",
  "这些信息对确定适当的治疗非常重要。",
  "在大多数情况下，我们会给您注射抗蛇毒血清，这是一种专门对抗蛇毒的药物。",
  "抗蛇毒血清有助于中和毒素，防止进一步的伤害。",
  "我们将密切监测您的生命体征和症状的进展。",
  "住院观察是必要的，以确保您的安全。",
  "在治疗过程中，我们将提供支持性护理，以处理可能出现的并发症或症状。",
  "这可能包括疼痛管理、伤口护理和静脉输液。",
  "在某些情况下，可能需要额外的治疗，如抗生素，以预防感染。",
  "我们知道蛇咬伤可能会给您带来情绪上的困扰，因此我们有专门的辅导员团队为您提供支持。",
  "一旦您的情况稳定并显示出好转的迹象，我们将讨论您的持续护理和任何必要的后续预约。",
  "从蛇咬伤中康复需要时间，我们将全程陪伴您，确保您的健康。",
  "请记住，切勿尝试任何家庭疗法或自行使用止血带。",
  "这些做法可能会加重情况，延误适当的医疗治疗。",
  "您及时寻求医疗帮助是正确的选择，我们将共同努力，帮助您康复。"
]

]

function get_monologue(n_items){
    console.log("hi")
    candidate_list = [];
    while(candidate_list.length < n_items){
	candidate_list = candidate_list.concat(shuffle(targ_lang == "eng" ? eng_monologue_library : zh_monologue_library)[0])
	console.log("looping");
    }
    console.log("cd")
    return(
	candidate_list.slice(0,n_items)
    )
}
