describe('Confidencialidad - Acceso a rutas protegidas', () => {

    const fakeToken = 'FAKE_VALID_TOKEN'; // simula un token válido
  
    it('no debería permitir acceso a /auditar sin token', () => {
      cy.clearLocalStorage();
      cy.visit('/inicio');
      cy.wait(1000);
      cy.url().should('include', '/login');
    });
  
    it('debería permitir acceso a /inicio con token válido', () => {
      cy.visit('/login');
  
      // Simula login
      cy.get('#username').type('UsrAdmin');
      cy.get('#password').type('UsrAdmin123');
      cy.get('button[type="submit"]').click();
  
      // Asumimos que redirige a /auditar después del login exitoso
      cy.url().should('include', '/inicio');
      cy.wait(1000);
      cy.contains('Registrar Fabricantes').should('exist');
    });
  
    it('debería limpiar el token al cerrar sesión', () => {
      // Simulamos que ya hay un token
      cy.visit('/login');
  
       // Simula login
       cy.get('#username').type('UsrAdmin');
       cy.get('#password').type('UsrAdmin123');
       cy.get('button[type="submit"]').click();
       cy.url().should('include', '/inicio');
      
  
      // Simula acción de cerrar sesión
      cy.get('[data-cy=logout-button]').click();
  
      // Verifica que fue redirigido al login
      cy.url().should('include', '/login');
  
      // Verifica que no hay token
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.be.null;
      });
    });
  
  });