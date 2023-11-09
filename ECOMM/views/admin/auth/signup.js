import layout from "../layout.js";

const getError = (errors,prop) => {
    try{
        return errors.mapped()[prop].msg
    }catch(err){
        return '';
    }
}

const signup=({req,errors})=>{
    return layout({
    content: 
    `<div>
        Your id is : ${req.session.userId}
        <form method="POST">
            <div>
                <input name="email" placeholder = "email"/>
                ${getError(errors,'email')}
            </div>
            <div>
                <input name="password" placeholder = "password"/>
                ${getError(errors,'password')}
            </div>
            <div>
                <input name="confirmPassword" placeholder = "confirmPassword"/>
                ${getError(errors,'confirmPassword')}
            </div>
            <button>Submit</button>
        </form>
    </div>`
        }
    );
};

export default signup;