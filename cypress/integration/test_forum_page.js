var delay = 500

describe('test forum webpage', function () {
  it('enter word and verify word is output to a table', function () {
    cy.visit('http://localhost:5000')
    cy.get('#name').type("tester")
    var randomNum = Math.floor(Math.random() * 1000000)
    cy.get('#post').type("abcd" + randomNum + "#$%!")
    cy.wait(delay)

    cy.get('#create').click()
    cy.wait(delay)

    cy.get('.message > table').contains('td', "abcd" + randomNum + "#$%!");
  })

  it('press post button with no message text', function () {
    cy.visit('http://localhost:5000')
    cy.get('#name').type("abcd")
    cy.wait(delay)
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.contains('Post').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Problem with message post input')
      })
  })

  it('press post button with no username', function () {
    cy.visit('http://localhost:5000')
    cy.get('#post').type("abcd")
    cy.wait(delay)
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.contains('Post').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Problem with message post input')
      })
  })

  it('press post button with no username and text', function () {
    cy.visit('http://localhost:5000')
    cy.wait(delay)
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.contains('Post').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Problem with message post input')
      })
  })

  it('enter user and check if user messages are displayed', function () {
    cy.visit('http://localhost:5000')
    var randomNum = Math.floor(Math.random() * 1000000)
    cy.get('#name').type("tester")
    cy.wait(delay)
    cy.get('#post').type("abcd" + randomNum + "#$%!")
    cy.wait(delay)
    cy.get('#create').click()
    cy.wait(delay)
    cy.get('#name').type("tester")
    cy.wait(delay)
    cy.get('#post').type("efgh" + randomNum + "#$%!")
    cy.wait(delay)
    cy.get('#create').click()
    cy.wait(delay)

    cy.get('#findname').type("tester")
    cy.wait(delay)
    cy.get('#find').click()
    cy.wait(delay)

    cy.get('.message_by_user > table').contains('td', "abcd" + randomNum + "#$%!");
    cy.get('.message_by_user > table').contains('td', "efgh" + randomNum + "#$%!");
  })

})