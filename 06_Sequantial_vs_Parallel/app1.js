async function getData () {
    const poke1 =  axios.get('https://pokeapi.co/api/v2/pokemon/1');
    const poke2 =  axios.get('https://pokeapi.co/api/v2/pokemon/2');
    const poke3 =  axios.get('https://pokeapi.co/api/v2/pokemon/3');
    const results = await Promise.all([poke1,poke2,poke3]);
    pokeresults(results);
}

function pokeresults(results){
    console.log(typeof results)
    for(let pokes of results){
        console.log(pokes.data.name);
    }
}


getData();

console.log(String.prototype);


String.prototype.yell = () =>alert("Go AWAY!")

const cat = 'Meow';

cat.yell();

// const getData = async() => {
//     const poke1 =  axios.get('https://pokeapi.co/api/v2/pokemon/1');
//     const poke2 =  axios.get('https://pokeapi.co/api/v2/pokemon/1');
//     const poke3 =  axios.get('https://pokeapi.co/api/v2/pokemon/1');
//     const results = await Promise.all([poke1,poke2,poke3]);
//     pokeresults(results);
//     await poke1;
//     await poke2;
//     await poke3;
//     console.log(poke1);
//     console.log(poke2);
//     console.log(poke3);
// }


// const changeBodyColor = (color,delay) => {
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             document.body.style.backgroundColor = color;
//             resolve();
//         },delay);
//     });
// }

// async function lightShow() {
//     await changeBodyColor('teal',1000);
//     await changeBodyColor('pink',1000);
// }

// lightShow();