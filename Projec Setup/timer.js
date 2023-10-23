class Timer{
    constructor(durationInput,startButton,pauseButton,callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click',this.start);
        this.pauseButton.addEventListener('click',this.pause);

        this.pauseButton.disabled = true;
    }
    start = () =>{
        if(this.onStart){
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick,10);
        }
    pause = () =>{
        clearInterval(this.interval);
        durationInput.disabled = false;
        this.startButton.disabled = false;
        this.pauseButton.disabled = true;
    }
    tick = () =>{
        if(this.timeRemaining<=0){
            this.pause();
            if(this.onComplete){
                this.onComplete(this.timeRemaining);
            }
        }else{
        this.timeRemaining = this.timeRemaining -.01;
        if(this.durationInput.value/this.timeRemaining == 1){
            circle.setAttribute('stroke','green');
        }else if(this.durationInput.value/this.timeRemaining == 0.5){
            circle.setAttribute('stroke','yellow');
        }
        if(this.onTick){
            this.onTick(this.timeRemaining);
        }
        }
    }
    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2);
    }
}