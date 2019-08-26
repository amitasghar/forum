describe('test forum webpage', function() {
    it('enter word and verify word is output to a table', function() {
      cy.visit('http://localhost:5000')      

      cy.get('#word')
      .type('alibaba9')
      .should('have.value', 'alibaba9')      

      cy.contains('Done').click()

      cy.get('table').contains('td', 'alibaba9');
    })

    it('enter empty word and verify input validation is working', function() {
        cy.visit('http://localhost:5000')                

        const stub = cy.stub()  
        cy.on ('window:alert', stub)
        cy.contains('Done').click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('Problem with word input')      
        })          
      })    
  })