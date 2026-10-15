class Logout{
    constructor(page){
        this.page=page;
        this.logoutbutton=page.locator('#navLogoutBtn');

    }
     async goto(){
        await this.page.goto('/');
    }
    //Logout from Application
    
    async logoutFromApplication(){
    await this.logoutbutton.click();
    }
}module.exports=Logout;