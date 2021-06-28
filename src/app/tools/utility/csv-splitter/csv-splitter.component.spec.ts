import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvSplitterComponent } from './csv-splitter.component';

describe('CsvSplitterComponent', () => {
  let component: CsvSplitterComponent;
  let fixture: ComponentFixture<CsvSplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvSplitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
