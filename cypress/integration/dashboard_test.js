describe('Visit the app', () => {
    it("Check Login Page", ()=> {
        // Go to login Page
        cy.visit("/login")

        // Check it contains username, password, login button and forgot password
        cy.get("input").contains("username")
    })
})