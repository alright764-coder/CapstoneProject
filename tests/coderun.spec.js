
const { test, expect } = require('../Fixtures/fixtures');

const testdata=require("../testData/testdatalogin.json");
const testdata1=require("../testData/testdataform.json");
const testdata2=require("../testData/testdatacart.json");
const testdataflaky=require("../testData/testdataflaky.json");


test.describe("Login Functionality",()=>{
  test.beforeEach(async({pomanager})=>{
   const login= pomanager.getLogin();
   await login.goto();
  });

test('@Login into the application', async({page,pomanager})=>{

  const login= pomanager.getLogin();
  await login.loginWithValidCredentials(
    testdata.useremail,
    testdata.password);
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

  const login=pomanager.getLogin();
  await login.goto();

  await login.loginWithValidCredentials(
    testdata.useremail,
    testdata.password);
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
  await pomanager.getScreenshot().takeScreenshot("Registration with empty credentials");
})
});

test('@flaky functionality', async({page,pomanager})=>{
  //const pomanager=new POMManager(page);
  //const screenshot= pomanager.getScreenshot();
  const flaky= pomanager.getFlaky();
  await flaky.goto();
  await flaky.openMenu();
  await flaky.openFlakyElements();
  await expect(flaky.sectionTitle).toHaveText(testdataflaky.title);
  await expect(flaky.randombox).toHaveText(testdataflaky.randomAppearText);
  await pomanager.getScreenshot().takeScreenshot("Flaky_Page_Heading");
  await flaky.triggerSpawnButton();
  await expect(flaky.clickmebutton).toBeVisible();

});

test.describe("Shopping Cart Functionality",()=>{
  test.beforeEach(async({pomanager})=>{
    const shoppingcart=pomanager.getShopping();
    await shoppingcart.goto();
    await shoppingcart.openMenu();
    await shoppingcart.openShoppingElements();
  });

test("@Shopping Cart End to end functionality using Add to Cart Button",async ({page,pomanager})=>{
  
  const shoppingcart=pomanager.getShopping();
  await shoppingcart.selectandAddProduct(testdata2.productname);
  await shoppingcart.applyCouponAndCheckout(testdata2.couponcode);
  await shoppingcart.fillCheckoutDetails(
    testdata2.fullname,
    testdata2.address,
    testdata2.city,
    testdata2.pincode,
    testdata2.phonenumber);
  await shoppingcart.selectPaymentAndPlaceOrder();
  await expect(page.getByText(testdata2.orderplacedmsg)).toBeVisible();
  await pomanager.getScreenshot().takeScreenshot("Order_placed_displayed_");


});
test("@Shopping Cart End to end functionality using Buy Now Button",async({page,pomanager})=>{
    const shoppingcart=pomanager.getShopping();
    await shoppingcart.buyProductNow(testdata2.productname);
    await pomanager.getScreenshot().takeScreenshot("product_selected_successfully");
    await shoppingcart.fillCheckoutDetails(
      testdata2.fullname,
      testdata2.address,
      testdata2.city,
      testdata2.pincode,
      testdata2.phonenumber);
    await shoppingcart.selectPaymentAndPlaceOrder();
    await expect(page.getByText(testdata2.orderplacedmsg)).toBeVisible();
    await pomanager.getScreenshot().takeScreenshot("order_placed_popupmessage");

});
});
