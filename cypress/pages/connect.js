import swapPage from "./swap-page"

class ConnectPlugin {
    constructor() {
        this.connectBtnLocator = ".py-2.px-6"
        this.networkListLocator = "div[role='radiogroup']"
        this.topBalanceBoardLocator = "img+div>span:first-child"
        this.connectStatusBarLocator = ".shadow-md"
        this.userMsgBoardLocator = "div[id^='headlessui-dialog-panel']"
    }

    get connectBtn() {
        return cy.get(this.connectBtnLocator)
    }

    get connectMethodSelectBoard() {
        return cy.get("w3m-modal").shadow("w3m-router")
    }

    get networkSelectBtn() {
        return cy.get("span.items-center>span", { timeout: 8000 }).first()
    }

    get getSingleChainNetwork() {
        return cy.get("span.items-center>span", { timeout: 8000 }).first().invoke("text")
    }

    get currentCoinBalance() {
        return cy.get(this.topBalanceBoardLocator).invoke("text")
    }

    get userMsgBoard() {
        return cy.get(this.userMsgBoardLocator)
    }

    switchNetwork(targetNetwork="Polygon") {
        this.networkSelectBtn.click()
        cy.get(this.networkListLocator).contains(targetNetwork, { matchCase: false }).click()
    }

    connectWithMetamask(chain="Polygon") {
        // Need to manually agree to add chain when connect it for first time 
        cy.changeMetamaskNetwork(chain)

        this.getSingleChainNetwork.then(currentNetwork => {
            currentNetwork !== chain ? this.switchNetwork(chain) : cy.log(`Already in the target network: ${chain}`)
        })
        this.connectBtn.click()
        this.connectMethodSelectBoard.contains("Browser Wallet", { includeShadowDom: true }).click()
    }

    disconnect() {
        cy.get(this.connectStatusBarLocator).click()
        this.userMsgBoard.find("button:first-child").click()
    }
}

module.exports = new ConnectPlugin()