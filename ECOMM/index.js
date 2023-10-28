import express, { urlencoded } from 'express';

const app = express();

app.use(urlencoded({extended: true}));

app.get('/res',(req,res)=>{
    res.send(`
    <div>
        <form method = "POST">
            <input placeholder = "email" name = "email"/>
            <input placeholder = "password" name = "password"/>
            <input placeholder = "confirm password" name="confirmPassword"/>
            <button>Sign up</button>
        </form>
    </div>
    `);
})

app.post('/res',(req,res)=>{
   console.log(req.body);
    res.send('Account Created');
})

app.listen(3000,()=>{
    console.log('Listening');
})