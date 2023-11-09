import express,{ urlencoded } from "express";
import router from "./routes/admin/auth.js";
import cookieSession from "cookie-session";


const app = express();

app.use(urlencoded({extended:"true"}));
app.use(cookieSession({
    keys : ['wdqwfewwde']
}));

app.use(router);


app.listen(3002,()=>{
    console.log('Listening...');
})