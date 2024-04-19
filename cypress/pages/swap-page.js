class SwapPage{
    // Pay Board
    getPayAmountInput() {
        return cy.get(".px-4 input").first()
    }

    getPayTokenBalance() {
        return cy.get(".pt-4 p").first().invoke("text")
    }

    getPayTokenChooseBtn() {
        return cy.get("button.h-9").first()
    }

    getBalanceLabel() {
        return cy.get(".mt-4 .text-xs > span", { timeout: 10000 })
    }

    // Receive Board
    getReceiveAmountInput() {
        return cy.get(".px-4 input").eq(1)
    }

    getReceiveTokenBalance() {
        return cy.get(".pt-4 p").last().invoke("text")
    }
    
    getReceiveInputLoad() {
        return this.getReceiveAmountInput().next()
    }

    getReceiveTokenChooseBtn() {
        return cy.get("button.h-9").last()
    }

    // Slippage
    getSlipInput() {
        return cy.get(".px-4 input").last()
    }

    // Confirm Button
    getConfirmBtn() {
        return cy.get(".mt-4 > button", { timeout: 10000 })
    }

    // Token Select Board
    getContractInput() {
        return cy.get("svg ~ input")
    }

    getRecommendBoard() {
        return cy.get("li.p-4")
    }

    getTokenList() {
        return cy.get("li.p-2")
    }

    // Review Order Board
    getReviewOrderBoard() {
        return cy.get(".p-6")
    }

    getPayTokenInfo() {
        return cy.get(".my-1 > .text-md").first().invoke("text")
    }

    getReceiveTokenInfo() {
        return cy.get(".my-1 > .text-md").last().invoke("text")
    }

    getOrderConfirmBtn() {
        return cy.contains(".p-6 > .mt-4 > button", " Confirm ")
    }

    getOrderCancelBtn() {
        return cy.contains(".p-6 > .mt-4 > button", " Cancel ")
    }

    getSwapRateGraphStatus() {
        return cy.get(".mt-8 p.text-sm")
    }
}

module.exports = new SwapPage()