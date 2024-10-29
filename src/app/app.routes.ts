import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/filament', pathMatch: 'full'  },
    { path: 'filament', loadComponent: () => import('./pages/filament/filament.component').then(mod => mod.FilamentComponent) },
    { path: 'filament/:filamentId', loadComponent: () => import('./pages/filament-editor/filament-editor.component').then(mod => mod.FilamentEditorComponent) },
    { path: 'storagebox', loadComponent: () => import('./pages/storagebox/storagebox.component').then(mod => mod.StorageboxComponent) },
    { path: 'storagebox/:storageboxId', loadComponent: () => import('./pages/storagebox-editor/storagebox-editor.component').then(mod => mod.StorageboxEditorComponent) },
// USERS AND ACLS
    { path: 'auth', redirectTo: '/auth/user', pathMatch: 'full' },
    { path: 'auth/user', loadComponent: () => import('./pages/user-list/user-list.component').then(mod => mod.UserListComponent) }, // component: UserListComponent) },
    { path: 'auth/acl', loadComponent: () => import('./pages/user-acl-list/user-acl-list.component').then(mod => mod.UserAclListComponent) }, // component: UserAclListComponent) },
];
