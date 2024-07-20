import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPuzzleListComponent } from './completed-puzzle-list.component';

describe('CompletedPuzzleListComponent', () => {
  let component: CompletedPuzzleListComponent;
  let fixture: ComponentFixture<CompletedPuzzleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedPuzzleListComponent]
    });
    fixture = TestBed.createComponent(CompletedPuzzleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
