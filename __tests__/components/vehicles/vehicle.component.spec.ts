import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VehiclesComponent } from '../../../src/app/components/vehicles/vehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppService } from '../../../src/app/services/app.service';

describe('Find component testing', () => {

    let component: VehiclesComponent;
    let dom: any;
    let fixture: ComponentFixture<VehiclesComponent>;
    let service: AppService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule, ToastrModule.forRoot()],
            declarations: [VehiclesComponent],
            providers: [AppService]
        });

        fixture = TestBed.createComponent(VehiclesComponent);
        component = fixture.componentInstance;
        service = TestBed.get(AppService);

        dom = fixture.nativeElement;
    }));

    test('should exist', () => {
        expect(component).toBeDefined();
        expect(service).toBeDefined();
    });

    test("should update the selected vehiclelist", ()=>{
        let e = { target : { value : "Space pod"}};
        component.selectedPlanet = {"name" : "Donlon" , "distance" : 100};
        component.vehicleList = [{name : "Space pod",total_no : 1, max_distance : 200, speed : 2}];
        component.updateSelectedVehicle(e);

        expect(service.selectedVehicles.length).toBe(1);
        expect(service.getTimeTaken().totalTime).toBe(50);

    });

});