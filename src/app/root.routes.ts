import { Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FindComponent } from "./components/find/find.component";
import { ResultComponent } from "./components/result/result.componet";
import { AuthGuard } from "./services/authguard.service";


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'find', component: FindComponent },
    { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
];