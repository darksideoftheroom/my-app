import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzletwoComponent } from './puzzletwo.component';

describe('PuzzletwoComponent', () => {
  let component: PuzzletwoComponent;
  let fixture: ComponentFixture<PuzzletwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzletwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzletwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
