class User {
    constructor (){
        // this.user = n;
    }
    #checkUsername(username) {
        let value = username.includes("#") ? false : true;
        return value;
    }
    #checkPassword(password){
        let value = password.length > 4 ? true : false;
        return value;
    }
    #checkMobileNumber(Number){
        let value = Number.length == 10 ? true : false;
        return value;
    }

    async Signup(n, e, u, p, m, d) {

        let isValidated = this.#checkUsername(u) && this.#checkPassword(p) && this.#checkMobileNumber(m);

        if(isValidated) {
            this.name = n;
            this.email = e;
            this.username = u;
            this.password = p;
            this.mobile = m;
            this.description = d;

            let actual_data = JSON.stringify(this);

            try{
                let res = await fetch('https://masai-api-mocker.herokuapp.com/auth/register',{
                    method: 'POST',
                    body: actual_data,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                let data = await res.json();
                console.log("data:",data);
                console.log("User registered Succesfully!");


            }catch(error){
                console.log("error:",error);
            }

        }
    }

    async Login(u,p){
        this.username = u;
        this.password = p;

        let data_received = JSON.stringify(this);
//make api call
        try{
            let res = await fetch('https://masai-api-mocker.herokuapp.com/auth/login',{
                method: 'POST',
                body: data_received,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let data = await res.json();
            let username = document.getElementById("login-username").value;
            getprofile(username,data.token);
            // console.log(data);
            
        }catch(error){
            console.log("error:",error);
        }
        
    }
}

let user1 = new User ();


function Register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value;
    const description = document.getElementById("description").value;

    user1.Signup(name, email, username, password, mobile, description);

}

function Login() {
//collect username & password
//envoke async Login(user1.login(username,password))
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    user1.Login(username, password);
}

async function getprofile(username,token){
    let api = `https://masai-api-mocker.herokuapp.com/user/${username}`;
    let response = await fetch(api,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
    let data = await response.json();
    console.log(data);
}