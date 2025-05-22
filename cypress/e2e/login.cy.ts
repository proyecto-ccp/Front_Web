describe('Página de Inicio de Sesión', () => {
    const usuarioValido = 'UsrAdmin';
    const contrasenaValida = 'UsrAdmin123';
  
    beforeEach(() => {
      cy.visit('/login'); // Asegúrate de que esta ruta coincida con tu ruta en Angular
    });
  
    it('debería mostrar el formulario de login', () => {
      cy.get('h2').contains('Iniciar Sesión');
      cy.get('input#username').should('exist');
      cy.get('input#password').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('debería validar campos vacíos', () => {
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('exist');
    });
  
    it('debería hacer login exitoso con credenciales válidas', () => {
      cy.get('#username').type(usuarioValido);
      cy.get('#password').type(contrasenaValida);
      cy.get('button[type="submit"]').click();
  
      // Cambia esto según la ruta a la que redirige tu login
      cy.url().should('include', '/inicio');
    });
  
    it('debería mostrar mensaje de error con credenciales inválidas', () => {
      cy.get('#username').type('incorrecto@test.com');
      cy.get('#password').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      cy.get('.alert-danger').should('contain', 'Usuario no encontrado'); // o el mensaje que uses
    });
    it('debería mostrar mensaje de error con credenciales inválidas', () => {
        cy.get('#username').type('UsrAdmin');
        cy.get('#password').type('UsrAdmin');
        cy.get('button[type="submit"]').click();
    
        cy.get('.alert-danger').should('contain', 'Credenciales incorrectas'); // o el mensaje que uses
      });
  });