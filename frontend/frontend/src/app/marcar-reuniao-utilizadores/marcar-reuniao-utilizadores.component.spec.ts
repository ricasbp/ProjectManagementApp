import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarReuniaoUtilizadoresComponent } from './marcar-reuniao-utilizadores.component';

describe('MarcarReuniaoUtilizadoresComponent', () => {
  let component: MarcarReuniaoUtilizadoresComponent;
  let fixture: ComponentFixture<MarcarReuniaoUtilizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcarReuniaoUtilizadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarReuniaoUtilizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
