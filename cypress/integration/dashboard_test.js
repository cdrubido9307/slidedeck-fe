describe('Visit the app login page and make sure is contains all the needed components', () => {
    it("Check Login Page", ()=> {
        // Go to login Page
        cy.visit("/login")

        // Check it contains username, password, login button and forgot password
        cy.get("[type='text']").type("admin")
        cy.get("[type='password']")
        cy.get("button").contains("LOG IN")
        cy.contains("Forgot Password?")

        // Check if url includes login path
        cy.url().should('include', '/login')
    })
})

describe('Check login functionality', ()=> {

})