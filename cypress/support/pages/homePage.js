export class HomePage {
  constructor() {
    this.onlineShopLink = '#onlineshoplink';
  };

  clickOnlineShopLink() {
    cy.get(this.onlineShopLink).dblclick();
  };
};