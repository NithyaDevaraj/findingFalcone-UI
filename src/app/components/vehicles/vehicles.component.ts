import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { planet } from '../../models/planet.model';
import { vehicle } from '../../models/vehicle.model';
import { AppService } from '../../services/app.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../environments/environment";

@Component({
    selector: 'app-vehicles',
    templateUrl: 'vehicles.component.html',
    styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit, OnChanges {

    @Input() public selectedPlanet: planet;
    vehicleList: vehicle[];
    selectedVehicle: string = "";
    timeTaken: number = 0;
    imageBasePath : string = environment.imagePath;

    constructor(private _appService: AppService, private cdr: ChangeDetectorRef, private _toster : ToastrService) {

    }

    ngOnInit() {
        this.getVehicleList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        setTimeout(() => {
            this.resetSelectedVehicle();
        }, 100);

    }

    getVehicleList() {
        this._appService.vehicleServiceSubject.subscribe(() => {
            this.vehicleList = this._appService.getVehicleList();
        }, error => {
            console.log(error);
        });
    }

    updateSelectedVehicle(e: any) {

        if (this.selectedPlanet.name) {

            if (this.selectedVehicle) {
                this._appService.setSelectedVehicles(this.selectedVehicle, "delete");

                this._appService.setSelectedVehicles(e.target.value, "add");
                this.selectedVehicle = e.target.value;
            }
            else {
                this._appService.setSelectedVehicles(e.target.value, "add");
                this.selectedVehicle = e.target.value;
            }

            this.updateTimeTaken();
        }
        else{
            this._toster.error("Please select the planet first","Vehicle Selection Error");
        }
    }

    resetSelectedVehicle() {
        if (this.selectedVehicle)
            this._appService.setSelectedVehicles(this.selectedVehicle, "delete");

        this.selectedVehicle = "";

        this.removeTimeTaken();
    }

    updateTimeTaken() {

        let sVehicle = this.vehicleList.find(x => x.name == this.selectedVehicle);
        if (sVehicle && sVehicle.name) {
            let timeTaken = this.selectedPlanet.distance / sVehicle.speed;

            if (this.timeTaken > 0) {
                //delete time take from the array in service 
                this._appService.setTimeTaken(this.timeTaken, "delete");

                //add time taken for this planet
                this.timeTaken = timeTaken;
                this._appService.setTimeTaken(this.timeTaken, "add");
            }
            else {
                //add time taken for this planet
                this.timeTaken = timeTaken;
                this._appService.setTimeTaken(timeTaken, "add");
            }
        }
    }

    removeTimeTaken() {
        if (this.timeTaken > 0)
            this._appService.setTimeTaken(this.timeTaken, "delete");
    }
}