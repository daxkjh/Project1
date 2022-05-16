// resources
const $footer = $("<div>").addClass("footer");
$footer.appendTo("#gameContainer");
const $welcomeNote = $('<div>').addClass('welcome').attr('src','/pictures/Background/PG.jpg')
const $acknowledgeButton = $('<button>').addClass('welcomeButton').text('I Acknowledge & Accept all Terms and Conditions')
const $ironmanHead = $('<img>').addClass('ironmanHead').addClass('atkButton').attr('src','pictures/Characters/ironman/ironmanHead.png')
const $thorHead = $('<img>').addClass('thorHead').addClass('atkButton').attr('src','pictures/Characters/Thor/thorHead.png')
const startTheme = 'startTheme'
const battleMusic = 'battleSoundtrack'
const stageMusic = 'stagePageSound'
let currentSound = ''
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
let stageclear = 0;



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
    hp: 150,
    hpmax:150,
    atk: 25, 
    atkgrowth: 15,
    hpgrowth: 15,
    alive: true,
    image: $("<div>")
      .attr("id", "ironmanId")
      .addClass("ironmanClass")
      .addClass("bounce-1")
      .addClass("allCharacters"),
    sequence: () => {
      console.log('Ironman Sequence');
      $footer.show();
      $ironmanHead.appendTo($footer);
      $beamButton.appendTo($footer);
      $missileButton.appendTo($footer);
     // turn = true;
     // return turn;
    },
  },
  thor: {
    type: "hero",
    name: "thor",
    level: 1,
    spd: 4,
    hp: 100,
    hpmax:100,
    atk: 20, // temp changve
    atkgrowth: 10,
    hpgrowth: 15,
    alive: true,
    image: $("<div>")
      .attr("id", "thorId")
      .addClass("thorClass")
      //.addClass("bounce-2")
      .addClass("allCharacters"),
    sequence: () => {
      console.log('Thor Sequence')
      console.log('spdArr: ', spdArr)
      $footer.show();
      $thorHead.appendTo($footer);
      $hammerButton.appendTo($footer);
      $thunderButton.appendTo($footer);
     // turn = true;
     // return turn;
  }
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

//###################
// ##    Villain list
//###################

hand = {
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
    .attr("name", "hand")
}

goon = {
  name: "goon",
  type: "villain",
  hp: 100,
  hpmax:100,
  atk: 15,
  spd: 5,
  alive: true,
  image: $("<div>")
    .addClass("goonClass")
   // .addClass('bounce-2')
    .addClass("allCharacters")
    .attr("id", "goonId")
    .attr("name", "goon")
}






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
//let hero1 = "ironman"; // from function

const charSet1 = {}
charSet1.hand = hand;
charSet1.ironman = hero.ironman
//charSet1.thor = hero.thor

const charSet2 = {}
charSet2.hand = hand;
charSet2.ironman = hero.ironman
charSet2.thor = hero.thor
charSet2.goon = goon
////////////////////////////////////////////
///#### Villain skills
// ######################################
const villain = {
  hand: {
    skill1: (targetHero) => {
  
      targetHero.hp -= 50;
      if (targetHero.hp < 1) {
        targetHero.alive = false;
     //  setTimeout(()=> {$(`#${targetHero.name}Id`).remove()}, 2200)
       setTimeout(()=> {$(`#${targetHero.name}Id`).addClass('dead')}, 2200)
      }
      //css portion
      const $handslash = $('<img>').addClass("handslash").attr('src',"/pictures/Characters/TheHand/actual/hand1.gif")
      $('.handClass').slideToggle('fast')
      setTimeout(()=>{$handslash.appendTo($(`#${targetHero.name}Id`))
      
    },400)
    setTimeout(()=>{
      $(`.${targetHero.name}bar`).css('width',`${(targetHero.hp/targetHero.hpmax*100)}%`)
      playHitSprite(targetHero.name)
    },900)
      setTimeout(()=>{
       $('.handslash').remove()
      $('.handClass').slideToggle('fast')   
    },1500)
   // console.log('190', targetHero.name)
    //  console.log("hand Atk1! targetHerohp:", targetHero.hp);
    },

    skill2: (targetHero) => {
      console.log('targertHero is',targetHero)
      targetHero.hp -= 20;
      //gettingHit()
      if (targetHero.hp < 1) {
        targetHero.alive = false;
      //  setTimeout(()=> {$(`#${targetHero.name}Id`).remove()}, 2200)
      setTimeout(()=> {$(`#${targetHero.name}Id`).addClass('dead')}, 2200)
      }
      //css portion
      $('.handClass').removeClass('bounce-2')
    //   $(".handClass").animate({
    //     'left':'-350px'
    // },200, 'linear',)
    villainMeleeTargeter(targetHero,$('#handId'),1200)
      setTimeout(()=>{const $hand2 = $('<img>').addClass('handCut').attr('src','/pictures/Characters/TheHand/actual/hand2.gif')
      $hand2.appendTo($('#handId'))
      playHitSprite(targetHero.name)},250)
      setTimeout(()=>{
        $('.handCut').remove();
      //  $(".handClass").animate({
      //     'left':'0px'
      //       },200, 'linear');
    
        $('.handClass').addClass('bounce-2');
      }, 1050)
     
      $(`.${targetHero.name}bar`).css('width',`${(targetHero.hp/targetHero.hpmax*100)}%`)
     
     // console.log("hand Atk2! :"+ targetHero.name +'hp left:'+ targetHero.hp);
    },
  },
  goon: {
    skill1: (targetHero) => {
  
      targetHero.hp -= 50;
      if (targetHero.hp < 1) {
        targetHero.alive = false;
    //   setTimeout(()=> {$(`#${targetHero.name}Id`).remove()}, 2200)
    setTimeout(()=> {$(`#${targetHero.name}Id`).addClass('dead')}, 2200)
      }
      //css portion
      const $goonShoot = $('<img>').addClass("goonShoot").attr('src',"/pictures/Characters/Goons/actual/goonshothit.gif")
      $('.goonClass').addClass('goonShooting')
      setTimeout(()=>{
        $('.goonClass').removeClass('goonShooting').addClass('goonRecoil')
        $goonShoot.appendTo($(`#${targetHero.name}Id`))
    },500)
    setTimeout(()=>{
      $(`.${targetHero.name}bar`).css('width',`${(targetHero.hp/targetHero.hpmax*100)}%`)
      playHitSprite(targetHero.name)
    },600)
      setTimeout(()=>{
       $('.goonShoot').remove()
      $('.goonClass').removeClass('goonRecoil')   
    },1000)
   // console.log('190', targetHero.name)
    //  console.log("hand Atk1! targetHerohp:", targetHero.hp);
    },

    skill2: (targetHero) => {
      
      targetHero.hp -= 50;
      if (targetHero.hp < 1) {
        targetHero.alive = false;
     //  setTimeout(()=> {$(`#${targetHero.name}Id`).remove()}, 2200)
     setTimeout(()=> {$(`#${targetHero.name}Id`).addClass('dead')}, 2200)
      }
      //css portion
      const $goonShoot = $('<img>').addClass("goonShoot").attr('src',"/pictures/Characters/Goons/actual/goonshothit.gif")
      $('.goonClass').addClass('goonShooting')
      setTimeout(()=>{
        $('.goonClass').removeClass('goonShooting').addClass('goonRecoil')
        $goonShoot.appendTo($(`#${targetHero.name}Id`))
    },1000)
    setTimeout(()=>{
      $(`.${targetHero.name}bar`).css('width',`${(targetHero.hp/targetHero.hpmax*100)}%`)
      playHitSprite(targetHero.name)
    },1000)
      setTimeout(()=>{
       $('.goonShoot').remove()
      $('.goonClass').removeClass('goonRecoil')   
    },1600)
   // console.log('190', targetHero.name)
  },
}
}
//#################################
//###### Hero skills #######
//#############################

const battle = (event) => {

  if (turn == true) {
  
    //console.log('line 236, turn =', turn)
    let execute = attack[atkselector];
    execute(event);
    atkselector = "";
   // console.log('line 237 -- battle()', atkselector)
    $(".atkButton").remove();
    $footer.hide(); 
    let allVill = spdArr.filter((element) => element.type == "villain");
    let allVillDead = allVill.every((element) => element.alive == false);
    if (allVillDead == true) {
      win = "hero";
      // alert ('win')
      resolveWin();
     setTimeout(()=>{
      //  resetMap();
      $(".atkButton").remove();},2000)
      // return spdArr
    } else if (index < spdArr.length - 1) {
      index++;
      //battleStart();
      setTimeout(battleStart,1000);
      return
    } else {
      index = 0;
     // battleStart();
      setTimeout(battleStart,1000);
      return
    }
  }
 return turn = false
};

const attack = {
  beam: (event) => {
   // turn = false;
    let v = $(event.target).attr("name");
    //console.log('v =', v)
    let enemy = spdArr.find((element) => element.name == v);
    enemy.hp -= hero.ironman.atk;
    if (enemy.hp < 1) {
      enemy.alive = false;
     setTimeout(()=> {$(`#${v}Id`).addClass('dead')}, 2200)
    }

    //css portion
    $('.ironmanClass').removeClass('bounce-1')
    meleeAtkTargeter(event,$('#ironmanId'),1500)
    setTimeout(()=>{ $('#ironmanId').addClass('ironmanbeamfinal')},500)
    setTimeout(()=>{
      playHitSprite(v)
    $('<img>').addClass('beamgif').attr('src','/pictures/Characters/ironmanbeam.gif').appendTo($('#ironmanId'))
    $(`.${v}bar`).css('width',`${(enemy.hp/enemy.hpmax*100)}%`)
    } , 600)
    setTimeout(()=>{
        $('.beamgif').remove()
       $('#ironmanId').removeClass('ironmanbeamfinal');
    }, 1300)
    setTimeout(()=>{$('.ironmanClass').addClass('bounce-1')},2000)

   
  //  console.log('iron man beam => enemy hp: ', enemy.hp);
  },

  missile: () => {
   // turn = false;
    for (const x of spdArr) {
      if ( x.type == "villain") {
        x.hp -= 20;
        let v = x.name;
        if (x.hp < 1) {
          x.alive = false;
          setTimeout(()=> {$(`#${v}Id`).addClass('dead')}, 2200)
        }
        // CSS portion
        $('.ironmanClass').removeClass('bounce-1')
        const $missile = $('<img>').addClass('missilegif')
        
        $('#ironmanId').addClass('missile1')
        setTimeout(()=>{
          $('#ironmanId').removeClass('missile1')
          $('#ironmanId').addClass('missile2')
          $('#ironmanId').append($missile)
        },500)
        setTimeout(()=>{
          $missile.remove()
        },1500)

        setTimeout(()=>{
          const $missileHit = $('<img>').addClass('missileHit')
          $(`#${v}Id`).append($missileHit)
          $('#ironmanId').removeClass('missile2')
          playHitSprite(v) 
        } , 1200)
        setTimeout(()=>{
          const $missileHit = $('<img>').addClass('missileHit1')
          $(`#${v}Id`).append($missileHit)
          $(`.${x.name}bar`).css('width',`${(x.hp/x.hpmax*100)}%`)
          $('#ironmanId').removeClass('missile2')
          playHitSprite(v)
          $('.ironmanClass').addClass('bounce-1')
        },1500)
        setTimeout(()=>{
          $('.missileHit').remove()
        },1600)
        setTimeout(()=>{
          $('.missileHit1').remove()
        },1900)

       
        console.log(x.hp);
      }
    }
  },

  hammer: (event)=>{
    //turn=false;

  let v = $(event.target).attr("name");

  let enemy = spdArr.find((element) => element.name == v);
  enemy.hp -= hero.thor.atk;
  if (enemy.hp < 1) {
    enemy.alive = false;
    setTimeout(()=> {$(`#${v}Id`).addClass('dead')}, 2200)
  }
//CSS Portion
  
  meleeAtkTargeter(event,$('#thorId'),2600)
  setTimeout(()=>{
  $('<img>').addClass('hammergif').attr('src','/pictures/Characters/Thor/thorhammer.gif').appendTo($('#thorId'))
} , 0)
setTimeout(()=>{
  $('#thorId').addClass('thorThunder')
} , 300)
  setTimeout(()=>{
    $('#thorId').removeClass('thorThunder')
    $('#thorId').addClass('thorHammer')
    playHitSprite(v)
  $(`.${v}bar`).css('width',`${(enemy.hp/enemy.hpmax*100)}%`) 
} , 2000)
  setTimeout(()=>{
    $('#thorId').removeClass('thorHammer')
   $('.hammergif').remove()
} , 2500)
  
},

thunder: (event)=>{
let v = $(event.target).attr("name");
  let enemy = spdArr.find((element) => element.name == v);
  enemy.hp -= hero.thor.atk;
  if (enemy.hp < 1) {
    enemy.alive = false;
    setTimeout(()=> {$(`#${v}Id`).addClass('dead')}, 2200)
  }
//CSS portion
$('#thorId').addClass('thorThunder')
const $thunder = $('<img>').addClass('thunderShootUp')
$thunder.appendTo($('#thorId'))
const $thunderStruck = $('<img>').addClass('thunderStruck')
setTimeout(()=>{
  $(`#${v}Id`).append($thunderStruck)
  playHitSprite(v)
  $(`.${v}bar`).css('width',`${(enemy.hp/enemy.hpmax*100)}%`) 
}, 500)
setTimeout(()=>{
  $thunder.remove()
  $thunderStruck.remove()
  $('#thorId').removeClass('thorThunder')
}, 1300)
}

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
const $hammerButton = $("<button>")
.addClass("hammerButtonClass")
.addClass("atkButton")
.attr("id", "hammerButtonId")
.attr("name", "hammer");
const $thunderButton = $("<button>")
.addClass("thunderButtonClass")
.addClass("atkButton")
.attr("id", "thunderButtonId")
.attr("name", "thunder");

//######### GAME START ###################
const gameStart = () => {
  $("#Start").slideToggle("slow");
   playSound(currentSound,startTheme);
  setTimeout(()=>{
    $welcomeNote.appendTo($('#gameContainer'))
  },1000)
  setTimeout(stageSelect, 700);
  setTimeout(()=>{
    $welcomeNote.append($acknowledgeButton)
  },10000)
  setTimeout(()=>{
    playSound(currentSound,stageMusic)
  },13000)
};

///////////////////////////////////////
// ### Creating Stages Functions ####
/////////////////////////////////////

const stageSelect = () => {
  $("#stageSelectId").slideToggle("slow");
};

const loadStage1 = () => {
    resetMap()
    playSound(currentSound,battleMusic)
    currentStage = 1;
  const $battlemap = $("<div>").addClass("battle").attr("id", "battlemap");
  $battlemap.appendTo("#gameContainer");
  //$('#stageSelectId').slideToggle()
  $battlemap.slideToggle("slow");
  staging(charSet1);
  drawChar(charSet1);
  
  battleStart();
  attackTarget(charSet1);
  
};

const loadStage2 = () => {
    resetMap()
    playSound(currentSound,battleMusic)
    currentStage = 2;
  const $battlemap = $("<div>").addClass("battle").attr("id", "battlemap");
  $battlemap.appendTo("#gameContainer");
  //$('#stageSelectId').slideToggle()
  $battlemap.slideToggle("slow");
  staging(charSet2);
  drawChar(charSet2);
  
  battleStart();
  attackTarget(charSet2);
};

//####################
// GAME FUNCTIONS
//####################

const drawChar = (obj) => {  // loading characters onto the map
  let x = 1
  let y = 1
  for (const a of spdArr) {
   // for (const a in obj) {
    //console.log(obj[a])
    let $characterPic = a.image;
    if(a.type == 'hero'){
     // console.log (obj[a].type)
      let pos = `H${x}`
      let $Hpos = $('<div>').addClass(pos)
      $Hpos.appendTo($('#battlemap'))
      $characterPic.appendTo($Hpos);
      console.log('create hero hp bar')
      $('<div>').addClass('allCharacters').addClass(`${a.name}HB`).appendTo($characterPic);
      $('<div>').addClass('allCharacters').addClass(`${a.name}bar`).appendTo(`.${a.name}HB`);
      console.log("x =",x);
      x++;
      
    } 
    else {
      let pos = `V${y}`
      let $Vpos = $('<div>').addClass(pos)
      $Vpos.appendTo($('#battlemap'))
      $characterPic.appendTo($Vpos);
      console.log('create villain hp bar')
        $('<div>').addClass('allCharacters').addClass(`${a.name}HB`).appendTo($characterPic);
        $('<div>').addClass('allCharacters').addClass(`${a.name}bar`).appendTo(`.${a.name}HB`);
        console.log("y =", y);
        y++;
        
    } 
    console.log("drawChar working");
  }
};

const staging = (obj) => { // to set up the battle field values 
  spdArrPrototype = Object.values(obj); // cloning the object so battle wont change the main object values
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
  console.log("resolveWin running")
  if (win == "hero") {
      for (let i = 1; i<=5; i++){
        if (currentStage==i){
            $(`#stage${i+1}`).removeClass('locked')
            stageclear = i
        }}

    $("#gameSummaryId").attr("src", "/pictures/Background/vic.gif");
    setTimeout(() => {
    $("#gameSummaryId").show();
    resetMap();
    }, 3000);
    setTimeout(() => {
      $("#gameSummaryId").hide();
    }, 5000);
    setTimeout(()=>{
      stageSelect();
      playSound(currentSound,stageMusic)
    }, 5001);
    
   // console.log("console.log(spdArr)===>", spdArr);
  } else {
    $("#gameSummaryId").attr("src", "/pictures/Background/defeat.gif");
    setTimeout(() => {
    $("#gameSummaryId").show();
    resetMap();
    }, 3000);
    setTimeout(() => {
      $("#gameSummaryId").hide();
    }, 5000);  
    setTimeout(()=>{stageSelect();}, 5001);
   // console.log("console.log(spdArr)===>", spdArr);
  }
};

const resetMap = () => {
  $('.allCharacters').removeClass('dead');
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

// const gettingHit =()=>{
//   for(const char of spdArr){
//     let spriteToChange = char['name']
//     char['hp'].on('change',()=>{playHitSprite(spriteToChange)})
//   }
// }

const playHitSprite =(name, times = 1, duration = 500)=>{
  for(let i = 0; i< times; i++){
 // console.log('playHitSprite is working,  v is' , name)
  let nameHit = `${name}Hit`
  let $nameId = $(`#${name}Id`)
$nameId.addClass(nameHit)
setTimeout(()=>{$nameId.removeClass(nameHit)},duration)
}}

const meleeAtkTargeter = (event,id,duration)=>{
console.log('587 in meleeAtk function --> ',$(event.target).parent().attr("class"))

let charToBeMoved = id.parent()
console.log('hero is at',charToBeMoved)
let charMapLocation = charToBeMoved.attr('class');
console.log('592 hero parent div  --> ', charToBeMoved)
let targetposition = $(event.target).parent().attr("class")
let HeroPos = {
  H1 : {'top' : '120px', 'left': '150px'},
  H2 : {'top' : '250px', 'left': '125px'},
  H3 : {'top' : '380px', 'left': '100px'}
} 
if (targetposition == 'V1'){
charToBeMoved.animate({
  'top': '120px',
  'left': '430px'
},200, 'linear')

setTimeout(()=>{
 charToBeMoved.animate(HeroPos[charMapLocation],200, 'linear');
}, duration)
} else if (targetposition == 'V2'){
  charToBeMoved.animate({
    'top': '250px',
    'left': '455px'
  },200, 'linear')
  
  setTimeout(()=>{
   charToBeMoved.animate(HeroPos[charMapLocation],200, 'linear');
  }, duration)

} else {
  charToBeMoved.animate({
    'top': '380px',
    'left': '480px'
  },200, 'linear')
  
  setTimeout(()=>{
   charToBeMoved.animate(HeroPos[charMapLocation],200, 'linear');
  }, duration)
}
}


const villainMeleeTargeter = (target,id,duration)=>{
  let charToBeMoved = id.parent()
  console.log('villain is at',charToBeMoved)
  let charMapLocation = charToBeMoved.attr('class');
  console.log('638 villain parent div  --> ', charToBeMoved)

  let targetposition = $(`#${target.name}Id`).parent().attr("class")
  console.log("targetposition", targetposition)

  let VillainPos = {
    V1 : {'top' : '120px', 'left': '650px'},
    V2 : {'top' : '250px', 'left': '675px'},
    V3 : {'top' : '380px', 'left': '700px'}
  } 
  if (targetposition == 'H1'){
    charToBeMoved.animate({
      'top': '120px',
      'left': '270px'
    },200, 'linear')
    
    setTimeout(()=>{
     charToBeMoved.animate(VillainPos[charMapLocation],200, 'linear');
    }, duration)
    } else if (targetposition == 'H2'){
      charToBeMoved.animate({
        'top': '250px',
        'left': '245px'
      },200, 'linear')
      
      setTimeout(()=>{
       charToBeMoved.animate(VillainPos[charMapLocation],200, 'linear');
      }, duration)
    
    } else {
      charToBeMoved.animate({
        'top': '380px',
        'left': '220px'
      },200, 'linear')
      
      setTimeout(()=>{
       charToBeMoved.animate(VillainPos[charMapLocation],200, 'linear');
      }, duration)
    }
}


//########################################
//#####                               ####
//#####       Main Battle Function    ####
//#####                               ####
//########################################

const battleStart = () => {
  console.log('battleStart running, current index =',index)
  $(".atkButton").remove();
  if (spdArr[index].alive == false) {
    if (index < spdArr.length - 1) {
      index++;
     // console.log('line 325')
      battleStart();
    } else {
      index = 0;
     // console.log('line 329')
      battleStart();
    }
  } else if (spdArr[index].alive == true) {
    if (spdArr[index].type == "hero") {
          turn = true
      let x = spdArr[index].name;
     // console.log(index)
      hero[x].sequence(); //load footer, load button
      skillButtons(); //load selection function >>> wait for user click
   // return turn = true; //allow user to click
    } else {
      //if alive character is not human
      $footer.hide(); //computers turn

      // generating random alive hero target
      let aliveHero = [];
      spdArr.forEach((element, index2) => {
        if (element.type == "hero" && element.alive == true) {
          aliveHero.push(index2);
        } 
      });
      if(aliveHero.length!==0){
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
      }}
      let allHero = spdArr.filter((element) => element.type == "hero");
      console.log('allhero=>',allHero)
      let allHeroDead = allHero.every((element) => {
            return element.alive == false;
      });
      console.log('allherodead is working =>',allHeroDead)
      setTimeout(()=>{
        if (allHeroDead == true) {
        win = "villain";
       // alert("you lost");
        resolveWin();
        //resetMap();
       
      } else if (index < spdArr.length - 1 && allHeroDead==false) {
        index++;
        
        setTimeout(() => {
          battleStart();
        }, 2500);
      } else {
        if(allHeroDead==false){
 
        index = 0;
        setTimeout(() => {
          battleStart();
        }, 2500);}
      }},1000)
    }
  }
};

const attackTarget = (charSet) => {
  // listener for villain to be clicked
  for (const x in charSet) {
    if (charSet[x].type == "villain") {
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
  $hammerButton.on("click", funcAtkSelector);
  $thunderButton.on("click", funcAtkSelector);


};

const funcAtkSelector = (event) => {
  atkselector = $(event.target).attr("name");
  console.log(atkselector);
  console.log(turn);
  return atkselector;
};


const playSound = (playing, sound) => {
  if (playing != ''){
  document.getElementById(playing).pause()
  document.getElementById(playing).currentTime = 0;
} 
  document.getElementById(sound).play();
  currentSound = sound

};

const main = () => {
 // skillButtons();
  $("#stage1").on("click", () => {
    stageSelect();
    setTimeout(loadStage1, 1000);
  });

  //if(stage1clear == true){
  $("#stage2").on("click", () => {
    if(stageclear >= 1){ // checking for conditions to unlock
    stageSelect();
    setTimeout(loadStage2, 1000);
    }
  }
  )
};

$(() => {
  main();
  $("#startbutton").on("click", gameStart);
  $acknowledgeButton.on('click', ()=>{$welcomeNote.remove()})
  
});
