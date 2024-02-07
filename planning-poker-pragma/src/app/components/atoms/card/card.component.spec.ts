import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isSelected property ', () => {
    expect(component.isSelected).toBe(false);
    component.toggleSelection();
    expect(component.isSelected).toBe(true);
  });

  it('should emit click event on button click', () => {
    const emitSpy = jest.spyOn(component.clickEvent, 'emit');
    const card = fixture.nativeElement.querySelector('div') as HTMLElement;

    component.onCardClick();

    expect(card).toBeTruthy();
    expect(emitSpy).toHaveBeenCalled();
  });
});
