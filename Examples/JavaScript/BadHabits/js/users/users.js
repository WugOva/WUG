(function($, document) {
    'use strict';    

    var UsersController = function () {

        var userList;
        var userId = 0;

        // public API
        self.User = User;
        self.UserList = UserList;

        self.userService = new document.myAmazingApp.UserService();
            
        userList = new UserList(self.userService.getUsers());
            
        renderUserList();
                    
        document.myAmazingApp.renderExternalTmpl({ 
            name: 'users/create-user', 
            selector: '#modal', 
            data: {}
        }, function() {
            handleEvents();
        });

        
        function User(user) {
            var self = this;
            self.id = user.id;
            self.firstName = user.firstName; 
            self.lastName = user.lastName;
            self.fullName = self.firstName + " " + self.lastName; 
        }

        function UserList(users) {
            var self = this;
            self.users = users.map(function(user) {
                return new User(user);
            });
        }
        
        function handleEvents() {
            var $content = $('#main-content');
            
            $content.on('click', 'a', onLinkClick);
            $content.find('.remove').on('click', onRemove);
            $content.find('.fullName').on('change', onFullNameChanged);
            
            var $createUserDialog = $('#createUserDialog');
            
            $createUserDialog.submit(function() {
                var $inputs = $(this).find('input');
                var values = {};
                $inputs.each(function() {
                    values[this.name] = $(this).val();
                });
                
                // create new user and add to user list
                values.id = ++userId;
                var newUser = new User(values);
                userList.users.push(newUser); 
                
                $(this).modal('hide');
                
                // update template
                renderUserList();    
                
                return false;
            });
            
            function onLinkClick(event) {
                $(this).find('.detail').toggle().find('input').focus();
                return false;
            }
            
            function onRemove() {
                $(this).closest('a').remove();
                return false;
            }            
            
            function onFullNameChanged() {
                var fullName = this.value;
                var id = Number($(this).closest('a').attr('id'));
                
                userList.users.forEach(function(user) { 
                    if (user.id === id) {
                        var names = fullName.split(' ');
                        if (names.length > 1) {
                            user.firstName = names[0];
                            user.lastName = names[1];    
                        }
                    }
                });
                // update template
                renderUserList();    
                
            }
        }
 
        function renderUserList() {
            var selector = '#main-content';
            
            $(selector).html('');
            
            // render templates
            document.myAmazingApp.renderExternalTmpl({ 
                name: 'users/user-list', 
                selector: selector, 
                data: userList 
            });
        }            
    }
        
    document.myAmazingApp.UsersController = UsersController;
    
})(jQuery, document);

