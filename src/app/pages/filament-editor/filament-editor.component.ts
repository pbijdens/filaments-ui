import { Component, OnInit } from '@angular/core';
import { ControlUpButtonComponent } from '../../shared/control-up-button/control-up-button.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthorizationService } from '../../services/authorization.service';
import { FilamentDetailsModel } from '../../models/filament-details-model';
import { NavbarService } from '../../services/navbar.service';
import { StorageboxHeaderModel } from '../../models/storagebox-header-model';

@Component({
  selector: 'app-filament-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlUpButtonComponent],
  templateUrl: './filament-editor.component.html',
  styleUrl: './filament-editor.component.less'
})
export class FilamentEditorComponent implements OnInit {

  photoUri?: string;
  filament?: FilamentDetailsModel;
  errorMessage?: string;
  storageboxes: StorageboxHeaderModel[] = [];

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService, public activatedRoute: ActivatedRoute, public navbarService: NavbarService, public router: Router) {
    // TODO: Read sort oorder etc from current route.
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    delete this.errorMessage;
    try {
      const filamentId = this.activatedRoute.snapshot.params['filamentId'] as number;
      if (filamentId > 0) {
        this.filament = await this.apiService.getFilament(`${filamentId}`);
        this.photoUri = await this.apiService.getFilamentPhotoUri(`${filamentId}`);
        this.storageboxes = await this.apiService.getStorageboxes();
      } else {
        this.filament = <FilamentDetailsModel>{
          id: -1,
          firstAdded: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }

      this.navbarService.setPageTitle(filamentId == -1 ? `Register a roll of filament` : `Edit ${this.filament.description}`);
    } catch (err) {
      this.errorMessage = `Failed to fetch filaments. Error: ${err}`;
    }
  }

  async save(): Promise<void> {
    if (!this.filament) {
      this.errorMessage = `There is nothing to save.`;
      window.scrollTo({ top: 0 });
      return;
    }
    if (this.filament.id < 0) {
      const result: FilamentDetailsModel = await this.apiService.createFilament(this.filament);
      this.router.navigate(['..', result.id]);
    } else {
      await this.apiService.updateFilament(this.filament);
      await this.refresh();
    }
    window.scrollTo({ top: 0 });
  }

  async onUploadFile(event: any): Promise<void> {
    if (!this.filament || this.filament.id < 0) return;
    const file: File = event.target.files[0];

    if (file) {
      await this.apiService.uploadFilamentPhoto(this.filament?.id, file);
      this.photoUri = await this.apiService.getFilamentPhotoUri(`${this.filament?.id}`) + `?rnd=${Math.random()}`
    }
  }

  onChangeBox() {
    if (this.filament) {
      let box = this.storageboxes.find((c) => c.name == this.filament!.storageBoxName);
      if (box) {
        this.filament!.storagebox = box;
        this.filament!.storageBoxName = box!.name;
        this.filament!.storageBoxID = box!.id;
      }
      console.log(box)
    }
  }

}
