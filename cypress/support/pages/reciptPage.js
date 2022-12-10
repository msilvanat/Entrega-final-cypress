export class ReciptPage {
  constructor() {
    this.progressBar = "div[role='progressbar']";
    this.pName = "#name";
    this.creditCard = "#creditCard";
    this.totalPrice = "#totalPrice";
    this.thankButton = "//button[text()='Thank you']";
  }

  verifyProgressBar() {
    return cy.get(this.progressBar);
  }

  verifyFullname(name, lastname) {
    cy.get(this.pName).invoke("text").then(() => {
        cy.contains(name + " " + lastname);
      });
  }

  verifyCreditcard() {
    return cy.get(this.creditCard);
  }

  verifyProduct(product) {
    return cy.xpath(`//p[text()='${product}']`,{timeout: 10000});
  }

  verifyTotalPrice() {
    return cy.get(this.totalPrice);
  }

  verifyThankButton() {
    return cy.xpath(this.thankButton, { timeout: 10000 });
  }
}