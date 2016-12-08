import $ from 'jquery';
import _ from 'underscore';

import { Base } from './base.controller.js';

export class TilesController extends Base {
    constructor() {
        super();
        this.container = '#content';
    }

    renderTiles(tiles, append) {
        this.render({ tiles: tiles }, '#user-data-content', this.container, append);
        this.handleEvents();
    }

    handleEvents() {
        let $target = $(this.container);

        // show/hide description
        $target.on('click', '.card-link', this.toggleCard);

        // content editor
        $target.on('click', '.description-readonly', this.showContentEditor.bind(this));
        $target.on('click', '.description-cancel', this.contentCancel.bind(this));
        $target.on('click', '.description-save', this.contentSave.bind(this));
    }

    toggleCard(event) {
        $(event.target).closest('.card').find('.description').toggle();
        return false;
    }

    showContentEditor(event) {
        $(event.target).closest('.card').find('.description-readonly').hide();
        $(event.target).closest('.card').find('.content-editor').show();
    }

    hideContentEditor(event) {
        $(event.target).closest('.card').find('.description-readonly').show();
        $(event.target).closest('.card').find('.content-editor').hide();
    }

    contentCancel(event) {
        this.hideContentEditor(event);
    }

    contentSave(event) {
        let $card = $(event.target).closest('.card');
        let description = $card.find('.description-content').val();
        let movieId = $card.attr('id');

        this.onDescriptionChangedHandler(movieId, description)
            .then(() => {
                $card.find('.description-readonly').text(description);
                this.hideContentEditor(event);
            });
    }

    onDescriptionChanged(handler) {
        this.onDescriptionChangedHandler = handler;
    }
}
