/// <reference types="cypress" />
const constants = require('../support/constants');
import { HomePage } from '../support/pages/homePage';
import { ProductsPage } from '../support/pages/productsPage';
import { ShoppingCartPage } from '../support/pages/shoppingCartPage';
import { CheckoutPage } from '../support/pages/checkoutPage';
import { ReciptPage } from '../support/pages/reciptPage';

describe("Testing Online Shop Module - Final Project Pushing It", () => {
  const username = constants.loginData.username;
  const password = constants.loginData.password;
  let checkoutData;
  let productsData;
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkoutPage = new CheckoutPage();
  const reciptPage = new ReciptPage();

  before("Json Data, Register, Login and visit", () => {
    cy.fixture('checkoutData').then(data => {
      checkoutData = data;
    });
    cy.fixture('products').then(data => {
      productsData = data;
    });

  cy.request({
    url: "https://pushing-it.onrender.com/api/register",
    method: "POST",
    body: {
      username,
      password,
      gender: "Female",
      day: "15",
      month: "March",
      year: "1995",
    },
  }).then((response) => {
    expect(response.status).equal(200);
  });

  cy.request({
    method: "POST",
    url: "https://pushing-it.onrender.com/api/login",
    body: {
      username,
      password,
    },
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token);
    window.localStorage.setItem("user", response.body.user.username);
  });

  cy.visit('');
});

  it('Add two product to the shopping cart, verify total price, complete checkout and verify the information on the purchase receipt', () => {
    homePage.clickOnlineShopLink();
    productsPage.clickAddButton(productsData.firstProduct.value);
    productsPage.clickCloseModal();
    productsPage.clickAddButton(productsData.secondProduct.value);
    productsPage.clickCloseModal();
    productsPage.clickGoShoppingCart();
    shoppingCartPage.verifyProductName(productsData.firstProduct.value).should('have.text', productsData.firstProduct.value);
    shoppingCartPage.verifyProductName(productsData.secondProduct.value).should('have.text', productsData.secondProduct.value);
    shoppingCartPage.verifyPrice(productsData.firstProduct.value, productsData.firstProduct.price).should('have.text', `$${productsData.firstProduct.price}`);
    shoppingCartPage.verifyPrice(productsData.secondProduct.value, productsData.secondProduct.price).should('have.text', `$${productsData.secondProduct.price}`);
    shoppingCartPage.clickShowTotalPrice();
    shoppingCartPage.verifyTotalPrice().invoke('text').should('be.equal', `${productsData.firstProduct.price + productsData.secondProduct.price}`);
    shoppingCartPage.clickCheckoutButton();
    checkoutPage.typeFirstName(checkoutData.firstname);
    checkoutPage.typeLastName(checkoutData.lastname);
    checkoutPage.typeCardNumber(checkoutData.cardnumber);
    checkoutPage.clickSubmitButton();
    reciptPage.verifyProgressBar().should("exist");
    reciptPage.verifyThankButton().should("have.text", "Thank you");
    reciptPage.verifyFullname(checkoutData.firstname, checkoutData.lastname);
    reciptPage.verifyProduct(productsData.firstProduct.value).should("have.text", productsData.firstProduct.value);
    reciptPage.verifyProduct(productsData.secondProduct.value).should("have.text", productsData.secondProduct.value);
    reciptPage.verifyCreditcard().should("have.text", checkoutData.cardnumber);
    reciptPage.verifyTotalPrice().invoke('text').should('be.equal', `You have spent $${productsData.firstProduct.price + productsData.secondProduct.price}`);

  });

  after('Delete user', () => {
    cy.request({
      url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
      method: "DELETE",
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });
});