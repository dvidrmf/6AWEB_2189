import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDemo } from './template-demo';

describe('TemplateDemo', () => {
  let component: TemplateDemo;
  let fixture: ComponentFixture<TemplateDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
