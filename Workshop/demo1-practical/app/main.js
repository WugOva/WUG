import $ from 'jquery';
import _ from 'underscore';

import { Base } from './base.controller.js';
import { FrontPageController } from './front-page.controller.js';

export class MovieLibrary extends Base {
    constructor() {
        super();
        this.createFrontPage();
    }

    createFrontPage() {
        let frontPageController = new FrontPageController();
        frontPageController.renderFronPage();
    }
}

new MovieLibrary();