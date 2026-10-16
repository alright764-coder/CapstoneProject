const Login = require("./login");
const Registration = require("./registration");
const Logout=require("./logout");
const Flaky=require("./flaky");
const Shopping=require("./shoppingcart");
const TakeScreenshot=require("../Utils/ScreenshotUtil");


class POMManager{
    constructor(page){
        this.page=page;
        this.login= new Login(page);
        this.registration=new Registration(page);   
        this.logout=new Logout(page); 
        this.flaky= new Flaky(page);
        this.shopping= new Shopping(page);
        this.takeScreenshot= new TakeScreenshot(page);
    };

    getLogin(){
        return this.login;
    };

    getRegister(){
        return this.registration;
    };
    getLogout(){
        return this.logout;
    };
    getFlaky(){
        return this.flaky;
    };
    getShopping(){
        return this.shopping;
    };
    getScreenshot() {
    return this.takeScreenshot;
    };


}module.exports=POMManager;