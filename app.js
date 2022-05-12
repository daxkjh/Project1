
// resources
const $footer = $("<div>").addClass("footer");
$footer.appendTo('#gameContainer')
//const $battlemap = $(".battle");
//const $battlemap = $('<div>').addClass('battle').attr('id','battlemap')
//$footer.appendTo($battlemap)

let win = 'hero'
let heroList = [];
let spdArr = [];
let heroteam = 0;
let villteam = 0;
let index = 0;
let atkselector = "";
let turn = null
let currentStage = 0
let stage1clear = false;
let stage2clear = false;
let stage3clear = false;
let stage4clear = false;



//#####################
// Game Hero Resource
//#####################
//Creating game hero
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
      pic: $("<img>").attr("id", "ironmanId").addClass("ironmanClass").addClass('allCharacters'),
      sequence: () => {
        $footer.show()
        $beamButton.appendTo($footer);
        $missileButton.appendTo($footer);
        ;
      },
      sequenceOut: ()=> {$beamButton.detach();
                        $missileButton.detach();},

      reset: ()=>{$('.ironmanClass').remove()}
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
    }
    
}

const villainHP = {
    hand:{hp:100},
    goon:{hp:150}
}

//############################
//     Stage Character Load
//###########################
let hero1 = "ironman"; // from function

const charSet1 = {
    hand: {
      name: "hand",
      type: "villain",
      hp: villainHP.hand.hp,
      atk: 15,
      spd: 5,
      alive: true,
      image: $("<img>")
        .addClass("handClass")
        .addClass('allCharacters')
        .attr("id", "handId")
        .attr("name", "hand")
    },
    ironman : {
      name: hero[hero1].name,
      type: hero[hero1].type,
      hp: hero[hero1].hp,
      atk: hero[hero1].atk,
      spd: hero[hero1].spd,
      alive: true,
      image: hero[hero1].pic,
      
    }
}

////////////////////////////////////////////
///#### Villain skills
// ######################################
const villain ={
hand : {
    skill1: (targetHero)=> {
    //console.log(targetHero)
    targetHero.hp-=50
    if(targetHero.hp<1){
        targetHero.alive=false
    }
    console.log(targetHero)
},

skill2: (targetHero)=> {
    //console.log(targetHero)
    targetHero.hp-=20
    if(targetHero.hp<1){
        targetHero.alive=false
    }
    console.log(targetHero)
}
}
}







//#################################
  //###### skills #######
 //#############################

  const battle = (event) => {
    //   console.log("atkselector", atkselector)
    if(turn == true){
    
    let execute = attack[atkselector];
    execute(event);
    $('.atkButton').remove()
    let allVill = spdArr.filter(element=>element.type == 'villain')
    let allVillDead = allVill.every(element=>element.alive==false)
    if (allVillDead == true){
        win='hero'
        alert ('win')
        resolveWin()
        resetMap()
        $('.atkButton').remove();
    }else if(index<spdArr.length-1){
     index++   
    } else {
        index = 0
    }
    battleStart()
    turn = false
  };} 
  
  const attack = {
    beam: (event) => {
      let v = $(event.target).attr("name");
      
       let enemy = spdArr.find(element => element.name==v)
        enemy.hp -= hero.ironman.atk;
        if(enemy.hp<1){
            enemy.alive = false
        } 
        console.log(spdArr)
    },
  
    missile: () => {
      for (const x in charSet1) {
          if(charSet1[x].type=='villain'){
        charSet1[x].hp -= 1;
        console.log(charSet1[x]);
      }
    }},
}
   



















//## Skill Buttons
const $beamButton = $("<button>")
  .addClass("beamButtonClass")
  .addClass('atkButton')
  .attr("id", "beamButtonId")
  .attr("name", "beam");
const $missileButton = $("<button>")
  .addClass("missileButtonClass")
  .addClass('atkButton')
  .attr("id", "missileButtonId")
  .attr("name", "missile");




//###############
/// LEVEL UP
//################
for (const char in hero) {
  hero[char]["atk"] += hero[char]["atkgrowth"] * hero[char]["level"];
  hero[char].hp += hero[char].hpgrowth * hero[char].level;
}



//######### GAME START ###################
const gameStart = () => {
  $("#Start").slideToggle('slow');

  // playSound();
 
  setTimeout(stageSelect, 700);
};

///////////////////////////////////////
// ### Creating Stages Functions ####
/////////////////////////////////////

const stageSelect=()=>{
    checkStageUnlock()
    $('#stageSelectId').slideToggle('slow')
    
};

const loadStage1 = () => {
    resetMap()
   
const $battlemap = $('<div>').addClass('battle').attr('id','battlemap')
$battlemap.appendTo('#gameContainer')
//$('#stageSelectId').slideToggle()
$battlemap.slideToggle('slow')
  drawChar(charSet1);
  staging(charSet1);
  battleStart();
  attackTarget();
  
};


//####################
// GAME FUNCTIONS
//####################

const drawChar = (obj) => {
  for (const a in obj) {
    let $characterPic = obj[a].image;
    // console.log('$character', $characterPic)
    // console.log('$battlemap', $battlemap);
    $characterPic.appendTo('#battlemap');
      }
  }

const staging = (obj)=>{
for (const item in obj){
spdArr.push(obj[item])
}
spdArr.sort((a,b)=> { 
   return b.spd - a.spd
})
console.log(spdArr)
}


const resolveWin = ()=>{
if (win == 'hero'){
    $('#gameSummaryId').attr('src','/pictures/Background/vic.gif')
    $('#gameSummaryId').show()
    setTimeout(()=>{$('#gameSummaryId').hide()},1000)
    setTimeout(stageSelect, 3000)
} else {
    stageSelect()
}
}



const resetMap = ()=>{
   $('.allCharacters').remove();
   $('.battle').remove()
   $footer.hide();
    heroList = [];
 spdArr = [];
 heroteam = 0;
 villteam = 0;
 index = 0;
 atkselector = "";
 turn = null

}



//########################################
//#####                               ####
//#####       Main Battle Function    ####
//#####                               ####
//########################################

const battleStart = () => {
   
  if(spdArr[index].alive==false) {
      if (index<spdArr.length-1) {
        index++;
        battleStart()
        } else {
            index = 0;
            battleStart()
        }}
else if (spdArr[index].alive==true ) {
            if (spdArr[index].type=='hero') {
                let x = spdArr[index].name;
                $('.atkButton').remove()
                atkselector=''
                hero[x].sequence()//load footer, load button
                skillButtons()//open selection
                turn = true

            } else {
                $footer.hide()
               
              // generating random alive hero target
                let aliveHero = []
                spdArr.forEach((element,index2)=>{
                    if(element.type=='hero'){ aliveHero.push(index2)}    
                })

                let num = Math.floor(Math.random()*aliveHero.length)
                let targetHero = spdArr[aliveHero[num]]
                let villName = spdArr[index].name
                let randomAtk = Math.ceil(Math.random()*2)
                if(randomAtk==1){
                setTimeout(()=>{villain[villName].skill1(targetHero)},2000)
                } else {
                    setTimeout(()=>{villain[villName].skill2(targetHero)},2000)
                }
                let allHero = spdArr.filter(element=> element.type=='hero' && element.alive==true)
                if (allHero.length<1){
                    win='villain'
                    alert ('you lost')
                    resolveWin();
                    resetMap();
                   // location.reload();
                }else if(index<spdArr.length-1){
                index++
                } else{
                    index = 0
                }
                if(allHero.length>0){
                setTimeout(()=>{battleStart()},3000)
                }
            }
}
};

const attackTarget =()=>{ // listener for villian to be clicked
    for (const x in charSet1) {
        if (charSet1[x].type == "villain") {
          $(`.${x}Class`).on("click", battle);
        } //select atk target
      }
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
const checkStageUnlock =()=>{
    if (stage1clear === true){
        $('#stage2').removeClass('locked');
    }
}

const playSound = () => {
  document.getElementById("StartTheme").play();
};

const main = () => {
  skillButtons();
  $('#stage1').on('click', (()=>{stageSelect();setTimeout(loadStage1,700)}))
  checkStageUnlock()
};

$(() => {
  main();
  $("#startbutton").on("click", gameStart);
});
