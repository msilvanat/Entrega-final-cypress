export class ShoppingCartPage {
  constructor() {
    this.showText = 'Show total price';
    this.price = '#price';
    this.checkOutButton = 'Go to Checkout';
  };

  verifyProductName(product) {
    return cy.contains(product);
  };

  verifyPrice(product, price) {
    return cy.xpath(`//p[@name='${product}']//following-sibling::p[@name=${price}]`);
  }

  clickShowTotalPrice() {
    cy.contains(this.showText).click();
  };

  verifyTotalPrice() {
    return cy.get(this.price);
  }

  clickCheckoutButton() {
    cy.contains(this.checkOutButton).click();
  }
};