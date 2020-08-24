import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <h2 class="text-danger">Route Not Configured!</h2>
    `
})

export class NotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}