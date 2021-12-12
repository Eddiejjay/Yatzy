describe('Yatzy', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3003')
      cy.contains('Login')
      cy.contains('Wanna roll some dices?')
    })

    it('login form can be opened', function() {
        cy.visit('http://localhost:3003')
        cy.contains('Login').click()
        cy.contains('Log `n` roll! ')

      })
    })
