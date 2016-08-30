(function($, document, undefined) {
    'use strict';    

    document.myAmazingApp.UserService = function() {
        return {
            getUsers: function() {
                return [
                    {
                        id: 1,
                        firstName: 'John',
                        lastName: 'Chan'
                    },
                    {
                        id: 2,
                        firstName: 'Arnold',
                        lastName: 'Schwarzenegger'
                    },
                    {
                        id: 3,
                        firstName: 'Van',
                        lastName: 'Damme'
                    },
                    {
                        id: 4,
                        firstName: 'Julia',
                        lastName: 'Roberts'
                    },
                    {
                        id: 5,
                        firstName: 'Sandra',
                        lastName: 'Bullock'
                    }
                ]
            }
        }
    };
    
    
})(jQuery, document);

