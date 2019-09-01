describe('test forum webpage', function() {
    it('enter word and verify word is output to a table', function() {
      cy.visit('http://localhost:5000')     

      var randomNum = Math.floor(Math.random()*1000000)
      cy.get('#post').type("abcd" + randomNum + "#$%!")

      cy.get('#create').click()

      cy.get('table').contains('td', "abcd" + randomNum + "#$%!");
    })

    it('press post button with no text input to verify input validation', function() {
        cy.visit('http://localhost:5000')                

        const stub = cy.stub()  
        cy.on ('window:alert', stub)
        cy.contains('Post').click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('Problem with message post input')      
        })          
      })    
  })