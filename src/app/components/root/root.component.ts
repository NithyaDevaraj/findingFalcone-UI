import { Component,OnInit, ViewEncapsulation } from "@angular/core";
import { environment } from "../../../environments/environment";

@Component({
    selector: 'root',
    templateUrl: "./root.component.html",
    styleUrls:["./root.component.css"],
    encapsulation : ViewEncapsulation.None
})
export class RootComponent implements OnInit {

    imageBasePath : string = environment.imagePath;

    constructor() {
        
    }

    ngOnInit(): void {
        
    }
}