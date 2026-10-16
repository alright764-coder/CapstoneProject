class Login{
    constructor(page){
        this.page=page;

        this.loginbutton=page.locator('#navLoginBtn');
        this.loginemail=page.locator('#loginEmail');
        this.loginpassword=page.locator('#loginPassword');
        this.signInbutton=page.getByRole('button', {name:"Sign In"});
        this.dashboardButton=page.locator('#goToDashboard');
        }
// Navigate to the application
    async goto(){
        await this.page.goto('/');
    }

//Application Login
    async loginWithValidCredentials(useremail,password){
      
      await this.loginbutton.click();
      await this.loginemail.fill(useremail);
      await this.loginpassword.fill(password);
      await this.signInbutton.click(); 
    }

// Negative scenario testing
    async loginWithEmptyCredentials() {
        await this.loginbutton.click();
        await this.signInbutton.click();
    }

    async loginWithInvalidCredentials(invalidemail,invalidpassword){
        await this.loginbutton.click();
        await this.loginemail.fill(invalidemail);
        await this.loginpassword.fill(invalidpassword);
        await this.signInbutton.click(); 
    }

//Open dashboard
    async openDashboard(){
    await this.dashboardButton.click();
    }  
    
}module.exports=Login;