import $ from 'jquery';
import _ from 'underscore';

export class Base {
    constructor() {
        // custom template
        _.templateSettings = {
            interpolate: /\{\{=(.+?)\}\}/g,
            evaluate: /\{\{(.+?)\}\}/g,
        };
        this.$busyElement = $('#busy');        
    }

    busy(isBusy) {
        if (isBusy) {
            this.$busyElement.show();
        } else {
            this.$busyElement.hide();
        }
    }

    render(model, viewId, target, append) {
        let viewContent = $(viewId).html();
        var compiled = _.template(viewContent);
        var data = compiled(model);
        if (append) {
            $(target).append(data);
        } else {
            $(target).html(data);
        }
    }
}