import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FilamentHeaderModel } from '../../models/filament-header-model';
import { RouterModule } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-filament',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlUpButtonComponent],
  templateUrl: './filament.component.html',
  styleUrl: './filament.component.less'
})
export class FilamentComponent implements OnInit {
  
  filaments: FilamentHeaderModel[] = [];
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
      this.filaments = await this.apiService.getFilaments();

      this.navbarService.setPageTitle(`Manage filaments`);
    } catch (err) {
      this.errorMessage = `Failed to fetch filaments. Error: ${err}`;
    }
  }
}
