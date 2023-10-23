const btn = document.querySelector('button');

const moveX =(element,amount,delay)=>{
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
		const bodyBoundary = document.body.clientWidth;
		const elRight = element.getBoundingClientRect().right;
		const currLeft = element.getBoundingClientRect().left;
		if(elRight + amount > bodyBoundary){
			reject();	
		}
		else{
			element.style.transform = `translateX(${currLeft + amount}px)`;
			resolve();
		 }
		},delay);
	});
		
};

moveX(btn,300,1000)
 .then(()=>moveX(btn,300,1000))
 .then(()=>moveX(btn,300,1000))
 .then(()=>moveX(btn,300,1000))
 .then(()=>moveX(btn,300,1000))
.catch(()=> console.log('OUT OF SPACE'))

// setTimeout(()=>{
// 	btn.style.transform = 'translate(100px)';
// 	setTimeout(()=>{
// 	btn.style.transform = 'translate(200px)';
// 	setTimeout(()=>{
// 		btn.style.transform = 'translate(300px)';
// 		setTimeout(()=>{
// 			btn.style.transform = 'translate(400px)';
// 			setTimeout(()=>{
// 				btn.style.transform = 'translate(500px)';
// 				},1000)
// 			},1000)
// 		},1000)
// 	},1000)
// },1000);

// moveX(btn,100,1000,()=>{
// 	moveX(btn,100,1000,()=>{
// 		moveX(btn,100,1000,()=>{
// 			moveX(btn,100,1000,()=>{
// 				moveX(btn,100,1000,()=>{
// 					moveX(btn,1000,1000);
// 				});
// 			});
// 		});
// 	});
// });


