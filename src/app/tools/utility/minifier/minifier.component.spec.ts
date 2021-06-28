import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinifierComponent } from './minifier.component';

describe('MinifierComponent', () => {
  let component: MinifierComponent;
  let fixture: ComponentFixture<MinifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
