import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedPuzzleComponent } from './completed-puzzles.component';

describe('CompletedPuzzleComponent', () => {
  let component: CompletedPuzzleComponent;
  let fixture: ComponentFixture<CompletedPuzzleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedPuzzleComponent]
    });
    fixture = TestBed.createComponent(CompletedPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
