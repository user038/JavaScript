const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray',perimeter);


let currentOffset = 0;

let duration;
const timer = new Timer(durationInput,startButton,pauseButton,{
    onStart(totalDuration) {
        duration = totalDuration;
        console.log('Started');
        durationInput.disabled = true;
        this.startButton.disabled = true;
        this.pauseButton.disabled = false;
    },onTick(timeRemaining){
        let dashoffset = perimeter * timeRemaining / duration - perimeter;
        circle.setAttribute('stroke-dashoffset',
          (dashoffset) 
        );
        console.log(this.durationInput.value/this.timeRemaining);
        console.log(perimeter);
        currentOffset = currentOffset - 1;
    },onComplete(){
        this.timeRemaining = 30;
    }
});




  