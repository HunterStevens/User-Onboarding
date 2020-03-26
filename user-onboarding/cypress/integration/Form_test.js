describe("Grabing the app and test our imputs to submit the form", function(){
    beforeEach("Locate the website", function(){
        cy.visit("http://localhost:3000/");
    })

    it("test the inputs if it can be filled and submitted", function(){
        cy.get('input[name="firstName"]')
        .type("Bob")
        .should("have.value", "Bob")

        cy.get('input[name="lastName"]')
        .type('Joel')
        .should('have.value', 'Joel')

        cy.get('input[name="email"]')
        .type('testing@email.com')
        .should('have.value', 'testing@email.com')

        cy.get('input[name="password"]')
        .type('t3$t!ng')
        .should('have.value', 't3$t!ng')
        
        cy.get('select[name="vacation"]')
        .select('Disney World')
        .should('have.value', 'disneyWorld')

        cy.get('[type="checkbox"]')
        .check()
        .should('be.checked');

        cy.get('button')
        .click()
    })

    it("check the validation if it empty's after submission the errors will pull up", function(){
        cy.get('input[name="firstName"]')
        .type('test').clear()
        .should('have.value', '')



        cy.get('input[name="lastName"]')
        .type('test').clear()
        .should('have.value', '')


        cy.get('input[name="password"]')
        .type('test').clear()
        .should('have.value', '')


        cy.get('input[name="email"]')
        .type('test').clear()
        .should('have.value', '')


        cy.get('select[name="vacation"]')
        .select('France').select('--Select an Spot--')
        .should('have.value', '')

                

    })
})