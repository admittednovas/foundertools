import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtoolboxUpdateComponent } from './vtoolbox-update.component';

describe('VtoolboxUpdateComponent', () => {
  let component: VtoolboxUpdateComponent;
  let fixture: ComponentFixture<VtoolboxUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VtoolboxUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VtoolboxUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
