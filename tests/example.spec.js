
//const { test, expect } = require('@playwright/test');
const { test, expect } = require('../Fixtures/fixtures');


//const POMManager= require("../PageObjectModel/pom")
const testdata=require("../testData/testdata.json");
const testdata1=require("../testData/testdata1.json");
const testdata2=require("../testData/testdata2.json");
const testdataflaky=require("../testData/testdataflaky.json");

//const TakeScreenshot=require("../Utils/ScreenshotUtil");

test.describe("Login Functionality",()=>{
  test.beforeEach(async({pomanager})=>{
   const login= pomanager.getLogin();
   await login.goto();
  });

test('@Login into the application', async({page,pomanager})=>{

  const login= pomanager.getLogin();
  await login.loginWithValidCredentials(testdata.useremail,testdata.password);
  await expect(page.getByText(testdata.signinmessage)).toBeVisible();
  await pomanager.getLogin().openDashboard();
  await expect(page).toHaveURL(/index.html/);
  await pomanager.getScreenshot().takeScreenshot("Login_Page");

});
test('@Login without credentials', async({page,pomanager})=>{

  const login=pomanager.getLogin();
  await login.loginWithEmptyCredentials();
  await expect(page.getByText(testdata.emailerror)).toBeVisible();
  await expect(page.getByText(testdata.passworderror)).toBeVisible();
  await pomanager.getScreenshot().takeScreenshot("Invalid_Login");

}
);
test('@Login with invalid credentials', async({page,pomanager})=>{

  const login=pomanager.getLogin();
  await login.loginWithInvalidCredentials(testdata.invalidemail,testdata.invalidpassword);
  await expect(page.getByText(testdata.invalidcredentialmsg)).toBeVisible();
  await pomanager.getScreenshot().takeScreenshot("Invalid_Credentials");
});
});

test('@Logout from application',async({page,pomanager})=>{
  //const pomanager = new POMManager(page);

  const login=pomanager.getLogin();
  await login.goto();
  await login.loginWithValidCredentials(testdata.useremail,testdata.password);
  await expect(page.getByText(testdata.signinmessage)).toBeVisible();
  await login.openDashboard();
  await expect(page).toHaveURL(/index.html/);

  const logout=pomanager.getLogout();
  await logout.logoutFromApplication();
  await pomanager.getScreenshot().takeScreenshot("Logout_Page");

} );

test.describe("Registration Functionality",()=>{
  test.beforeEach(async({pomanager})=>{
   const registration= pomanager.getRegister();
   await registration.goto();
   await registration.openMenu();
   await registration.openFormElements();
    })

test('@Register with valid details', async({page,pomanager})=>{
    
  const registration= pomanager.getRegister();
  await expect(page.getByText(testdata1.formstitle)).toBeVisible();
  await registration.registrationForm(
    testdata1.fullname,
    testdata1.email,
    testdata1.password,
    testdata1.phonenumber,
    testdata1.dob,
    testdata1.country,
    testdata1.gender,
    testdata1.skills,
    testdata1.entertext);
  await expect(page.getByText(testdata1.successmessage)).toBeVisible(); 
  await pomanager.getScreenshot().takeScreenshot("Registration_Result");
})
test('@Register without Mandatory fields',async({page,pomanager})=>{
     
  const registration= pomanager.getRegister();
  await expect(page.getByText(testdata1.formstitle)).toBeVisible();
  await registration.registerWithoutMandatoryCredentials(
    testdata1.phonenumber,
    testdata1.dob,
    testdata1.country,
    testdata1.gender,
    testdata1.skills,
    testdata1.entertext);
  await expect(page.getByText(testdata1.fullnameerror)).toBeVisible();
  await expect(page.getByText(testdata1.emailerror)).toBeVisible();
  await expect(page.getByText(testdata1.passworderror)).toBeVisible();
  await expect(page.getByText(testdata1.checkboxerror)).toBeVisible();
  await pomanager.getScreenshot().takeScreenshot("Registration without mandatory credentials");
})
test('@Register with empty fields',async({page,pomanager})=>{

  const registration= pomanager.getRegister();
  await expect(page.getByText(testdata1.formstitle)).toBeVisible();
  await registration.registerWithEmptyCredentials();
  await expect(page.getByText(testdata1.fullnameerror)).toBeVisible();
  await expect(page.getByText(testdata1.emailerror)).toBeVisible();
  await expect(page.getByText(testdata1.passworderror)).toBeVisible();
  await expect(page.getByText(testdata1.checkboxerror)).toBeVisible();
  await pomanager.getScreenshot().takeScreenshot("Registration with empty crenetials");
})
});

test('flaky functionality', async({page,pomanager})=>{
  //const pomanager=new POMManager(page);
  //const screenshot= pomanager.getScreenshot();
  const flaky= pomanager.getFlaky();
  await flaky.goto();
  await flaky.openMenu();
  await flaky.openFlakyElements();
  await expect(flaky.sectionTitle).toHaveText(testdataflaky.title);
  await pomanager.getScreenshot().takeScreenshot("Flaky_Page1");
  await flaky.triggerSpawnButton();

  await expect(flaky.clickmebutton).toBeVisible();
  await pomanager.getScreenshot().takeScreenshot("Flaky_Page2");
  await expect(flaky.changingText).toHaveText(testdataflaky.changingtext1);
  await pomanager.getScreenshot().takeScreenshot("Flaky_Page");

});

test("Shopping Cart End to end functionality",async ({page,pomanager})=>{
  //const pomanager= new POMManager(page);
  const shoppingcart=pomanager.getShopping();
  await shoppingcart.goto();
  await shoppingcart.openMenu();
  await shoppingcart.openShoppingElements();
  await shoppingcart.selectandAddProduct(testdata2.productname);
  await shoppingcart.applyCouponAndCheckout(testdata2.couponcode);
  await shoppingcart.fillCheckoutDetails(testdata2.fullname,testdata2.address,testdata2.city,testdata2.pincode,testdata2.phonenumber);
  await shoppingcart.selectPaymentAndPlaceOrder();
  await expect(page.getByText(testdata2.orderplacedmsg)).toBeVisible();
  await  pomanager.getScreenshot().takeScreenshot("Shopping_cart");


});
test("buy now",async({page,pomanager})=>{
    const buyproductnow1=pomanager.getShopping();
    await buyproductnow1.goto();
    await buyproductnow1.openMenu();
    await buyproductnow1.openShoppingElements();
    await buyproductnow1.buyProductNow(testdata2.productname);
    await pomanager.getScreenshot().takeScreenshot("viible_Shopping_cart-byyy");
    await buyproductnow1.fillCheckoutDetails(testdata2.fullname,testdata2.address,testdata2.city,testdata2.pincode,testdata2.phonenumber);
    await buyproductnow1.selectPaymentAndPlaceOrder();
    await expect(page.getByText(testdata2.orderplacedmsg)).toBeVisible();
await pomanager.getScreenshot().takeScreenshot("Shopping_cart-byyy");


});
