import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPuzzlesComponent } from './my-puzzles.component';

describe('MyPuzzlesComponent', () => {
  let component: MyPuzzlesComponent;
  let fixture: ComponentFixture<MyPuzzlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPuzzlesComponent]
    });
    fixture = TestBed.createComponent(MyPuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
