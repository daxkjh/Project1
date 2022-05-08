const playSound =()=> {
document.getElementById('StartTheme').play()
}

$(()=>{
    $('button').on('click',playSound);
})