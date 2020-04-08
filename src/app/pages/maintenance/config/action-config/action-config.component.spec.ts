import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionConfigComponent } from './action-config.component';

describe('ActionConfigComponent', () => {
  let component: ActionConfigComponent;
  let fixture: ComponentFixture<ActionConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
