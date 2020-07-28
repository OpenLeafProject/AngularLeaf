import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivate } from '@angular/router';
import { CanActivateViaAuthGuard } from '../app/guards/CanActivateViaAuth.guard';

const routes: Routes = [
  { path: 'user',
  loadChildren: () => import('../app/modules/user.module/user.module').then(m => m.UserModule),
  // loadChildren: '../app/module-rxcons/rxcons.module#RxconsModule',
  // canActivate: [CanActivateViaAuthGuard]
  },
  { path: 'console',
  loadChildren: () => import('../app/modules/core.module/core.module').then(m => m.CoreModule),
  // loadChildren: '../app/module-rxcons/rxcons.module#RxconsModule',
  // canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: '**',
    redirectTo: '/user/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
