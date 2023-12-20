import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMenuComponent } from './card-menu.component';

describe('CardMenuComponent', () => {
  let component: CardMenuComponent;
  let fixture: ComponentFixture<CardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
