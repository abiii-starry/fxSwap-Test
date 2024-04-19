import ConnectPlugin from "../pages/connect"

describe("Plugin test", () => {
    beforeEach(() => {
        
    })

    it("case1", () => {
        cy.visit("/")
        // ConnectPlugin.connectWithMetamask()
        cy.wait(2000).then(() => {
            // cy.log(ConnectPlugin.getSingleChainNetwork)
            // ConnectPlugin.switchNetwork("Base")
            ConnectPlugin.connectWithMetamask()
            ConnectPlugin.currentCoinBalance.then(blc => cy.log(blc))
            ConnectPlugin.disconnect()
        })
        
    })
})