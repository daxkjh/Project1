// resources
const $footer = $("<div>").addClass("footer");
$footer.appendTo("#gameContainer");
//const $battlemap = $(".battle");
//const $battlemap = $('<div>').addClass('battle').attr('id','battlemap')
//$footer.appendTo($battlemap)

let win = "";
let heroList = [];
let spdArr = [];
let heroteam = 0;
let villteam = 0;
let index = 0;
let atkselector = "";
let turn = null;
let currentStage = 0;
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
    hpmax:100,
    atk: 20, 
    atkgrowth: 12,
    hpgrowth: 15,
    pic: $("<div>")
      .attr("id", "ironmanId")
      .addClass("ironmanClass")
      .addClass("bounce-1")
      .addClass("allCharacters"),
    sequence: () => {
      $footer.show();
      $beamButton.appendTo($footer);
      $missileButton.appendTo($footer);
    },
 
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
  },
};

//###############
/// LEVEL UP
//################
for (const char in hero) {
  hero[char]["atk"] += hero[char]["atkgrowth"] * hero[char]["level"];
  hero[char].hp += hero[char].hpgrowth * hero[char].level;
  hero[char].hpmax += hero[char].hpgrowth * hero[char].level;
}

//############################
//     Stage Character Load
//###########################
let hero1 = "ironman"; // from function

const charSet1 = {
  hand: {
    name: "hand",
    type: "villain",
    hp: 100,
    hpmax:100,
    atk: 15,
    spd: 5,
    alive: true,
    image: $("<div>")
      .addClass("handClass")
      .addClass('bounce-2')
      .addClass("allCharacters")
      .attr("id", "handId")
      .attr("name", "hand"),
  },
  ironman: {
    name: hero[hero1].name,
    type: hero[hero1].type,
    hp: hero[hero1].hp,
    hpmax:hero[hero1].hp,
    atk: hero[hero1].atk,
    spd: hero[hero1].spd,
    alive: true,
    image: hero[hero1].pic,
  },
};

////////////////////////////////////////////
///#### Villain skills
// ######################################
const villain = {
  hand: {
    skill1: (targetHero) => {
      //console.log(targetHero)
      targetHero.hp -= 50;
     // gettingHit()
      if (targetHero.hp < 1) {
        targetHero.alive = false;
      }
      //css portion
      const $handslash = $('<img>').addClass("handslash").attr('src',"/pictures/Characters/TheHand/actual/hand1.gif")
      $('.handClass').slideToggle()
      setTimeout(()=>{$handslash.appendTo($(`#${targetHero.name}Id`))
      console.log(targetHero.name)
    },600)
    setTimeout(()=>{
      $(`.${targetHero.name}bar`).css('width',`${(targetHero.hp/targetHero.hpmax*100)}%`)
      playHitSprite(targetHero.name)
    },1000)
      setTimeout(()=>{
       $('.handslash').remove()
      $('.handClass').slideToggle('slow')
        
    },1600)
      
      console.log("hand Atk1! targetHerohp:", targetHero.hp);
    },

    skill2: (targetHero) => {
      
      targetHero.hp -= 20;
      //gettingHit()
      if (targetHero.hp < 1) {
        targetHero.alive = false;
      }
      //css portion
      $('.handClass').removeClass('bounce-2')
      $('.handClass').css({"transform":"translateX(-500px)"})
      const $hand2 = $('<img>').addClass('handCut').attr('src','/pictures/Characters/TheHand/actual/hand2.gif')
      $hand2.appendTo($('#handId'))
      playHitSprite(targetHero.name)
      setTimeout(()=>{
        $hand2.remove()
        $('.handClass').css("transform","translateX(500px)")
        $('.handClass').addClass('bounce-2')
      }, 800)
      $(`.${targetHero.name}bar`).css('width',`${(targetHero.hp/targetHero.hpmax*100)}%`)
     
      console.log("hand Atk2! targetHerohp:", targetHero.hp);
    },
  },
};

//#################################
//###### Hero skills #######
//#############################

const battle = (event) => {
  //   console.log("atkselector", atkselector)
  if (turn == true) {
    let execute = attack[atkselector];
    execute(event);
    $(".atkButton").remove();
    let allVill = spdArr.filter((element) => element.type == "villain");
    let allVillDead = allVill.every((element) => element.alive == false);
    if (allVillDead == true) {
      win = "hero";
      // alert ('win')
      resolveWin();
     setTimeout(()=>{
        resetMap();
      $(".atkButton").remove();},2000)
      // return spdArr
    } else if (index < spdArr.length - 1) {
      index++;
      battleStart();
    } else {
      index = 0;
      battleStart();
    }

    turn = false;
  }
};

const attack = {
  beam: (event) => {
    let v = $(event.target).attr("name");
    //console.log('v =', v)
    let enemy = spdArr.find((element) => element.name == v);
    enemy.hp -= hero.ironman.atk;

    //css portion
    setTimeout(()=>{ $('#ironmanId').addClass('ironmanbeamfinal')},500)
    setTimeout(()=>{
      playHitSprite(v)
    $('<img>').addClass('beamgif').attr('src','/pictures/Characters/ironmanbeam.gif').appendTo($('#ironmanId'))
    $(`.${v}bar`).css('width',`${(enemy.hp/enemy.hpmax*100)}%`)
    } , 500)
    setTimeout(()=>{
        $('.beamgif').remove()
       $('#ironmanId').removeClass('ironmanbeamfinal');
    }, 1000)
    if (enemy.hp < 1) {
      enemy.alive = false;
    }
    console.log(enemy.hp);
  },

  missile: () => {
    for (const x of spdArr) {
      if ( x.type == "villain") {
        x.hp -= 20;
        let v = x.name;
        setTimeout(()=>{
          $(`.${x.name}bar`).css('width',`${(x.hp/x.hpmax*100)}%`)
          playHitSprite(v)
        } , 500)
        if (x.hp < 1) {
          x.alive = false;
        }
        console.log(x.hp);
      }
    }
  },
};

//## Skill Buttons
const $beamButton = $("<button>")
  .addClass("beamButtonClass")
  .addClass("atkButton")
  .attr("id", "beamButtonId")
  .attr("name", "beam");
const $missileButton = $("<button>")
  .addClass("missileButtonClass")
  .addClass("atkButton")
  .attr("id", "missileButtonId")
  .attr("name", "missile");
const $hammer = $("<button>")
.addClass("hammerButtonClass")
.addClass("atkButton")
.attr("id", "hammerButtonId")
.attr("name", "hammer");
const $thunder = $("<button>")
.addClass("thunderButtonClass")
.addClass("atkButton")
.attr("id", "thunderButtonId")
.attr("name", "thunder");

//######### GAME START ###################
const gameStart = () => {
  $("#Start").slideToggle("slow");

  // playSound();

  setTimeout(stageSelect, 700);
};

///////////////////////////////////////
// ### Creating Stages Functions ####
/////////////////////////////////////

const stageSelect = () => {
  checkStageUnlock();
  $("#stageSelectId").slideToggle("slow");
};

const loadStage1 = () => {
  // console.log("loadStage1 working, charset1 is:", charSet1);
  // console.log("loadStage1 working, ironman in hero is:", hero.ironman);
    resetMap()
    currentStage = 1;
  const $battlemap = $("<div>").addClass("battle").attr("id", "battlemap");
  $battlemap.appendTo("#gameContainer");
  //$('#stageSelectId').slideToggle()
  $battlemap.slideToggle("slow");
  staging(charSet1);
  drawChar(charSet1);
  
  battleStart();
  attackTarget();
};

//####################
// GAME FUNCTIONS
//####################

const drawChar = (obj) => {  // loading characters onto the map
  for (const a in obj) {
    console.log(obj[a])
    let x = 1
    let y = 1
    let $characterPic = obj[a].image;
    if(obj[a].type == 'hero'){
      console.log (obj[a].type)
      let pos = `H${x}`
      let $Hpos = $('<div>').addClass(pos)
      $Hpos.appendTo($('#battlemap'))
      $characterPic.appendTo($Hpos);
      $('<div>').addClass('allCharacters').addClass(`${obj[a].name}HB`).appendTo($characterPic);
      $('<div>').addClass('allCharacters').addClass(`${obj[a].name}bar`).appendTo(`.${obj[a].name}HB`);
      x++
    } 
    else {
      let pos = `V${y}`
      let $Vpos = $('<div>').addClass(pos)
      $Vpos.appendTo($('#battlemap'))
      $characterPic.appendTo($Vpos);
        $('<div>').addClass('allCharacters').addClass(`${obj[a].name}HB`).appendTo($characterPic);
        $('<div>').addClass('allCharacters').addClass(`${obj[a].name}bar`).appendTo(`.${obj[a].name}HB`);
    } 



    console.log("drawChar working");
  }
};

const staging = (obj) => { // to set up the battle field values 
  spdArrPrototype = Object.values(charSet1); // cloning the object so battle wont change the main object values
  spdArr = spdArrPrototype.map((x) => {
    const copiedObject = Object.assign({}, x);
    copiedObject.approved = true;
    return copiedObject;
  });

  spdArr.sort((a, b) => { // setting the array such that faster character goes first
    return b.spd - a.spd;
  });
  console.log("staging running:", spdArr);
};

const resolveWin = () => {
  if (win == "hero") {
      for (let i = 1; i<=5; i++){
        if (currentStage==i){
            $(`#stage${i+1}`).removeClass('locked')
        }}

    $("#gameSummaryId").attr("src", "/pictures/Background/vic.gif");
    setTimeout(() => {
    $("#gameSummaryId").show();
    resetMap();
    }, 2000);
    setTimeout(() => {
      $("#gameSummaryId").hide();
    }, 4000);
    setTimeout(()=>{stageSelect();}, 4000);
    
   // console.log("console.log(spdArr)===>", spdArr);
  } else {
    $("#gameSummaryId").attr("src", "/pictures/Background/defeat.gif");
    setTimeout(() => {
    $("#gameSummaryId").show();
    resetMap();
    }, 2000);
    setTimeout(() => {
      $("#gameSummaryId").hide();
    }, 4000);  
    setTimeout(()=>{stageSelect();}, 4000);
   // console.log("console.log(spdArr)===>", spdArr);
  }
};

const resetMap = () => {
  $(".allCharacters").remove();
  $(".battle").remove();
  $footer.hide();
  heroList = [];
  spdArr = [];
  heroteam = 0;
  villteam = 0;
  index = 0;
  atkselector = "";
  turn = null;
  console.log('map reset!!')
 // win = ''
};

const gettingHit =()=>{
  for(const char of spdArr){
    let spriteToChange = char['name']
    char['hp'].on('change',()=>{playHitSprite(spriteToChange)})
  }
}

const playHitSprite =(name, times = 1, duration = 500)=>{
  for(let i = 0; i< times; i++){
  console.log('playHitSprite is working,  v is' , name)
  let nameHit = `${name}Hit`
  let $nameId = $(`#${name}Id`)
$nameId.addClass(nameHit)
setTimeout(()=>{$nameId.removeClass(nameHit)},duration)
}}

//########################################
//#####                               ####
//#####       Main Battle Function    ####
//#####                               ####
//########################################

const battleStart = () => {
  if (spdArr[index].alive == false) {
    if (index < spdArr.length - 1) {
      index++;
      console.log('line 325')
      battleStart();
    } else {
      index = 0;
      console.log('line 329')
      battleStart();
    }
  } else if (spdArr[index].alive == true) {
    if (spdArr[index].type == "hero") {
      let x = spdArr[index].name;
      $(".atkButton").remove();
      // atkselector=''
      hero[x].sequence(); //load footer, load button
      skillButtons(); //load selection function >>> wait for user click
      turn = true; //allow user to click
    } else {
      //if alive character is not human
      $footer.hide(); //computers turn

      // generating random alive hero target
      let aliveHero = [];
      spdArr.forEach((element, index2) => {
        if (element.type == "hero") {
          aliveHero.push(index2);
        }
      });
      let num = Math.floor(Math.random() * aliveHero.length);
      let targetHero = spdArr[aliveHero[num]];
      let villName = spdArr[index].name;
      let randomAtk = Math.ceil(Math.random() * 2);
      if (randomAtk == 1) {
          if(targetHero.alive == true){
        setTimeout(() => {
          villain[villName].skill1(targetHero);
        }, 2000);
        if (targetHero.hp < 1) {
          targetHero.alive = false;
        }}
      } else {
          if(targetHero.alive == true){
        setTimeout(() => {
          villain[villName].skill2(targetHero);
        }, 2000);
        if (targetHero.hp < 1) {
          targetHero.alive = false;
        }}
      }
      let allHero = spdArr.filter((element) => element.type == "hero");
      console.log('allhero=>',allHero)
      let allHeroDead = allHero.every((element) => {
            return element.alive == false;
      });
      console.log('allherodead is working =>',allHeroDead)
      if (allHeroDead == true) {
        win = "villain";
       // alert("you lost");
        resolveWin();
        //resetMap();
       
      } else if (index < spdArr.length - 1 && allHeroDead==false) {
        index++;
        console.log('line 380 working')
        setTimeout(() => {
          battleStart();
        }, 3000);
      } else {
        if(allHeroDead==false){
        console.log('line 386 working')
        index = 0;
        setTimeout(() => {
          battleStart();
        }, 3000);}
      }
    }
  }
};

const attackTarget = () => {
  // listener for villain to be clicked
  for (const x in charSet1) {
    if (charSet1[x].type == "villain") {
      $(`.${x}Class`).on("click", battle);
    } //select atk target
  }
};

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
const checkStageUnlock = () => {
  if (stage1clear === true) {
    $("#stage2").removeClass("locked");
  }
};

const playSound = () => {
  document.getElementById("StartTheme").play();
};

const main = () => {
  skillButtons();
  $("#stage1").on("click", () => {
    stageSelect();
    setTimeout(loadStage1, 700);
  });
  checkStageUnlock();
};

$(() => {
  main();
  $("#startbutton").on("click", gameStart);
  
});
