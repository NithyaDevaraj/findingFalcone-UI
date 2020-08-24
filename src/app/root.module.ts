import { HomeComponent } from './components/home/home.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import { RootComponent } from "./components/root/root.component";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SelectionFormComponent } from './components/selection-form/selection-form.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';

import { AppService } from './services/app.service';
import { routes } from "./root.routes";
import { FindComponent } from './components/find/find.component';
import { ResultComponent } from './components/result/result.componet';
import { AuthGuard } from './services/authguard.service';


@NgModule({
    imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes), BrowserAnimationsModule, ToastrModule.forRoot()],
    declarations: [RootComponent, HeaderComponent, 
        FooterComponent, HomeComponent, NotFoundComponent, 
        SelectionFormComponent, VehiclesComponent, FindComponent, ResultComponent ],
    providers : [AuthGuard],
    bootstrap: [RootComponent]
})
export class RootModule { }