import swapPage from "../pages/swap-page"

const TEST_CHAIN = "polygon"

describe("Test Page", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.connectWithMetamask()
    })

    it.skip("test page", () => {
        swapPage.getPayAmountInput().type(111)
        swapPage.getReceiveAmountInput().type(222)
        swapPage.getSlipInput().type(33)
    })

    it("simple swap", () => {
        const paySymbol = "SHIB"
        const receiveSymbol = "MATIC"

        cy.fixture("token-info").then(tokenInfo => {
            let targetPayToken = tokenInfo[TEST_CHAIN][paySymbol]
            let targetReceiveToken = tokenInfo[TEST_CHAIN][receiveSymbol]

            cy.selectToken(targetPayToken, true)
            cy.selectToken(targetReceiveToken, false)
        })
        // cy.selectPayToken()
    })
})