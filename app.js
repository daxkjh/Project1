
// resources
const $footer = $("<div>").addClass("footer");
const $battlemap = $(".battle");
$footer.appendTo($battlemap)
let charArray = [];
let heroList = [];
let spdArr = [];
let heroteam = 0;
let villteam = 0;
let index = 0;
let atkselector = "";
let turn = null


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
      pic: $("<img>").attr("id", "ironmanId").addClass("ironmanClass"),
      sequence: () => {
        $footer.show()
        $beamButton.appendTo($footer);
        $missileButton.appendTo($footer);
        ;
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
    }, //,
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
}

//############################
//     Stage Character Load
//###########################
let hero1 = "ironman"; // from function

const charSet = {
    hand: {
      name: "hand",
      type: "villain",
      hp: 100,
      atk: 15,
      spd: 5,
      alive: true,
      image: $("<img>")
        .addClass("handClass")
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
      image: hero[hero1].pic
    }
}

////////////////////////////////////////////
///#### Villain skills
// ######################################
const slash = (targetHero)=> {
    //console.log(targetHero)
    targetHero.hp-=5
    if(targetHero.hp<1){
        targetHero.alive=false
    }
    console.log(targetHero)
}









//#################################
  //###### skills #######
 //#############################

  const battle = (event) => {
    //   console.log("atkselector", atkselector)
    if(turn == true){
    
    let execute = attack[atkselector];
    execute(event);
    if(index<spdArr.length-1){
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
            enemy.alive= false
        } 
        console.log(spdArr)
    },
  
    missile: () => {
      for (const x in charSet) {
          if(charSet[x].type=='villain'){
        charSet[x].hp -= 1;
        console.log(charSet[x]);
      }
    }},
  
    // hammer: (event) => {
    //   let v = $(event.target).attr("name");
    //   hero[v].hp -= hero.thor.atk;
    // },
  
    // lightning: (event) => {
    //   let v = $(event.target).attr("name");
    //   hero[v].hp -= hero.thor.atk;
    // },
  
    // smash: (event) => {
    //   let v = $(event.target).attr("name");
    //   hero[v].hp -= hero.hulk.atk;
    // },
  
    // toss: (event) => {
    //   let v = $(event.target).attr("name");
    //   hero[v].hp -= hero.hulk.atk;
    // },
  
    // slash: () => {
    //     for(const hero in charSet){
    //         if(charSet[hero].type =='hero'){
    //             heroList.push(hero);
    //             console.log(hero)
    //         }
    //     }
    // },
  };
  
  //### End Of Skills ####


























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

//## hero resource ##

//hero resource
// const $hand = $("<img>")
//   .addClass("handClass")
//   .attr("id", "handId")
//   .attr("name", "hand");

//######### GAME START ###################
const gameStart = () => {
  $("#Start").hide('slow');

  // playSound();
  // play background story();
  setTimeout(loadStage, 500);
};
////////////////////////////////
// ### Creating Stages ####
//////////////////////////////

const loadStage = () => {
  $(".battle").show("slow");
  drawChar(charSet);
  staging(charSet);
  battleStart();
  attackTarget()
};


//####################
// GAME FUNCTIONS
//####################

const drawChar = (obj) => {
  for (const a in obj) {
    let $characterPic = obj[a].image;
    // console.log('$character', $characterPic)
    // console.log('$battlemap', $battlemap);
    $characterPic.appendTo($battlemap);
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








// const stageSetUp = (arr) => {
//   for (const x in arr) {
      
//     if (arr[x].type === "villain") {
//       villteam += arr[x].hp; console.log(villteam)
//     } else {
//       heroteam += arr[x].hp; console.log(heroteam)
//     }
//   }
//   for (const y in arr){
//       console.log('y >', y)
//     if (arr[y].alive === true) {
//         console.log('have alive')
//         spdArr.push({ [arr[y].name]: arr[y].spd });
//     spdArr.sort((a, b) => Object.values(b) - Object.values(a))
//      console.log('spdArr ->' ,spdArr)
//   }
//   }
//   if (villteam < 1) {
//     alert("win");
//   }
//   if (heroteam < 1) {alert("lose")};
//};

// const reviewRound = (arr) => {
//     for (const y in arr){
//         console.log('y >', y)
//       if (arr[y].alive === true) {
//           console.log('have alive')
//           spdArr.push({ [arr[y].name]: arr[y].spd });
//       spdArr.sort((a, b) => Object.values(b) - Object.values(a))
//        console.log('spdArr ->' ,spdArr)
// };
//     }}
const battleStart = () => {
   // console.log(spdArr[index].alive)
  if(spdArr[index].alive==false) {
      if (index<spdArr.length-1) {
        index++;
        battleStart()
        } else {
            index = 0;
            battleStart()
        }}
else if (spdArr[index].alive==true) {
            if (spdArr[index].type=='hero') {
                let x = spdArr[index].name;
                $('.atkButton').remove()
                atkselector=''
                hero[x].sequence()//load footer, load button
                
                skillButtons()//open selection
                turn = true
            } else {
                $footer.hide()
               // $footer.slideDown()
              
                let aliveHero = []
                spdArr.forEach((element,index2)=>{
                    if(element.type=='hero'){
                        aliveHero.push(index2)
                    }
                })
                let num = Math.floor(Math.random()*aliveHero.length)
                let targetHero = spdArr[aliveHero[num]]
                setTimeout(()=>{slash(targetHero)},2000)
                if(index<spdArr.length-1){
                index++
                } else{
                    index = 0
                }
                setTimeout(()=>{battleStart()},3000)
              
            }
}
    
//   const battleLoop=(charset)=>{
//   let currChar = Object.keys(spdArr[arrIndex])[0];
//   console.log(currChar);
//   console.log(charSet);
//   if(charSet[currChar]['type'] === 'hero'){
//   hero[currChar].sequence()
//   attackTarget()
//   battleLoop(charSet)
//   } else {
//       generateHeroTarget()
//       //charSet[currChar].skill
//   }

};

const attackTarget =()=>{
    for (const x in charSet) {
        if (charSet[x].type == "villain") {
          $(`.${x}Class`).on("click", battle);
        } //select atk target
      }
}

const generateHeroTarget =()=>{
    for (hero in charSet){
        if (charSet[hero].type =='hero')
        heroList.push(hero)
        console.log(hero)
    }
}

const battleLoop=(charset)=>{
    let currChar = Object.keys(spdArr[arrIndex])[0];
    console.log(currChar);
    console.log(charSet);
    if(charSet[currChar]['type'] === 'hero'){
    hero[currChar].sequence()
    attackTarget()
    battleLoop(charSet)
    } else {
        generateHeroTarget()
        //charSet[currChar].skill
    }}


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
