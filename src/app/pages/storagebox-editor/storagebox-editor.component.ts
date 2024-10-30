import { Component, OnInit } from '@angular/core';
import { ControlUpButtonComponent } from '../../shared/control-up-button/control-up-button.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthorizationService } from '../../services/authorization.service';
import { StorageboxDetailsModel } from '../../models/storagebox-details-model';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-storagebox-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlUpButtonComponent],
  templateUrl: './storagebox-editor.component.html',
  styleUrl: './storagebox-editor.component.less'
})
export class StorageboxEditorComponent implements OnInit {

  photoUri?: string;
  storagebox?: StorageboxDetailsModel;
  errorMessage?: string;

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService, public activatedRoute: ActivatedRoute, public navbarService: NavbarService, public router: Router) {
    // TODO: Read sort oorder etc from current route.
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    delete this.errorMessage;
    try {
      const storageboxId = this.activatedRoute.snapshot.params['storageboxId'] as number;
      if (storageboxId > 0) {
        this.storagebox = await this.apiService.getStoragebox(`${storageboxId}`);
        this.photoUri = await this.apiService.getStorageboxPhotoUri(`${storageboxId}`);
      } else {
        this.storagebox = <StorageboxDetailsModel>{
          id: -1,
        };
      }

      this.navbarService.setPageTitle(storageboxId == -1 ? `New container` : `Edit ${this.storagebox.name}`);
    } catch (err) {
      this.errorMessage = `Failed to fetch storageboxes. Error: ${err}`;
    }
  }

  async save(): Promise<void> {
    if (!this.storagebox) {
      this.errorMessage = `There is nothing to save.`;
      window.scrollTo({ top: 0 });
      return;
    }
    if (this.storagebox.id < 0) {
      try {
        const result: StorageboxDetailsModel = await this.apiService.createStoragebox(this.storagebox);
        await this.router.navigate(['storagebox', result.id]);
        await this.refresh();
      }
      catch (err) {
        this.errorMessage = `Failed to create a new container: ` + err;
      }
    } else {
      try {
        await this.apiService.updateStoragebox(this.storagebox);
        await this.refresh();
      }
      catch (err) {
        this.errorMessage = `Failed to update container: ` + err;
      }
    }
    window.scrollTo({ top: 0 });
  }

  async onUploadFile(event: any): Promise<void> {
    if (!this.storagebox || this.storagebox.id < 0) return;
    const file: File = event.target.files[0];

    if (file) {
      await this.apiService.uploadStorageboxPhoto(this.storagebox?.id, file);
      this.photoUri = await this.apiService.getStorageboxPhotoUri(`${this.storagebox?.id}`) + `?rnd=${Math.random()}`
      window.scrollTo({ top: 0 });
    }
  }

  async delete(): Promise<void> {
    if (confirm(`Are you sure you want to delete this container?`)) {
      await this.apiService.deleteStoragebox(this.storagebox!.id);
      this.router.navigate(['storagebox']);
    }
  }
}
