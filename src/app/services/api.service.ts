import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { WhoAmIResponse } from '../models/who-am-i-response';
import { UserModel } from '../models/user-model';
import { UserACLModel } from '../models/user-acl-model';
import { FilamentHeaderModel } from '../models/filament-header-model';
import { FilamentDetailsModel } from '../models/filament-details-model';
import { StorageboxDetailsModel } from '../models/storagebox-details-model';
import { StorageboxHeaderModel } from '../models/storagebox-header-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private authorizationService: AuthorizationService) { }

  get url(): String {
    const result = `${window.location.protocol}//${window.location.hostname}:8062`;
    return result;
  }

  async defaultHeaders(): Promise<HeadersInit | undefined> {
    return {
      "content-type": "application/json",
      "authorization": await this.authorizationService.getOAuthBearerTokenValue(),
    };
  }

  // --------------------------------------------------------------------------

  async getLoggedInUser(): Promise<WhoAmIResponse | undefined> {
    const data = await fetch(`${this.url}/auth/whoami`, {
      headers: await this.defaultHeaders()
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async signin(username: string, password: string): Promise<string | undefined> {
    const data = await fetch(`${this.url}/auth/login`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
      body: JSON.stringify({ username: username, password: password })
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.text()) ?? undefined) : undefined;
  }

  // --------------------------------------------------------------------------

  async getUsers(): Promise<UserModel[]> {
    const data = await fetch(`${this.url}/auth/user`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async updateUser(user: UserModel): Promise<UserModel> {
    const data = await fetch(`${this.url}/auth/user`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(user)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async updatePassword(user: UserModel): Promise<UserModel> {
    const data = await fetch(`${this.url}/auth/password`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(user)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async createUser(user: UserModel): Promise<UserModel> {
    user.id = -1;
    const data = await fetch(`${this.url}/auth/user`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(user)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async deleteUser(user: UserModel): Promise<UserModel> {
    const data = await fetch(`${this.url}/auth/user/${user.id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders()
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  // --------------------------------------------------------------------------

  async getACLs(): Promise<UserACLModel[]> {
    const data = await fetch(`${this.url}/auth/acl`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async updateACL(acl: UserACLModel): Promise<UserACLModel> {
    const data = await fetch(`${this.url}/auth/acl`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(acl)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async createACL(acl: UserACLModel): Promise<UserACLModel> {
    acl.id = -1;
    const data = await fetch(`${this.url}/auth/acl`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(acl)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async deleteACL(acl: UserACLModel): Promise<UserACLModel> {
    const data = await fetch(`${this.url}/auth/acl/${acl.id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders()
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  // --------------------------------------------------------------------------

  async getFilaments(): Promise<FilamentHeaderModel[]> {
    const data = await fetch(`${this.url}/filament`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async getFilament(id: string): Promise<FilamentDetailsModel> {
    const data = await fetch(`${this.url}/filament/${id}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async getFilamentPhotoUri(id: string): Promise<string> {
    return `${this.url}/filament/${id}/photo`;
  }

  async updateFilament(filament: FilamentDetailsModel): Promise<FilamentDetailsModel> {
    const data = await fetch(`${this.url}/filament`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(filament),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async createFilament(filament: FilamentDetailsModel): Promise<FilamentDetailsModel> {
    const data = await fetch(`${this.url}/filament`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(filament),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async uploadFilamentPhoto(id: number, file: File): Promise<FilamentDetailsModel> {
    const formData = new FormData();
    formData.append("photo", file);

    const data = await fetch(`${this.url}/filament/${id}/photo`, {
      method: 'POST',
      headers: [], //await this.defaultHeaders(),
      body: formData
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  // --------------------------------------------------------------------------

  async getStorageboxes(): Promise<StorageboxHeaderModel[]> {
    const data = await fetch(`${this.url}/storagebox`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async getStoragebox(id: string): Promise<StorageboxDetailsModel> {
    const data = await fetch(`${this.url}/storagebox/${id}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async getStorageboxPhotoUri(id: string): Promise<string> {
    return `${this.url}/storagebox/${id}/photo`;
  }

  async updateStoragebox(storagebox: StorageboxDetailsModel): Promise<StorageboxDetailsModel> {
    const data = await fetch(`${this.url}/storagebox`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(storagebox),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async createStoragebox(storagebox: StorageboxDetailsModel): Promise<StorageboxDetailsModel> {
    const data = await fetch(`${this.url}/storagebox`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(storagebox),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async uploadStorageboxPhoto(id: number, file: File): Promise<StorageboxDetailsModel> {
    const formData = new FormData();
    formData.append("photo", file);

    const data = await fetch(`${this.url}/storagebox/${id}/photo`, {
      method: 'POST',
      headers: [], //await this.defaultHeaders(),
      body: formData
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async deleteFilament(id: number): Promise<void> {
    const data = await fetch(`${this.url}/filament/${id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async deleteStoragebox(id: number): Promise<void> {
    const data = await fetch(`${this.url}/storagebox/${id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }


}
