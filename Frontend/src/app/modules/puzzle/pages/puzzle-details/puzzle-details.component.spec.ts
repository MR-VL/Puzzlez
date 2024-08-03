import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuzzleDetailsComponent } from './puzzle-details.component';

describe('PuzzleDetailsComponent', () => {
  let component: PuzzleDetailsComponent;
  let fixture: ComponentFixture<PuzzleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleDetailsComponent]
    });
    fixture = TestBed.createComponent(PuzzleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
