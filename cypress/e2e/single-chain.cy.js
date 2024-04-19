import swapPage from "../pages/swap-page"
import connectPlugin from "../pages/connect"
import { chainCoinSymbol } from "../fixtures/chain-info"

const CURRENT_CHAIN = "polygon"

describe("Test Page", () => {
    let currentAddress = null
    let initCoinBalance = null

    before(() => {
        cy.getMetamaskWalletAddress().then(address => currentAddress = address)
    })

    beforeEach(() => {
        cy.visit("/")
        connectPlugin.connectWithMetamask()
        cy.getBalanceOnChain(CURRENT_CHAIN, currentAddress).then((rspBalance) => {
            initCoinBalance = rspBalance.toFixed(7)
        })
        swapPage.getPayTokenChooseBtn().contains(chainCoinSymbol.get(CURRENT_CHAIN), { timeout: 10000 })
    })

    describe.only("Buy", () => {
        it("Coin buy token", () => {
            const receiveTokenSymbol = "SHIB"

            cy.fixture("token-info").then(tokenInfo => {
                let currentTokenInfo = tokenInfo[CURRENT_CHAIN]
                cy.selectPayAndReceiveToken(currentTokenInfo["coin"], currentTokenInfo[receiveTokenSymbol])
            })
        })
    })

    it.skip("Simple buy", () => {
        const paySymbol = "MATIC"
        const receiveSymbol = "SHIB"
        const payAmount = 0.0001

        // Type pay amount
        swapPage.getSwapRateGraphStatus().should("not.contains", "Loading").then(() => {
            // swapPage.getPayAmountInput().clear().type(payAmount)
            swapPage.getPayTokenBalance().then(blc => cy.log(blc))
            swapPage.getReceiveTokenBalance().then(blc => cy.log(blc))
        })

        // Select target token
        cy.fixture("token-info").then(tokenInfo => {
            let currentTokenInfo = tokenInfo[TEST_CHAIN]
            cy.selectPayAndReceiveToken(currentTokenInfo[paySymbol], currentTokenInfo[receiveSymbol])
        })

        cy.confirmAndCheckOrder()
        cy.confirmMetamaskTransaction()
    })
})