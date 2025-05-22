describe('Formulario de Registro de Vendedores', () => {

    beforeEach(() => {
        cy.visit('/login');
        cy.wait(1000);
        // Simula login
        cy.get('#username').type('UsrAdmin');
        cy.wait(1000);
        cy.get('#password').type('UsrAdmin123');
        cy.wait(1000);

        cy.get('button[type="submit"]').click();
      cy.wait(1000);
      // Visita la ruta (asegúrate que /vendedores es la correcta)
      cy.visit('/vendedores');
      cy.wait(1000);
    });
  
    it('Debe mostrar el título de Registro de Vendedores', () => {
        cy.get('.carga-productos')
          .should('exist') // Verifica que existe
          .and('contain.text', 'Registro de Vendedores'); // Verifica el contenido
      });
  
    it('Debe mostrar errores al intentar registrar con campos vacíos', () => {
     cy.get('select[name="Ciudad"]').select(1);
     cy.wait(1000);
     cy.get('select[name="idZona"]').select(1); 
     cy.wait(1000);
     cy.get('button[name="registrar"]').click();
  
      cy.contains('El campo Nombre es obligatorio').should('exist');
     
     
    });
  
    it('Debe permitir registrar un vendedor correctamente (mock)', () => {
      
  
      // Llenar el formulario

      cy.get('input[placeholder="Nombre"]').type('Juanass');
      cy.get('input[placeholder="Apellido"]').type('Pérez');
      cy.wait(500);
      cy.get('select[name="idTipoDocumento"]').select("1");
      cy.wait(500); // Reemplaza según valor real
      cy.get('input[placeholder="Número de Documento"]').type('12345678');
      cy.get('input[placeholder="correo@dominio.com"]').type('juan.perezass@example.com');
      cy.wait(500);
      // País y ciudad (requieren esperar por carga de datos desde el servidor)
      cy.get('select[name="idPais"]', { timeout: 10000 }).should('exist').select("Colombia"); // Reemplaza ID según valor válido
      cy.wait(500); // Esperar por carga del indicativo
      cy.get('select[name="Ciudad"]').select(1);
      cy.wait(1000);
      cy.get('select[name="idZona"]').select(1); 
      cy.wait(1000);
      cy.get('input[placeholder="123-456-4567"]').type('312-123-4567');
      cy.get('input[placeholder="Dirección"]').type('Calle Falsa 123');
      cy.get('input[name="contrasena"]').type('123456');
  
      // Asegúrate que existan opciones cargadas
  
      // Enviar formulario
      cy.wait(1000);
     cy.get('button[name="registrar"]').click();
     cy.wait(1000);
      // Esperar a la respuesta mock y validar mensaje
      
      cy.contains('Vendedor guardado correctamente.').should('exist');
    });
  
    it('Debe mostrar errores del backend si los hay', () => {
      cy.intercept('POST', '**/vendedores', {
        statusCode: 400,
        body: {
          errors: {
            nombre: ['El nombre ya existe'],
            correo: ['El correo no es válido'],
          }
        }
      }).as('guardarError');
  
      cy.get('input[placeholder="Nombre"]').type('Juan');
      cy.get('input[placeholder="Apellido"]').type('Pérez');
      cy.get('select[name="idTipoDocumento"]').select(1);
      cy.get('input[placeholder="Número de Documento"]').type('12345678');
      cy.get('select[name="Ciudad"]').select(1);
      cy.wait(1000);
      cy.get('select[name="idZona"]').select(1); 
      cy.get('input[placeholder="correo@dominio.com"]').type('correoInvalido');
      cy.get('select[name="idPais"]').select("1");
      cy.wait(1000);
      cy.get('input[placeholder="123-456-4567"]').type('312-123-4567');
      cy.get('input[placeholder="Dirección"]').type('Calle Falsa 123');
      cy.get('input[name="contrasena"]').type('123456');
      
     
  
      cy.wait(1000);
      
      cy.get('button[name="registrar"]').click();
      cy.wait(1000);
      cy.contains('El formato del correo no es válido').should('exist');
    });
  });