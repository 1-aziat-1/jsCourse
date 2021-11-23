"use strict";

let hello = document.querySelector(".hello"),
    todayIs = document.querySelector(".todayIs"),
    nowDate = document.querySelector(".nowDate"),
    newYear = document.querySelector(".newYear"),
    arrWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота","Воскресенье"];

function countTimer(){
    let date = new Date(),
        nextYear = new Date(`December 31, ${date.getFullYear()}`),
        day = '';
    
  
    if(((date.getHours() > 11) && (date.getHours() < 16))){
        day = 'Добрый день';
    }else if(((date.getHours() > 16) && (date.getHours() < 24))){
        day = 'Добрый вечер';
    }else if(((date.getHours() > 4) && (date.getHours() < 11))){
        day = 'Доброе утро';
    }else{
        day = 'Доброе ночи';
    }



    hello.textContent = day;    
    todayIs.textContent = `Сегодня: ${arrWeek[date.getDay()-1]}`;
    nowDate.textContent = `Текущее время: ${date.toLocaleTimeString('en')}`;
    newYear.textContent = `До нового года осталось ${Math.floor((nextYear.getTime() - date.getTime())/24/60/60/1000)} дней`;
    
}

setInterval(function(){
    countTimer();
}, 1000);

