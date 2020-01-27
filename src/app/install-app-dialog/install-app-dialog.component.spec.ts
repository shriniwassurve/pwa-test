import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallAppDialogComponent } from './install-app-dialog.component';

describe('InstallAppDialogComponent', () => {
  let component: InstallAppDialogComponent;
  let fixture: ComponentFixture<InstallAppDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallAppDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
