import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { planet } from '../models/planet.model';
import { vehicle } from '../models/vehicle.model';
import { Subject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    selectedPlanets: string[] = [];
    selectedVehicles: string[] = [];

    planetList: planet[];
    vehicleList: vehicle[];

    planetServiceSubject: Subject<any>;
    selectedPlanetChanged: Observable<any>;

    vehicleServiceSubject: Subject<any>;
    selectedVehicleChanged: Observable<any>;

    timeTaken: number[] = [];
    timeTakenServiceSubject: Subject<any>;
    timeTakenChanged: Observable<any>;

    result: any = {};

    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.planetServiceSubject = new Subject<any>();
        this.selectedPlanetChanged = this.planetServiceSubject.asObservable();

        this.vehicleServiceSubject = new Subject<any>();
        this.selectedVehicleChanged = this.vehicleServiceSubject.asObservable();

        this.timeTakenServiceSubject = new Subject<any>();
        this.timeTakenChanged = this.timeTakenServiceSubject.asObservable();

        this.planetList = [];
        this.vehicleList = [];

        this.headers = new HttpHeaders().append("Accept", "application/json").append("Content-Type", "application/json");
    }

    getPlanets() {
        return this.http.get<planet[]>(environment.planetUrl);
    }

    getVehicles() {
        return this.http.get<vehicle[]>(environment.vehicleUrl);
    }

    setPlanetList(pList: planet[]) {
        this.planetList = pList;
        localStorage.setItem("plist", JSON.stringify(pList));
        this.planetServiceSubject.next();
    }

    getPlanetList() {
        console.log("get planetList");
        let self = this;
        return this.planetList.filter((item) => {
            return self.selectedPlanets.indexOf(item.name) == -1
        });
    }

    setVehicleList(vList: vehicle[]) {
        this.vehicleList = vList;
        localStorage.setItem("vlist", JSON.stringify(vList));
        this.vehicleServiceSubject.next();
    }

    getVehicleList() {
        let remainingVList: vehicle[] = JSON.parse(localStorage.getItem("vlist"));
        for (let i = 0; i < this.selectedVehicles.length; i++) {
            let index = remainingVList.findIndex(x => x.name === this.selectedVehicles[i]);

            remainingVList[index].total_no = remainingVList[index].total_no - 1;
        }

        return remainingVList;
    }

    setSelectedPlanets(item: string, action: string) {
        if (action == "add") {
            if (item && this.selectedPlanets.indexOf(item) == -1) {
                this.selectedPlanets.push(item);
            }
        }
        else if (action == "delete") {
            let index = this.selectedPlanets.findIndex(x => x == item);
            if (index > -1)
                this.selectedPlanets.splice(index, 1);
        }

        this.planetServiceSubject.next();
        this.vehicleServiceSubject.next();
    }

    setSelectedVehicles(item: string, action: string) {
        if (action == "add") {
            this.selectedVehicles.push(item);
        }
        else if (action == "delete") {
            let index = this.selectedVehicles.findIndex(x => x == item);
            if (index > -1)
                this.selectedVehicles.splice(index, 1);
        }

        this.vehicleServiceSubject.next();
    }

    setTimeTaken(time: number, action: string) {
        if (action == "add") {
            this.timeTaken.push(time);
        }
        else if (action == "delete") {
            let index = this.timeTaken.findIndex(x => x == time);
            if (index > -1)
                this.timeTaken.splice(index, 1);
        }

        this.timeTakenServiceSubject.next();
    }

    getTimeTaken() {
        return { "totalTime": this.timeTaken.length > 0 ? this.timeTaken.reduce((a, b) => a + b) : 0, "length": this.timeTaken.length };
    }

    findFlacone() {
        return this.http.post<string>(environment.tokenUrl, null, { headers: this.headers }).pipe(mergeMap(token => this.find(token)))
    }

    find(token: any) {

        let body = {
            "token": token.token,
            "planet_names": this.selectedPlanets,
            "vehicle_names": this.selectedVehicles
        }
        return this.http.post<any>(environment.findUrl, body, { headers: this.headers });
    }

    resetEverything() {
        this.selectedPlanets = [];
        this.selectedVehicles = [];
        this.timeTaken = [];
        this.result = {};

        this.planetServiceSubject.next();
        this.vehicleServiceSubject.next();
        this.timeTakenServiceSubject.next();

        return "done";
    }

    setResult(res: any) {
        this.result = res;
        this.result["timeTaken"] = this.timeTaken.reduce((a, b) => a + b);
    }

    getResult() {
        return this.result;
    }

}