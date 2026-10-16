class Shopping{
    constructor(page){
        this.page=page;

        this.product=page.locator('.shop-card-title');
        this.productname=page.locator('.shop-card-actions');
        this.menuLink=page.getByRole('link',{name:'Menu'});
        this.shoppingElementsLink=page.getByRole('link',{name:'Shopping'});
        //page.getByRole('name',{button:"Add to Cart"});
       // page.getByRole('name',{button:"Buy Now"});      

       this.couponcodeInput=page.locator('#shopCouponInput');
       this.applyCouponbutton=page.getByRole('button',{name:"Apply"});
       this.couponcodeMessage=page.locator('#shopCouponMsg');

       this.checkoutButton=page.locator('#shopCheckoutBtn');
       this.checkoutModal=page.locator('.shop-checkout-modal');

       this.fullnameInput=page.locator('#shopFullName');
       this.addressInput=page.locator('#shopAddress');
       this.citynameInput=page.locator('#shopCity');
       this.pincodeInput=page.locator('#shopPincode');
       this.phonenumberInput=page.locator('#shopPhone');

       this.continueToPaymentButton=page.locator('#shopToPayment');
       this.selectPaymentmethod=page.getByTestId('pay-option-cod');
       this.placeorderButton=page.locator('#shopPlaceOrder');
       
       this.orderSuccessheading=page.getByRole('heading', {name: "Order Placed Successfully!"})
     };

    // Navigate to the application
    async goto(){
        await this.page.goto('/');
    };
    
    // View Menu Option
     async openMenu() {
        await this.menuLink.click();
    };

    // Open the Shopping section
    async openShoppingElements() {
        await this.shoppingElementsLink.click();
    };

     //Add product to Cart  
    async selectandAddProduct(productname){
    await this.product.first().waitFor();
    console.log(await this.product.allTextContents());
    const count1= await this.product.count();
    console.log(count1);

    for(let i=0;i<count1;i++){
        
        if(await this.product.nth(i).textContent()===productname)
            {
            await this.productname.nth(i).locator("text=Add to cart").click();
           break;
            };
        };
    };
    async applyCouponAndCheckout(couponCode){
        await this.couponcodeInput.fill(couponCode);
        await this.applyCouponbutton.click();
        await this.checkoutButton.click();
    };
//Buy Product using Buy Now Button
    async buyProductNow(productname) {
    await this.product.first().waitFor();
    console.log(await this.product.allTextContents());
    //const productname="Lamborghini Huracan";
    const count1= await this.product.count();
    console.log(count1);

    for(let i=0;i<count1;i++){
        
        if(await this.product.nth(i).textContent()===productname)
            {
            await this.productname.nth(i).locator("text=Buy Now").click();
           break;
            };
        };
    
    };
    //Checkout the product from the Checkout modal
    
    async fillCheckoutDetails(
        fullName,address,city,pincode,phoneNumber) {
        await this.fullnameInput.fill(fullName);
        await this.addressInput.fill(address);
        await this.citynameInput.fill(city);
        await this.pincodeInput.fill(pincode);
        await this.phonenumberInput.fill(phoneNumber);
        await this.continueToPaymentButton.click();
    };

    // Select payment and place the order
    async selectPaymentAndPlaceOrder() {
        await this.selectPaymentmethod.click();
        await this.placeorderButton.click();
    };

}module.exports=Shopping;