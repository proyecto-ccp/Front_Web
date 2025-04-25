import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrls: ['./auditar.component.css']
})
export class AuditarComponent implements OnInit {
  fechaSeleccionada1 = { year: 2024, month: 4, day: 16 };
  fechaSeleccionada2 = { year: 2024, month: 4, day: 30 };

  constructor() { }

  ngOnInit() {
  }

}
