import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RootComponent } from '../../../src/app/components/root/root.component';
import { HeaderComponent } from '../../../src/app/components/header/header.component';
import { FooterComponent } from '../../../src/app/components/footer/footer.component';
import { AuthGuard } from '../../../src/app/services/authguard.service';
import { HttpClientModule } from '@angular/common/http';

describe('Root component testing', () => {

    let component: RootComponent;
    let dom: any;
    let fixture: ComponentFixture<RootComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            declarations: [RootComponent, HeaderComponent, FooterComponent],
            providers: [AuthGuard]
        });
        fixture = TestBed.createComponent(RootComponent);
        component = fixture.componentInstance;

        dom = fixture.nativeElement;
    }));

    test('should exist', () => {
        expect(component).toBeDefined();
    });

});