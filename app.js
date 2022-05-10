// resources
const $footer = $('<div>').addClass('footer');
const $battlemap = $(".battle");

//### skills ####
const beam = (event) => {
    let v = $(event.target).attr('name')
    villain[v].hp -= hero.ironman.atk
    $battlemap.append($('<div>')).addClass('beam') //graphics
    console.log(villain[v])
;}

const missile = () => {
   for (const x in villain){
    villain[x].hp -= 1
   }
   console.log(villain)
;}

const punch =(event)=>{
    let v = $(event.target).attr('name')
    villain[v].hp -= hero.ironman.atk
    $battlemap.append($('<div>')).addClass('punch') // graphics
    console.log(villain[v])
}





const hero = {
    ironman: {name: 'ironman', level:1, speed:10, hp: 100, atk: 20, atkgrowth: 12, hpgrowth: 15, skill1: beam, skill2: missile, pic:$('<div>').attr('id','ironmanId').addClass('ironmanClass') },
    captain: {hp: 140, atk: 15, atkgrowth: 8, hpgrowth: 25, atk1: punch, atk2: shield},
//     hulk: {hp: 200, atk: 15, atkgrowth: 6, hpgrowth: 35, atk1: smash(), atk2: toss()}
}
for (const char in hero){
    hero[char]['atk'] += hero[char]['atkgrowth'] * hero[char]['level'];
    hero[char].hp += hero[char].hpgrowth * hero[char].level;
}



//## hero resource ##
//const $ironMan = $('<div>').attr('id','ironmanId').addClass('ironmanClass');
const $ironMan = hero.ironman.pic




const villain = {
    hand: {name: 'hand', level: 1,speed:9, hp: 150, atk: 15, exp: 30},
    goon: {name: 'goon', level : 2, speed:8, hp: 110, atk: 25, exp: 50},
    thanos: {name: 'thanos',level: 5, speed: 5, hp: 1200, atk: 50, exp: 200}
}
//villain resource
const $hand = $('<div>').addClass('handClass').attr('id','handId').attr('name','hand');
















//######### GAME START ###################
const gameStart = () =>{
    $('#Start').hide('slow');
    
   // playSound();
    // play background story();
    setTimeout(battleStage1,500);

   // $('#startbutton').on('click',gameStart);
   
}



const charArrHero = []
const loadChar = (char)=>{
    charArrHero.push(hero.char)
}

const drawChar = ()=>{ 
    $ironMan.appendTo($battlemap);
    $hand.appendTo($battlemap);
}

const SumOf =() =>{

}


const battleSequence =()=>{
    $footer.appendTo($battlemap);
    loadChar()
  //  while (sumOf(heroHP)>0||sumOf(villHP)>0){}
    //determine which character turn to load
    //clear previous button & create new skill button in footer
    //listen for skill button click
    //select target, apply skill
}



const battleStage1 = () =>{
    $('.battle').show('slow');
    drawChar();
    battleSequence();


$('.handClass').on('click',missile);
$('.handClass').on('click',beam);
}


//const loadStage1()

















const gameloop = ()=>{

}























const playSound =()=> {
document.getElementById('StartTheme').play()
}

$(()=>{
    $('#startbutton').on('click',gameStart);
    
})