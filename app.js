// resources
const $footer = $('<div>').addClass('footer');





// const gameState = {
//     ironmanlevel : hero.ironman.level
// }

const hero = {
    ironman: {hp: 100, atk: 20, atkgrowth: 12, hpgrowth: 15},
//     captain: {hp: 140, atk: 15, atkgrowth: 8, hpgrowth: 25, atk1: punch(), atk2: shield()},
//     hulk: {hp: 200, atk: 15, atkgrowth: 6, hpgrowth: 35, atk1: smash(), atk2: toss()}
}


//hero resource
const $ironMan = $('<div>').attr('id','ironmanId').addClass('ironmanClass');




const villain = {
    hand: {level: 2, hp: 150, atk: 15},
    goon: {level : 1, hp: 110, atk: 20},
    thanos: {level: 5, hp: 1200, atk: 50}
}
//villain resource
const $hand = $('<button>').addClass('handClass').attr('id','handId').attr('name','hand');


const gameStart = () =>{
    $('#Start').slideUp();
   // playSound();
    // play background story();
    battleStage1()

   // $('#startbutton').on('click',gameStart);
    $('.handClass').on('click',missile);
    $('.handClass').on('click',beam);
}







const battleStage1 = (a,b,c,x,y,z) =>{
    const $battlemap = $("<div>").addClass('battle').attr('id','battlemap');
    $battlemap.appendTo('#gameContainer');
    $ironMan.appendTo($battlemap);
    $hand.appendTo($battlemap);
    const $footer = $('<div>').addClass('footer');
    $footer.appendTo($battlemap);
//const heroArr =[a,b,c];
//const vilArr = [x,y,z];
    
}


//const loadStage1()



const beam = (event) => {
    let v = event.target.name
    villain[v].hp -= hero.ironman.atk
    console.log(villain[v])
;}

const missile = () => {
   for (const x in villain){
    villain[x].hp -= 1
   }
   console.log(villain)
;}













const gameloop = ()=>{

}























const playSound =()=> {
document.getElementById('StartTheme').play()
}

$(()=>{
    $('#startbutton').on('click',gameStart);
    
})