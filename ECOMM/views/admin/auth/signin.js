import layout from "../layout.js";

const signin=({req})=>{
    return layout({
        content: `<div>
                    Your id is : ${req.session.userId}
                    <form method="POST">
                        <input name="email" placeholder = "email"/>
                        <input name="password" placeholder = "password"/>
                        <button>Submit</button>
                    </form>
                </div>`});
};

export default signin;