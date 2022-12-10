export class CheckoutPage {
  constructor() {
    this.firstnameInput = '#FirstName';
    this.lastnameInput = '#lastName';
    this.cardNumberInput = '#cardNumber';
    this.submitButton = 'button[type="submit"]';
  };

  typeFirstName(firstname) {
    cy.get(this.firstnameInput).type(firstname);
  };

  typeLastName(lastname) {
    cy.get(this.lastnameInput).type(lastname);
  };

  typeCardNumber(cardnumber) {
    cy.get(this.cardNumberInput).type(cardnumber);
  }

  clickSubmitButton() {
    cy.get(this.submitButton).click();
  }
};