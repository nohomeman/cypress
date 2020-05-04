describe('source rewriting spec', function () {
  it('obstructive code is replaced', function () {
    // based off of driver e2e security_spec
    cy.visit('/obstructive_code.html')
    cy.contains('html ran')
    cy.contains('js ran')
    cy.get('body').then(([body]) => {
      expect(body.innerText).to.not.contain('security triggered')
    })
  })

  // @see https://github.com/cypress-io/cypress/issues/3975
  context('issue 3975', function () {
    it('can relative redirect in a xhr onload', function () {
      cy.visit('/static/xhr_onload_redirect.html')
      cy.location('pathname').should('eq', '/static/index.html')
    })

    it('can relative redirect in a settimeout', function () {
      cy.visit('/static/settimeout_redirect.html')
      cy.location('pathname').should('eq', '/static/index.html')
    })

    it('can relative redirect in a onclick handler', function () {
      cy.visit('/static/onclick_redirect.html')
      cy.get('button').click()
      cy.location('pathname').should('eq', '/static/index.html')
    })

    it('can relative redirect in a settimeout with a base tag', function () {
      cy.visit('/static/settimeout_basetag_redirect.html')
      cy.location('pathname').should('eq', '/static/foo/bar/index.html')
    })

    // NOTE: user's repro
    it.skip('Login demo', function () {
      // cy.on('fail', console.error)
      cy.visit('https://apex.oracle.com/pls/apex/f?p=54707:LOGIN_DESKTOP', { timeout: 60000 })
      cy.get('#P9999_USERNAME').type('ApexUser')
      cy.get('#P9999_PASSWORD').type('Oradoc_db1')
      cy.get('.t-Button').click()
    })
  })

  context('can load some well-known sites in a timely manner', () => {
    [
      'http://apple.com',
      'http://google.com',
      'http://facebook.com',
      'http://cypress.io',
      'http://docs.cypress.io',
      'http://github.com',
    ].forEach((url) => {
      it(url, () => {
        cy.visit(url, { timeout: 60000 })
      })
    })
  })
})
