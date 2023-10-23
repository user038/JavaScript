function hex(){
    return '#'+((1<<24) + (r<<16) + (g<<8) + b).toString().slice(1);
}

function makeColor(){
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    function rgb(){
        const {r,g,b} = this;
        return `rgb(${r},${g},${b})`;
    }
    function hex(){
        const {r,g,b} = this;
        return '#'+((1<<24) + (r<<16) + (g<<8) + b).toString().slice(1);
    }
    return color;
}

const firstColor = makeColor(35,255,100);
firstColor.hex();

function Color(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
    console.log(this);
}

Color(255,40,100);