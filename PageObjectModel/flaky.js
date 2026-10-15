class Flaky{
    constructor(page){

        this.page=page;
        this.menuLink=page.getByRole('link',{name:'Menu'});
        this.flakyElementsLink=page.getByRole('link',{name:'Flaky Elements'});
        this.sectionTitle = page.locator('#flakyTitle');
        //this.randombox=page.locator('#randomAppearBox');
        this.spawnButton = page.getByRole('button', { name: 'Spawn Button'});
        this.clickmebutton= page.getByRole('button',{name:"Click Me!"});
        this.changingText=page.getByTestId("changing-text-box");
}
    
    async goto(){
     await this.page.goto('/');    

}
      // Open the Menu
    async openMenu() {
    await this.menuLink.click();
    }

    // Open the Flaky Elements section
    async openFlakyElements() {
    await this.flakyElementsLink.click();
    }

    // Trigger the dynamic element
    async triggerSpawnButton() {
        await this.spawnButton.click();
    }


}module.exports=Flaky;