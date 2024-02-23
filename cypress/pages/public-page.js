class PublicPage{
    // Connect
    getConnectBtn() {
        return cy.get('.justify-end > [data-cy="connect-btn"]')
    }

    getNetworkSelectBtn() {
        return cy.get('w3m-network-button')
    }

    // Switch to chain
    getNetworkBoard() {
        return cy.get("w3m-modal")
    }

    getConnectBoard() {
        return cy.get("w3m-modal").shadow("w3m-router")
    }

    getConnectWalletBtn() {
        // return cy.get("[data-cy='connect-btn']")
        return cy.contains(".text-white", " Connect Wallet ", { matchCase: false })
    }
}

module.exports = new PublicPage()