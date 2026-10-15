# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.js >> buy now
- Location: tests\example.spec.js:153:1

# Error details

```
TypeError: pomanager.getCrt is not a function
```

# Test source

```ts
  54  |   await login.loginWithValidCredentials(testdata.useremail,testdata.password);
  55  |   await expect(page.getByText(testdata.signinmessage)).toBeVisible();
  56  |   await login.openDashboard();
  57  |   await expect(page).toHaveURL(/index.html/);
  58  | 
  59  |   const logout=pomanager.getLogout();
  60  |   await logout.logoutFromApplication();
  61  |   await pomanager.getScreenshot().takeScreenshot("Logout_Page");
  62  | 
  63  | } );
  64  | 
  65  | test.describe("Registration Functionality",()=>{
  66  |   test.beforeEach(async({pomanager})=>{
  67  |    const registration= pomanager.getRegister();
  68  |    await registration.goto();
  69  |    await registration.openMenu();
  70  |    await registration.openFormElements();
  71  |     })
  72  | 
  73  | test('@Register with valid details', async({page,pomanager})=>{
  74  |     
  75  |   const registration= pomanager.getRegister();
  76  |   await expect(page.getByText(testdata1.formstitle)).toBeVisible();
  77  |   await registration.registrationForm(
  78  |     testdata1.fullname,
  79  |     testdata1.email,
  80  |     testdata1.password,
  81  |     testdata1.phonenumber,
  82  |     testdata1.dob,
  83  |     testdata1.country,
  84  |     testdata1.gender,
  85  |     testdata1.skills,
  86  |     testdata1.entertext);
  87  |   await expect(page.getByText(testdata1.successmessage)).toBeVisible(); 
  88  |   await pomanager.getScreenshot().takeScreenshot("Registration_Result");
  89  | })
  90  | test('@Register without Mandatory fields',async({page,pomanager})=>{
  91  |      
  92  |   const registration= pomanager.getRegister();
  93  |   await expect(page.getByText(testdata1.formstitle)).toBeVisible();
  94  |   await registration.registerWithoutMandatoryCredentials(
  95  |     testdata1.phonenumber,
  96  |     testdata1.dob,
  97  |     testdata1.country,
  98  |     testdata1.gender,
  99  |     testdata1.skills,
  100 |     testdata1.entertext);
  101 |   await expect(page.getByText(testdata1.fullnameerror)).toBeVisible();
  102 |   await expect(page.getByText(testdata1.emailerror)).toBeVisible();
  103 |   await expect(page.getByText(testdata1.passworderror)).toBeVisible();
  104 |   await expect(page.getByText(testdata1.checkboxerror)).toBeVisible();
  105 |   await pomanager.getScreenshot().takeScreenshot("Registration without mandatory credentials");
  106 | })
  107 | test('@Register with empty fields',async({page,pomanager})=>{
  108 | 
  109 |   const registration= pomanager.getRegister();
  110 |   await expect(page.getByText(testdata1.formstitle)).toBeVisible();
  111 |   await registration.registerWithEmptyCredentials();
  112 |   await expect(page.getByText(testdata1.fullnameerror)).toBeVisible();
  113 |   await expect(page.getByText(testdata1.emailerror)).toBeVisible();
  114 |   await expect(page.getByText(testdata1.passworderror)).toBeVisible();
  115 |   await expect(page.getByText(testdata1.checkboxerror)).toBeVisible();
  116 |   await pomanager.getScreenshot().takeScreenshot("Registration with empty crenetials");
  117 | })
  118 | });
  119 | 
  120 | test('flaky functionality', async({page,pomanager})=>{
  121 |   //const pomanager=new POMManager(page);
  122 |   //const screenshot= pomanager.getScreenshot();
  123 |   const flaky= pomanager.getFlaky();
  124 |   await flaky.goto();
  125 |   await flaky.openMenu();
  126 |   await flaky.openFlakyElements();
  127 |   await expect(flaky.sectionTitle).toHaveText(testdataflaky.title);
  128 |   await pomanager.getScreenshot().takeScreenshot("Flaky_Page1");
  129 |   await flaky.triggerSpawnButton();
  130 | 
  131 |   await expect(flaky.clickmebutton).toBeVisible();
  132 |   await pomanager.getScreenshot().takeScreenshot("Flaky_Page2");
  133 |   await expect(flaky.changingText).toHaveText(testdataflaky.changingtext1);
  134 |   await pomanager.getScreenshot().takeScreenshot("Flaky_Page");
  135 | 
  136 | });
  137 | 
  138 | test("Shopping Cart End to end functionality",async ({page,pomanager})=>{
  139 |   //const pomanager= new POMManager(page);
  140 |   const shoppingcart=pomanager.getShopping();
  141 |   await shoppingcart.goto();
  142 |   await shoppingcart.openMenu();
  143 |   await shoppingcart.openShoppingElements();
  144 |   await shoppingcart.selectandAddProduct(testdata2.productname);
  145 |   await shoppingcart.applyCouponAndCheckout(testdata2.couponcode);
  146 |   await shoppingcart.fillCheckoutDetails(testdata2.fullname,testdata2.address,testdata2.city,testdata2.pincode,testdata2.phonenumber);
  147 |   await shoppingcart.selectPaymentAndPlaceOrder();
  148 |   await expect(page.getByText(testdata2.orderplacedmsg)).toBeVisible();
  149 |   await  pomanager.getScreenshot().takeScreenshot("Shopping_cart");
  150 | 
  151 | 
  152 | });
  153 | test("buy now",async({page,pomanager})=>{
> 154 |     const buyproductnow1=pomanager.getCrt();
      |                                    ^ TypeError: pomanager.getCrt is not a function
  155 |     await buyproductnow1.goto();
  156 |     await buyproductnow1.openMenu();
  157 |     await buyproductnow1.openShoppingElements();
  158 |     await buyproductnow1.buyProductNow(testdata2.productname);
  159 |     await pomanager.getScreenshot().takeScreenshot("viible_Shopping_cart-byyy");
  160 |     await buyproductnow1.fillCheckoutDetails(testdata2.fullname,testdata2.address,testdata2.city,testdata2.pincode,testdata2.phonenumber);
  161 |     await buyproductnow1.selectPaymentAndPlaceOrder();
  162 |     await expect(page.getByText(testdata2.orderplacedmsg)).toBeVisible();
  163 | await pomanager.getScreenshot().takeScreenshot("Shopping_cart-byyy");
  164 | 
  165 | 
  166 | });
  167 | 
```