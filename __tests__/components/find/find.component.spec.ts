import { SelectionFormComponent } from './../../../src/app/components/selection-form/selection-form.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from '../../../src/app/services/authguard.service';
import { HttpClientModule } from '@angular/common/http';
import { FindComponent } from '../../../src/app/components/find/find.component';
import { VehiclesComponent } from '../../../src/app/components/vehicles/vehicles.component';
import { ToastrModule } from 'ngx-toastr';

describe('Find component testing', () => {

    let component: FindComponent;
    let dom: any;
    let fixture: ComponentFixture<FindComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule, ToastrModule.forRoot()],
            declarations: [FindComponent, SelectionFormComponent, VehiclesComponent],
            providers: [AuthGuard]
        });
        fixture = TestBed.createComponent(FindComponent);
        component = fixture.componentInstance;

        dom = fixture.nativeElement;
    }));

    test('should exist', () => {
        expect(component).toBeDefined();
    });

    test("totalTimeTaken should be 0 at first", () =>{
        expect(component.totalTimeTaken).toEqual(0);
    });

    test("isValidForSendingRequest should be false at first", () =>{
        expect(component.isValidForSendingRequest).toEqual(false);
    });

});