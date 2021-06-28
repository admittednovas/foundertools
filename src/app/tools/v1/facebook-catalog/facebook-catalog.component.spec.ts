import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookCatalogComponent } from './facebook-catalog.component';

describe('FacebookCatalogComponent', () => {
  let component: FacebookCatalogComponent;
  let fixture: ComponentFixture<FacebookCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
