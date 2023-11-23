import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassroomComponent } from './create-classroom.component';

describe('CreateClassroomComponent', () => {
  let component: CreateClassroomComponent;
  let fixture: ComponentFixture<CreateClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClassroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
