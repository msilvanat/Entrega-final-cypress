export class ProductsPage {
  constructor() {
    this.addButton = 'button';
    this.closeModalButton = '#closeModal';
    this.goShoppingButton = '//button[@id="goShoppingCart"]';
  };

  clickAddButton(product) {
    cy.contains(product).siblings(this.addButton).click();
  };

  clickCloseModal() {
    cy.get(this.closeModalButton).click();
  };

  clickGoShoppingCart() {
    cy.xpath(this.goShoppingButton).click();
  };
};