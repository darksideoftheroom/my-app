import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleoneComponent } from './puzzleone.component';

describe('PuzzleoneComponent', () => {
  let component: PuzzleoneComponent;
  let fixture: ComponentFixture<PuzzleoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
