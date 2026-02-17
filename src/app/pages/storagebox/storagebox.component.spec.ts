import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageboxComponent } from './storagebox.component';

describe('StorageboxComponent', () => {
  let component: StorageboxComponent;
  let fixture: ComponentFixture<StorageboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
