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
import { chainList, chainBrowser, chainReqArg, chainCoinSymbol} from "../fixtures/chain-info"

let syncDecimalLength = (num) => {
    const orderDecimalLen = 6
    let decimalLen = Number.isInteger(num) ? 0 : num.toString().split(".")[1].length;

    if (decimalLen === 0) {
        return num
    } else {
        return parseFloat(num.toFixed(orderDecimalLen))
    }
}

Cypress.Commands.add("getBalanceOnChain", (chain, address) => {
    const requestUrl = `https://api.fxwallet.com/wallet/${chainReqArg.get(chain)}/balance`

    return cy.request({
        method: "GET",
        url: requestUrl,
        headers: {
            "x-pubkey": address
        }
    }).its("body.balance")
})

Cypress.Commands.add("connectWithMetamask", (chain="polygon") => {
    cy.changeMetamaskNetwork(chain)

    publicPage.getNetworkSelectBtn().click()
    publicPage.getNetworkBoard().contains(chainList.get(chain), { includeShadowDom: true }).click()

    cy.wait(500)
    publicPage.getConnectWalletBtn().click({ force: true })
    publicPage.getConnectBoard().contains("Browser Wallet", { includeShadowDom: true }).click()
})


Cypress.Commands.add("selectToken", (tokenInfo, isPayToken) => {
    isPayToken ? swapPage.getPayTokenChooseBtn().click() : swapPage.getReceiveTokenChooseBtn().click()

    if(tokenInfo["contract"] === "coin") {
        swapPage.getContractInput().type(tokenInfo["symbol"])
    } else {
        swapPage.getContractInput().type(tokenInfo["contract"])
    }
    swapPage.getTokenList().contains(tokenInfo["symbol"]).click()
})


Cypress.Commands.add("selectPayAndReceiveToken", (payToken, receiveToken) => {
    cy.selectToken(payToken, true)
    cy.selectToken(receiveToken, false)
})


Cypress.Commands.add("buyToken", (amount) => {
    swapPage.getPayAmountInput().type(amount)
    swapPage.getConfirmBtn().should("not.have.class", "disabled").click()
})


Cypress.Commands.add("sellToken", () => {
    swapPage.getReceiveAmountInput().type(amount)
    swapPage.getConfirmBtn().should("not.have.class", "disabled").click()
})


Cypress.Commands.add("checkOrderInfo", () => {
    function handleDecimal(num) {
        return Number.isInteger(num) ? num.toString() : num.toFixed(6)
    }
    
    // Todo
})


// Compare the value entered in the Token amount input with the value in the Order panel
Cypress.Commands.add("confirmAndCheckOrder", () => {
    swapPage.getConfirmBtn().should("have.text", "Confirm").then($confirmBtn => {
        let payInputAmount = parseFloat(Cypress.$(".mt-4 > .px-4 > .gap-4 > div.relative > .relative").val())
        let receiveInputAmount = parseFloat(Cypress.$(".-z-5 > .px-4 > .gap-4 > div.relative > .relative").val())

        cy.wrap($confirmBtn).click()

        swapPage.getPayTokenInfo().then(payTokenInfo => {
            cy.wrap(syncDecimalLength(payInputAmount)).should("equal", parseFloat(payTokenInfo))
        })
        
        swapPage.getReceiveTokenInfo().then(receiveTokenInfo => {
            cy.wrap(syncDecimalLength(receiveInputAmount)).should("equal", parseFloat(receiveTokenInfo))
        })

        swapPage.getOrderConfirmBtn().click()
    })
})