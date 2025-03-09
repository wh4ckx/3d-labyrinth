import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeMazeComponent } from './three-maze.component';

describe('ThreeMazeComponent', () => {
  let component: ThreeMazeComponent;
  let fixture: ComponentFixture<ThreeMazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeMazeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
