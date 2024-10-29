import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { NavbarService } from '../../services/navbar.service';
import { StorageboxHeaderModel } from '../../models/storagebox-header-model';

@Component({
  selector: 'app-storagebox',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlUpButtonComponent],
  templateUrl: './storagebox.component.html',
  styleUrl: './storagebox.component.less'
})
export class StorageboxComponent implements OnInit {
  
  storageboxes: StorageboxHeaderModel[] = [];
  errorMessage?: string;

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService, public navbarService: NavbarService) { 
    // TODO: Read sort oorder etc from current route.
  }
  
  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    delete this.errorMessage;
    try {
      this.storageboxes = await this.apiService.getStorageboxes();

      this.navbarService.setPageTitle(`${this.storageboxes.length} storage box(es)`);
    } catch (err) {
      this.errorMessage = `Failed to fetch data. Error: ${err}`;
    }
  }
}
