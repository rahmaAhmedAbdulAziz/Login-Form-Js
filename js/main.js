
const userNameInput = document.getElementById("userNameInput"); 
const userEmail = document.getElementById("userEmail"); 
const userPassword = document.getElementById("userPassword"); 
const signUp = document.getElementById("signUp"); 

let UserInformation;
if(localStorage.getItem("users") == null)
{
    UserInformation = [];
}
else
{
    UserInformation = JSON.parse(localStorage.getItem("users"));
}
function signUp()
{

    userInputsValidation();
    isExist();

    if(userInputsValidation() == true && isExist() == false)
    {
        let user = 
        {
            name:userNameInput.value,
            email:userEmail.value,
            password:userPassword.value
        }

        UserInformation.push(user)
        localStorage.setItem("users", JSON.stringify(UserInformation));
        const confirmMsg = document.getElementById("confirmMsg");
        confirmMsg.classList.replace("d-none", "d-block");
        const signin = document.getElementById("signin")
        signin.classList.replace("d-none", "d-block");
    }
    else
    {
        const tryAgainMsg = document.getElementById("tryAgainMsg");
        tryAgainMsg.classList.replace("d-none", "d-block");
    }

}

function userNameValidation()
{
    const userNameAlert = document.getElementById("userNameAlert");

    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
    if( regex.test(userNameInput.value) == true && userNameInput.value != "")
    {
        userNameInput.classList.add("is-valid");
        userNameInput.classList.remove("is-invalid");
        userNameAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userNameInput.classList.add("is-invalid");
        userNameInput.classList.remove("is-valid");
        userNameAlert.classList.replace("d-none", "d-block");

        return false
    }
}
function userEmailValidation()
{
    const userEmailAlert = document.getElementById("userEmailAlert");

    let regex = /@[a-z]{5,10}(\.com)$/;
    if( regex.test(userEmail.value) == true && userEmail.value != "")
    {
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userEmail.classList.add("is-invalid");
        userEmail.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none", "d-block");

        return false
    }
}
function userPasswordValidation()
{
    let regex = /^.{5,15}$/;
    const userPasswordAlert = document.getElementById("userPasswordAlert");

    if( regex.test(userPassword.value) == true && userPassword.value != "")
    {
        userPassword.classList.add("is-valid");
        userPassword.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userPassword.classList.add("is-invalid");
        userPassword.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");

        return false
    }
}

function userInputsValidation()
{
    userNameValidation();   
    userEmailValidation();
    userPasswordValidation();

    if( (userNameValidation() == true && userEmailValidation() == true && userPasswordValidation() == true))
    {
        return true
    }
    else
    {
        return false
    }
}

function isExist()
{
    let accountExistMsg = document.getElementById("accountExistMsg");
    
    for(let i = 0; i < UserInformation.length; i++)
    {

        if(UserInformation[i].name.toLowerCase() == userNameInput.value.toLowerCase() || UserInformation[i].email.toLowerCase() == userEmail.value.toLowerCase())
        {
            accountExistMsg.classList.replace("d-none", "d-block");
            userNameInput.classList.remove("is-valid");
            userEmail.classList.remove("is-valid");
            userPassword.classList.remove("is-valid");

            return true
        }
    }
    return false
}



var userName = localStorage.getItem("sessionuserName");
function login()
{
    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");
    let loginBtn = document.getElementById("loginBtn");
    let wrongMsg = document.getElementById("wrongMsg");

    if(loginEmail.value == "" || loginPassword.value == "")
    {
        let fillMsg = document.getElementById("fillMsg");
        fillMsg.classList.replace("d-none", "d-block");
        return false
    }

    for(var i = 0; i < UserInformation.length; i++)
    {
        if(UserInformation[i].email.toLowerCase() == loginEmail.value.toLowerCase() && UserInformation[i].password.toLowerCase() == loginPassword.value.toLowerCase())
        {
            
            localStorage.setItem('sessionuserName', UserInformation[i].name)
            loginBtn.setAttribute("href", "welcome.html");
        }
        else
        {
            wrongMsg.classList.replace("d-none", "d-block");
        }
    }
}
function displayWelcomeUser()
{
    document.getElementById("userName").innerHTML = "Welcome "+ userName;

}

function logout() {
    localStorage.removeItem('sessionuserName')
}
