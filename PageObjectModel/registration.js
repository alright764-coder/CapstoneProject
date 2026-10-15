class Registration{
    constructor(page){
        this.page=page;
        this.menuLink=page.getByRole('link',{name:'Menu'});
        this.formElementsLink=page.getByTestId('nav-forms');
        this.fullnameInput=page.locator('#fullName');
        this.emailInput=page.locator('#email');
        this.passwordInput=page.locator('#password');
        this.phoneNumberInput=page.locator('#phone');
        this.dateOfBirthInput=page.locator('#dob');
        this.countryDropdown=page.locator('#country');
        this.genderOption=page.getByTestId('radio-gender');
        this.skillOption=page.getByTestId('checkbox-skills');
        this.bioInput=page.locator('#bio');
        this.termsCheckbox=page.locator('#terms')
        this.registerButton=page.getByRole('button', {name:"Register"});
    };
      async goto(){
        await this.page.goto('/');
    };

    // View Menu Option

     async openMenu() {
        await this.menuLink.click();
    };

    // Open the Form Elements section

    async openFormElements() {
        await this.formElementsLink.click();
    };

    // Register with valid details

    async registrationForm(fullname,email,password,phonenumber,dob,country,gender,skills,entertext){
        
        await this.fullnameInput.fill(fullname);
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password);
        await this.phoneNumberInput.fill(phonenumber);
        await this.dateOfBirthInput.fill(dob);
        await this.countryDropdown.selectOption({label:country});
         await this.page.getByLabel(gender, { exact: true }).check();
    // Select the skill checkbox
        await this.page.getByLabel(skills, { exact: true }).check();
        await this.bioInput.fill(entertext);
        await this.termsCheckbox.click();
        await this.registerButton.click();
    };
    //Negative scenario testing

    async registerWithoutMandatoryCredentials(phonenumber,dob,country,gender,skills,entertext) {
        await this.phoneNumberInput.fill(phonenumber);
        await this.dateOfBirthInput.fill(dob);
        await this.countryDropdown.selectOption({label:country});
        await this.page.getByLabel(gender, { exact: true }).check();
        await this.page.getByLabel(skills, { exact: true }).check();
        await this.bioInput.fill(entertext);
        await this.registerButton.click();
        
};

    async registerWithEmptyCredentials() {
    await this.registerButton.click();
        
};
} module.exports=Registration;
