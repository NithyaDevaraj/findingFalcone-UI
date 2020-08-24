import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { planet } from '../../models/planet.model';
import { vehicle } from '../../models/vehicle.model';
import { environment } from "../../../environments/environment";

@Component({
    selector: 'app-selection-form',
    templateUrl: 'selection-form.component.html',
    styleUrls : ['./selection-form.component.css']
})

export class SelectionFormComponent implements OnInit {
    selectedPlanet: planet;
    planetList: planet[];
    imageBasePath : string = environment.imagePath;
    
    constructor(private _appService: AppService) {
        this.resetSelectedPlanet();
    }

    ngOnInit() {
        this.getPlanetList();
    }

    getPlanetList() {
        let self = this;

        this._appService.planetServiceSubject.subscribe(() => {
            this.planetList = this._appService.getPlanetList();
            if (this.selectedPlanet.name)
                this.planetList = [this.selectedPlanet, ...this.planetList];
        });
    }

    updateSelectedPlanet(e: any) {

        if (e.target.value.length > 0) {

            if (this.selectedPlanet.name)
                this._appService.setSelectedPlanets(this.selectedPlanet.name, "delete");

            this.selectedPlanet = this.planetList.find(x=>x.name == e.target.value);
            this._appService.setSelectedPlanets(this.selectedPlanet.name, "add");
        }
        else {
            this._appService.setSelectedPlanets(this.selectedPlanet.name, "delete");
            this.resetSelectedPlanet();
        }
    }

    resetSelectedPlanet() {
        this.selectedPlanet = { name: "", distance: 0 };
    }
    
}