import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-find',
    templateUrl: 'find.component.html',
    styleUrls:['./find.component.css']
})

export class FindComponent implements OnInit {
    totalTimeTaken: number = 0;
    isValidForSendingRequest : boolean = false;

    constructor(private _appService: AppService, private router : Router, private _toastr : ToastrService) { 
        this.getTimeTaken();
    }

    ngOnInit() {
        this.getPlanets();
        this.getVehicles();
        this._appService.resetEverything();
    }

    getPlanets() {
        this._appService.getPlanets().subscribe((res) => {
            this._appService.setPlanetList(res);
        }, (error) => {
            console.log("Error occured while fetching the planets", error);
        });
    }

    getVehicles() {
        this._appService.getVehicles().subscribe((res) => {
            this._appService.setVehicleList(res);
        }, (error) => {
            console.log("Error occured while fetching the vehicles", error);
        });
    }

    getTimeTaken() {
 
        this._appService.timeTakenServiceSubject.subscribe((tt) => {
            this.totalTimeTaken = this._appService.getTimeTaken().totalTime;
            if(this._appService.getTimeTaken().length === 4)
                this.isValidForSendingRequest = true;
            else
                this.isValidForSendingRequest = false;
        });
    }

    findFalcone(){
        this._appService.findFlacone().subscribe((result) =>{
            this._appService.setResult(result);
            this.router.navigate(["result"]);
        },(error) =>{
            this._toastr.error(error, "Find falcone api call failed");
        });
    }
}