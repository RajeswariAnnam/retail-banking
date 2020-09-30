import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { DataTablesModule } from 'angular-datatables';
import { AlertComponent } from './_components';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ListUserComponent } from './list-user';
import { EdituserComponent } from './edituser';
import { TransferComponent } from './transfer';
import { ListTransferComponent } from './list-transfer';
//import { SearchComponent } from './search';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ListUserComponent,
        EdituserComponent,
        TransferComponent,
        ListTransferComponent
      //  SearchComponent
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})

export class AppModule { }
