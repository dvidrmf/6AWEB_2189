import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveDemo } from './reactive-demo';

describe('ReactiveDemo', () => {
  let component: ReactiveDemo;
  let fixture: ComponentFixture<ReactiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
