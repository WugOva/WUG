import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <br>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-sm-offset-3">
                <div class="form-group">
                    <md-input class="demo-full-width" placeholder="First Name"></md-input>
                </div>
                <div class="form-group">
                    <md-input [(ngModel)]="name" type="text" class="demo-full-width" placeholder="Last Name"></md-input>
                </div>
                <div class="form-group">
                    <label for="">Name: {{ name }}</label>
                </div>
                <div class="form-group">
                    <button md-raised-button color="primary">Submit</button> 
                </div>
            </div>
        </div>
    </div>    
    `
})
export class AppComponent {
    name: string = '123';
}