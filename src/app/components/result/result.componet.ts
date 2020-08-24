import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-result',
    templateUrl: 'result.component.html',
    styleUrls:['./result.component.css']
})

export class ResultComponent implements OnInit {
    finalResponse : any = {};

    constructor(private _appService : AppService, private router : Router) { }

    ngOnInit() { 
        this.finalResponse = this._appService.getResult();
    }

    resetEverything(){
        this._appService.resetEverything();
        this.router.navigate([""]);
    }
}