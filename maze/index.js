const { Engine, World , Render, Runner, Bodies, MouseConstraint, Mouse, Body , Events } = Matter;

const engine = Engine.create();
engine.world.gravity.y = 0;

const { world } = engine;

const horizontalCells = 8;
const verticalCells = 8;

const width = window.innerWidth;
const height = window.innerHeight;
const halfWidth = width / 2;
const halfHeight = height / 2;

const unitLengthX = width / horizontalCells;
const unitLengthY = height / verticalCells;


const render = Render.create({
    element: document.body,
    engine : engine,
    options: {
        wireframes: false,
        width,
        height
    }
});

Render.run(render);
Runner.run(Runner.create(),engine);

World.add(world, MouseConstraint.create(engine,{
    mouse: Mouse.create(render.canvas)
}));

// Walls
const walls =[
    Bodies.rectangle(halfWidth,0,width,2,{
        isStatic: true,
        render:{
            fillStyle: 'purple'
        }
    }),
    Bodies.rectangle(halfWidth,height,width,2,{
        isStatic: true,
        render:{
            fillStyle: 'purple'
        }
    }),
    Bodies.rectangle(0,halfHeight,2,height,{
        isStatic: true,
        render:{
            fillStyle: 'purple'
        }
    }),
    Bodies.rectangle(width,halfHeight,2,height,{
        isStatic: true,
        render:{
            fillStyle: 'purple'
        }
    }),
]

World.add(world,walls);

// shuffle the neighbours
const shuffle = (arr) =>{
    let counter = arr.length;

    while(counter > 0){
        const index = Math.floor(Math.random()* counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
};

//Maze generation

const grid = Array(verticalCells).fill(null).map(()=>Array(horizontalCells).fill(false));

const horizontals = Array(verticalCells - 1).fill(null).map(()=>Array(horizontalCells).fill(false));
const verticals = Array(verticalCells).fill(null).map(()=>Array(horizontalCells - 1).fill(false));

// console.log(grid,horizontals,verticals);

const startRow = Math.floor(Math.random() * verticalCells);
const startColumn = Math.floor(Math.random() * horizontalCells);

const stepThroughCells = (row,column) =>{
    // if [row, column ] is visited the return
    if(grid[row][column]){
        return;
    }

    //Mark this cell as being visited
    grid[row][column] = true;

    // Assemble randomly - ordered list of neighbours 
    const neighbours = shuffle([
        [row - 1 , column,'up'],
        [row,column + 1,'right'],
        [row + 1,column,'down'],
        [row, column - 1,'left']
    ]);
    // console.log(neighbours);

    // for each neighbour...
    for(let neighbour of neighbours){
        const [nextRow,nextColumn,direction] = neighbour;

        // see if that neighbour is out of bounds
        if( nextRow <0 || nextRow >= verticalCells || nextColumn < 0 || nextColumn >= horizontalCells){
            continue;
        }

        // if we have visited that neighbour , continue to next neighbour
        if(grid[nextRow][nextColumn]){
        continue;
        }

        // remove a wall from either horizontal or verticals
        if(direction === 'left'){
            verticals[row][column-1] = true;
        }else if(direction === 'right'){
            verticals[row][column] = true;
        }else if(direction === 'up'){
            horizontals[row-1][column] = true;
        }else if(direction === 'down'){
            horizontals[row][column] = true;
        }

        // visit that next cell

        stepThroughCells(nextRow,nextColumn);
    }    
}

stepThroughCells(startRow,startColumn);

horizontals.forEach((row,rowIndex)=>{
    row.forEach((open,columnIndex)=>{
        if(open){
            return;
        }
        const wall = Bodies.rectangle(
            (columnIndex * unitLengthX + unitLengthX /2),
            (rowIndex * unitLengthY + unitLengthY),
            unitLengthX, 
            5,
            {
                isStatic : true,
                label : 'wall',
                render:{
                    fillStyle: 'purple'
                }
            }
        );
        World.add(world,wall);
    })
});

verticals.forEach((row,rowIndex)=>{
    row.forEach((open,columnIndex)=>{
        if(open){
            return;
        }
        const wall = Bodies.rectangle(
            (columnIndex * unitLengthX + unitLengthX),
            (rowIndex * unitLengthY + unitLengthY/2),
            5,
            unitLengthY, 
            {
                isStatic : true,
                label : 'wall',
                render:{
                    fillStyle: 'purple'
                }
            }
        );
        World.add(world,wall);
    });
})

const goal = Bodies.rectangle((width-(unitLengthX/2)),(height-(unitLengthY/2)),(unitLengthX*0.7),(unitLengthY*.7),{
    isStatic:true,
    label : 'goal',
    render: {
        fillStyle:'green'
    }
});

World.add(world,goal);

const ballRadius = Math.min( unitLengthX, unitLengthY )/4;
const ball = Bodies.circle((unitLengthX/2),(unitLengthY/2),(ballRadius),{
    render:{
        fillStyle:'red'
    },
    label : 'ball'
});

World.add(world,ball);

// console.log(horizontals);w
// console.log(verticals);

// console.log(grid);

document.addEventListener( 'keydown',event => {
    const {x,y}  = ball.velocity;
   if(event.keyCode === 87){
    Body.setVelocity(ball,{ x , y : y - 2 });
   }
   if(event.keyCode === 68){
    Body.setVelocity(ball,{ x : x + 2 , y });
  }
  if(event.keyCode === 83){
    Body.setVelocity(ball,{ x , y : y + 2 });
  }
  if(event.keyCode === 65){
    Body.setVelocity(ball,{ x : x - 2 , y });
  }
});

// Win condition

Events.on(engine, 'collisionStart',event =>{
    event.pairs.forEach(collision=>{
        const labels = ['ball','goal'];
        if(labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y = 1;
            world.bodies.forEach((body)=>{
                if(body.label === 'wall'){
                    Body.setStatic(body , false); 
                }
            })
        }
    })
})