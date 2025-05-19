import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

export class ActivatedRouteStub {
  // Simula el paramMap y get() para devolver el valor de productoId
  snapshot = {
    paramMap: {
      get: (key: string) => {
        if (key === 'productoId') return '1';  // Simula un valor de productoId
        return null;
      }
    }
  };

  // Si se necesita un observable para el paramMap, puedes usar el siguiente:
  paramMap = of({
    get: (key: string) => {
      if (key === 'productoId') return '1';  // Simula un valor de productoId
      return null;
    }
  });
}