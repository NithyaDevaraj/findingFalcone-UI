import { HttpClientModule } from '@angular/common/http';
import { AppService } from './../../src/app/services/app.service';
import { TestBed } from '@angular/core/testing';

describe('AppService', () => {
    let service: AppService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [AppService]
        });
        service = TestBed.get(AppService);
    });

    test('should exist', () => {
        expect(service).toBeDefined();
    });

    test("should set selected planet in the list", () => {
        service.setSelectedPlanets("Donlon", "add");
        expect(service.selectedPlanets.length).toBe(1);
    });

    test("should set selected vehicle in the list", () => {
        service.setSelectedVehicles("Space pod", "add");
        expect(service.selectedVehicles.length).toBe(1);
    });

});