

// resources
const $footer = $("<div>").addClass("footer");
const $battlemap = $(".battle");
let charArray = [];
let heroList = [];

let atkselector = "";

//## Skill Buttons
const $beamButton = $("<button>")
  .addClass("beamButtonClass")
  .attr("id", "beamButtonId")
  .attr("name", "beam");
const $missileButton = $("<button>")
  .addClass("missileButtonClass")
  .attr("id", "missileButtonId")
  .attr("name", "missile");

//### skills ####
const battle = (event) => {
 //   console.log("atkselector", atkselector)
  let execute = attack[atkselector];
  execute(event);
};

const attack = {
  beam: (event) => {
    let v = $(event.target).attr("name");
    characters[v].hp -= characters.ironman.atk; //need extra work
    console.log(characters[v]);
  },

  missile: () => {
    for (const x in charArray) {
      x.hp -= 1;
      console.log(characters[x]);
    }
    console.log(characters[x]);
  },

  hammer: (event) => {
    let v = $(event.target).attr("name");
    characters[v].hp -= characters.thor.atk;
  },

  lightning: (event) => {
    let v = $(event.target).attr("name");
    characters[v].hp -= characters.thor.atk;
  },

  smash: (event) => {
    let v = $(event.target).attr("name");
    characters[v].hp -= characters.hulk.atk;
  },

  toss: (event) => {
    let v = $(event.target).attr("name");
    characters[v].hp -= characters.hulk.atk;
  },
};

//### End Of Skills ####

//Creating game characters
const hero = {
  ironman: {
    type: "hero",
    name: "ironman",
    level: 1,
    spd: 11,
    hp: 100,
    atk: 20,
    atkgrowth: 12,
    hpgrowth: 15,
    pic: $("<img>").attr("id", "ironmanId").addClass("ironmanClass"),
    sequence:()=>{  $beamButton.appendTo($footer);
    $missileButton.appendTo($footer);
    $footer.appendTo($battlemap);}
    
  },
  thor: {
    type: "hero",
    name: "thor",
    level: 1,
    spd: 9,
    hp: 140,
    atk: 15,
    atkgrowth: 8,
    hpgrowth: 25,
  },
  hulk: {
    type: "hero",
    name: "hulk",
    level: 1,
    spd: 10,
    hp: 200,
    atk: 15,
    atkgrowth: 6,
    hpgrowth: 35,
  }//,
//   hand: {
//     type: "villain",
//     name: "hand",
//     level: 1,
//     speed: 9,
//     hp: 150,
//     atk: 15,
//     atkgrowth: 1,
//     hpgrowth: 1,
//     exp: 30,
//     pic: $("<img>")
//       .addClass("handClass")
//       .attr("id", "handId")
//       .attr("name", "hand"),
//   },
//   goon: {
//     type: "villain",
//     name: "goon",
//     level: 2,
//     speed: 8,
//     hp: 110,
//     atk: 25,
//     atkgrowth: 1,
//     hpgrowth: 1,
//     exp: 50,
//   },
//   thanos: {
//     type: "villain",
//     name: "thanos",
//     level: 5,
//     speed: 5,
//     hp: 1200,
//     atk: 50,
//     atkgrowth: 1,
//     hpgrowth: 1,
//     exp: 200,
//   },
};

for (const char in characters) {
  characters[char]["atk"] +=
    characters[char]["atkgrowth"] * characters[char]["level"];
  characters[char].hp += characters[char].hpgrowth * characters[char].level;
}

//## characters resource ##

const $ironMan = characters.ironman.pic;

//characters resource
// const $hand = $("<img>")
//   .addClass("handClass")
//   .attr("id", "handId")
//   .attr("name", "hand");

//######### GAME START ###################
const gameStart = () => {
  $("#Start").hide("slow");

  // playSound();
  // play background story();
  setTimeout(battleStage1, 500);
};

// ### Creating Stages ####

const loadStage1 =()=> {
$(".battle").show("slow");
let hero1 = "ironman" // from function
let heroteam = null
let villteam = null
let spdArr =[]

const charSet = {
hand : { name:'hand', type: 'villain', Hp: 100, atk: 15, spd : 5, alive: true, skill: slash(), pic:$("<img>")
.addClass("handClass")
.attr("id", "handId")
.attr("name", "hand")},

hero1:{ name: hero[hero1].name, type: hero[hero1].type , Hp: hero[hero1].hp, atk: hero[hero1].atk, spd: hero[hero1].spd, alive: true, pic:hero[hero1].pic},
}

stageSetUp();

for (let round = 1; round <= 5; round++) {
for (const character of spdArr) {
    if (charSet[character].type=='hero'){
        hero[character].sequence()
    }
}
}
}





const battleStage1 = () => {
  charArray = [];
  $(".battle").show("slow");
  createTurnArray(["ironman", "hand"]);
  drawChar();
  //while loop
  battleSequence();

  for (const element of charArray) {
    if (element.type && element.type == "villain") {
      $(`.${element.name}Class`).on("click", battle);
    } //select atk target
  }
};

const drawChar = () => {
  for (const object of charArray) {
    object["pic"].appendTo($battlemap);
  }
  //   $ironMan.appendTo($battlemap);
  //   $hand.appendTo($battlemap);
};

const createTurnArray = (char) => {
  for (const x of char) {
    charArray.push(characters[x]);
    if (characters[x].type == "hero") {
      heroList.push(characters[x]);
    }
  }
  const sortedChar = charArray.sort((a, b) => {
    return b["speed"] - a["speed"];
  });
  console.log(charArray);
  console.log(heroList);
};

const battleSequence = () => {
  // while ()
  ironmanAtkSequence();
  // loop thru char, based on speed, append
  //  if type == hero, append footer
};

const ironmanAtkSequence = () => {
  $beamButton.appendTo($footer);
  $missileButton.appendTo($footer);
  $footer.appendTo($battlemap);
};



// loadCharTurn();
//  while (sumOf(heroHP)>0||sumOf(villHP)>0){}
//determine which character turn to load
//clear previous button & create new skill button in footer
//listen for skill button click
//select target, apply s



//####################
// GAME FUNCTIONS
//####################

const stageSetUp =()=>{
    for (const x in charSet) {
if (x.type === 'villain') {
    villteam += x.hp
}
else { heroteam += x.hp}

if(x.alive===true)
SpdArr.push({[x.name] : [x.spd]})
SpdArr.sort((a,b)=> b.spd-a.spd)
}

if (villteam < 1) { alert('win')};
if(heroteam < 1 ) (alert('lose'));
}

//############################
//Webpage onload Functions
//############################

const skillButtons = () => {
    $beamButton.on("click", funcAtkSelector);
    $missileButton.on("click", funcAtkSelector);
  };
  
  const funcAtkSelector = (event) => {
    atkselector = $(event.target).attr("name");
    console.log(atkselector);
    return atkselector;
  };
  

const playSound = () => {
  document.getElementById("StartTheme").play();
};

const main = () => {
  skillButtons();
};

$(() => {
  main();
  $("#startbutton").on("click", gameStart);
});
