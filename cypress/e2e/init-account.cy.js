describe("To Init Connect Status in Metamask", () => {
    const SWAP_ACCOUNT_KEY = Cypress.env("SWAP_ACCOUNT_KEY")

    it.only("Setup Metamask and import the required wallets", () => {
        cy.log(SWAP_ACCOUNT_KEY)
        cy.importMetamaskAccount(SWAP_ACCOUNT_KEY)
    })
})