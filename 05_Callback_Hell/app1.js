// const getMeADog = (url) =>{
// return new Promise((resolved,rejected)=>{
//     setTimeout(()=>{
//         const rand = Math.random();
//     if(rand < 0.5){
//     resolved();
//     }
//     else{
//         rejected();
//     }
//     },5000)    
// });
// }

// getMeADog().then(()=>{

//     console.log('YAY!!!!');
// }).catch(()=>{
//     console.log('AWWW!!');
// })

const fakeRequest = (url) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {

            const pages = {
                '/users': [{
                    id:1,username:'mick',
                    id:5,username:'george'
                },],
                '/about' : 'This is a about Page!'
            }
            const data = pages[url];
            if(data)
            resolve({status:200, data});
           else{
            reject({status:404});
           }
        }, 1000);
    })
}

fakeRequest('/users').then((res) => {
    console.log(res.status);
    console.log(res.data);
    console.log('REQUEST WORKED!')
}).catch((res) => {
    console.log(res.status)
    console.log('REQUEST FAILED!')
});

fakeRequest('/dogs').then((res) => {
    console.log(res.status);
    console.log(res.data);
    console.log('REQUEST WORKED!')
}).catch((res) => {
    console.log(res.status)
    console.log('REQUEST FAILED!')
});