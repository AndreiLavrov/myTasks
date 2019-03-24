let clock = document.getElementById('clock');

moment.locale('by');

function clockChanger() {
    let d = moment().format('hh>mm>ss A');
    clock.innerText = d;
}


clockChanger();
setInterval(clockChanger, 1000);