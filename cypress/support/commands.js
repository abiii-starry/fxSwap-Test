// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import publicPage from "../pages/public-page"
import swapPage from "../pages/swap-page"
import { chainList, chainBrowser } from "../fixtures/chain-info"

Cypress.Commands.add("connectWithMetamask", (chain="polygon") => {
    cy.changeMetamaskNetwork(chain)

    publicPage.getNetworkSelectBtn().click()
    publicPage.getNetworkBoard().contains(chainList.get(chain), { includeShadowDom: true }).click()

    cy.wait(500)
    publicPage.getConnectWalletBtn().click({ force: true })
    publicPage.getConnectBoard().contains("Browser Wallet", { includeShadowDom: true }).click()
})


Cypress.Commands.add("selectToken", (tokenInfo, isPay) => {
    isPay ? swapPage.getPayTokenChooseBtn().click() : swapPage.getReceiveTokenChooseBtn().click()

    if(tokenInfo["contract"] === "coin") {
        swapPage.getRecommendBoard().contains("span", tokenInfo["symbol"]).click()
    } else {
        swapPage.getContractInput().type(tokenInfo["contract"])
        swapPage.getTokenList().contains(tokenInfo["symbol"]).click()
    }
})


Cypress.Commands.add("toConfirmSwap", () => {
    // Todo
})