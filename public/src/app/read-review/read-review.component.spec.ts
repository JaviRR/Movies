import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadReviewComponent } from './read-review.component';

describe('ReadReviewComponent', () => {
  let component: ReadReviewComponent;
  let fixture: ComponentFixture<ReadReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
