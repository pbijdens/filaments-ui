import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageboxEditorComponent } from './storagebox-editor.component';

describe('StorageboxEditorComponent', () => {
  let component: StorageboxEditorComponent;
  let fixture: ComponentFixture<StorageboxEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageboxEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageboxEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
