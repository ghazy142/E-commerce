import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailConfirmComponent } from './mail-confirm.component';

describe('MailConfirmComponent', () => {
  let component: MailConfirmComponent;
  let fixture: ComponentFixture<MailConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
