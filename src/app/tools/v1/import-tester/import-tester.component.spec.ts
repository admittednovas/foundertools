import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTesterComponent } from './import-tester.component';

describe('ImportTesterComponent', () => {
  let component: ImportTesterComponent;
  let fixture: ComponentFixture<ImportTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
