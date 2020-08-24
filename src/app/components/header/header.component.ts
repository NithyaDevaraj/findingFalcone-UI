import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnInit {
    constructor(private _appService : AppService, private router : Router) { }

    ngOnInit() { }

    resetEverything(){
        this._appService.resetEverything();
        this.router.navigate([""]);
    }
}