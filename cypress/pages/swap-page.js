class SwapPage{
    // Pay Board
    getPayAmountInput() {
        return cy.get(".px-4 input").first()
    }

    getPayTokenChooseBtn() {
        return cy.get("button.h-9").first()
    }

    // Receive Board
    getReceiveAmountInput() {
        return cy.get(".px-4 input").eq(1)
    }

    getReceiveTokenChooseBtn() {
        return cy.get("button.h-9").last()
    }

    // Slippage
    getSlipInput() {
        return cy.get(".px-4 input").last()
    }

    // Token Select Board
    getContractInput() {
        return cy.get("svg~input")
    }

    getRecommendBoard() {
        return cy.get("li.p-4")
    }

    getTokenList() {
        return cy.get("li.p-2")
    }
}

module.exports = new SwapPage()