import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoardMemberComponent } from './list-board-member.component';

describe('ListBoardMemberComponent', () => {
  let component: ListBoardMemberComponent;
  let fixture: ComponentFixture<ListBoardMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBoardMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBoardMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
