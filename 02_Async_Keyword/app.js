// axios.get('https://swapi.dev/api/planets/').then(({data})=>{
// 	for(let planet of data.results){
// 		console.log(planet.name);
// 	}
// 	const nextURL = data.next;
// 	return axios.get(nextURL);
// }).then(({data})=>{
// 	console.log(data);
// 	for(let planet of data.results){
// 		console.log(planet.name);
// 	}
// })

async function 	getData(){
	try{
		const res = await axios.get('https://swapi.dev/api/planets/');
		console.log(res.data);
	}catch(e){
		console.log('ERROR!!',e);
	}
}

getData();