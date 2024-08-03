import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagePuzzleComponent } from './manage-puzzle.component';

describe('ManagePuzzleComponent', () => {
  let component: ManagePuzzleComponent;
  let fixture: ComponentFixture<ManagePuzzleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePuzzleComponent]
    });
    fixture = TestBed.createComponent(ManagePuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
