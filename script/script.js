// window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60 ),
            arrTimer = {timeRemaining, hours, minutes, seconds};
            for(let key in arrTimer){
                if(arrTimer[key] % 10 === arrTimer[key] ){
                    arrTimer[key] = `0` +  arrTimer[key];
                }
            }
            
            if(timeRemaining > 0){
                return arrTimer;
            }else{
                for(let key in arrTimer){
                    arrTimer[key] = '00';
                }
                return arrTimer;
            }
            
        }

        function updateClock(){
            let timer = (getTimeRemaining());
        
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

        }

        setInterval(function(){
            updateClock();
        }, 10);
        
 
    }

    countTimer('24 november 2021');
    
    
// });