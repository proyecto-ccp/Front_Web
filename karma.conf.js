module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine-html-reporter'),
      require('karma-spec-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80
        }
      }
    },
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--headless',              // Ejecutar en modo headless
          '--no-sandbox',            // Deshabilitar sandboxing (necesario en CI)
          '--disable-gpu',           // Deshabilitar la GPU (no es necesaria en headless)
          '--remote-debugging-port=9222', // Habilitar la depuración remota (opcional)
          '--disable-software-rasterizer', // Deshabilitar el rasterizador de software
          '--disable-dev-shm-usage', // Soluciona errores con memoria compartida en CI
          '--no-sandbox',            // Importante para evitar errores en contenedores
          '--disable-setuid-sandbox' // Importante en entornos de CI como GitHub Actions
        ]
      }
    },
    browsers: ['ChromeHeadless'],
  });
};