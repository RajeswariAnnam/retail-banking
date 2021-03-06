﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ListUserComponent } from './list-user';
import { EdituserComponent } from './edituser';
import { TransferComponent } from './transfer';
import { ListTransferComponent } from './list-transfer';
//import { SearchComponent } from './search';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'list', component: ListUserComponent },
    { path: 'edit', component: EdituserComponent },
    { path: 'transfer', component: TransferComponent },
    { path: 'listtransfer', component: ListTransferComponent },
   // { path: 'search', component: SearchComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
