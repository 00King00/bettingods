import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule) },
  { path: 'support', loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule) },
  { path: 'invite', loadChildren: () => import('./pages/invite/invite.module').then( m => m.InvitePageModule) },
  { path: 'responsible', loadChildren: () => import('./pages/responsible/responsible.module').then( m => m.ResponsiblePageModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
