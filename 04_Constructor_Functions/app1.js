// function Color(r,g,b){
//     this.r = r;
//     this.g = g;
//     this.b = b;
//     // this.rgb = function(){
//     //     return `rgb(${r},${g},${b},)`;
//     // }
// }

// Color.prototype.rgb = function(){
//     const{r,g,b}= this;
//     return `rgb(${r},${g},${b})`;
// }

// Color.prototype.hex = function(){
//     const{r,g,b}= this;
//     return '#'+((1 << 24)+(r << 16)+(g << 8) + b ).toString(16).slice(1);
// }

// const color1 = new Color(255,255,150);
// const color2 = new Color(0,0,0);

// class Color{
//     constructor(r,g,b){
//         this.r = r;
//         this.g = g;
//         this.b = b;
//     }
//     innerRGB(){
//        const{r,g,b} = this;
//         return `${r},${g},${b}`;
//     }
//     rgb(){
//         return `rgb(${this.innerRGB()})`;
//     }
//     rgba(a=1.0){
//         return `rgba(${this.innerRGB()},${a})`
//     }
// }

// const color1 = new Color(255,255,60);

class Pet{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    eat(){
        return `${this.name} is eating`;
    }
}

class Cat extends Pet{
    meow(){
        return `Meow!!!`;
    }
}

class Dog extends Pet{
    bark(){
        return 'Woof!!';
    }
}