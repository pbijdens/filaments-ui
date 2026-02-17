import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilamentEditorComponent } from './filament-editor.component';

describe('FilamentEditorComponent', () => {
  let component: FilamentEditorComponent;
  let fixture: ComponentFixture<FilamentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilamentEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilamentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
