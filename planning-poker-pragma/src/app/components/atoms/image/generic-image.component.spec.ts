import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericImageComponent } from './generic-image.component';

describe('GenericImageComponent', () => {
  let component: GenericImageComponent;
  let fixture: ComponentFixture<GenericImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(GenericImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
