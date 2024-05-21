import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionMembersDetailsComponent } from './reunion-members-details.component';

describe('ReunionMembersDetailsComponent', () => {
  let component: ReunionMembersDetailsComponent;
  let fixture: ComponentFixture<ReunionMembersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunionMembersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionMembersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
