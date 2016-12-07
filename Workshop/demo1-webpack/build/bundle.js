/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _userService = __webpack_require__(1);

	// custom template
	_.templateSettings = {
	    interpolate: /\{\{=(.+?)\}\}/g,
	    evaluate: /\{\{(.+?)\}\}/g
	};

	var $userList = $('#user-list');
	var $form = $('#form');
	var selectedUser = void 0;
	var removeId = void 0;

	function createRating(rating) {
	    var starFull = '<span class="star full">☆</span>';
	    var star = '<span class="star">☆</span>';
	    var $output = $("<div/>");

	    for (var i = 0; i < 5; i++) {
	        $output.append(i < rating ? starFull : star);
	    }
	    return $output.append('<span> ' + rating + '/5 </span>');
	}

	// 1. bind events
	function bindEvents() {
	    $userList.on('click', 'tr', function () {
	        var $row = $(this);

	        $row.parent().find('tr').removeClass('table-info');
	        $row.addClass('table-info');

	        selectedUser = $row.data().user;
	        console.log('selectedUser', selectedUser);

	        $form.show();
	        var $name = $form.find('#user-name');
	        var $email = $form.find('#user-email');
	        var $rating = $form.find('#rating-ui');

	        $name.text(selectedUser.first + " " + selectedUser.last);
	        $email.val(selectedUser.email);
	        $rating.empty().append(createRating(selectedUser.rating));
	    });

	    $userList.on('click', '.remove-user', function () {
	        $('#myModal').modal();
	        removeId = this.id;
	        return false;
	    });

	    $('#remove-confirm').click(function () {
	        (0, _userService.removeUser)(removeId).then(function () {
	            $('#myModal').modal('hide');
	            $form.hide();
	            selectedUser = null;
	        }).then(loadUserList);
	        return false;
	    });

	    $form.on('submit', function (event) {
	        $form.hide();
	        var data = {};

	        var $inputs = $form.find(':input');
	        $inputs.each(function () {
	            if (this.name) {
	                data[this.name] = $(this).val();
	            }
	        });

	        (0, _userService.updateUser)(selectedUser.id, data).then(loadUserList);

	        return false;
	    });

	    $form.on('click', '.star', function () {
	        var $star = $(this);
	        // update model
	        selectedUser.rating = $star.index();

	        // update ui
	        var $rating = $('#rating');
	        var $stars = $star.parent().find('.star');

	        $stars.removeClass('full');
	        $rating.val(selectedUser.rating + 1);

	        $($stars).each(function (index, star) {
	            if (index <= selectedUser.rating) {
	                $(this).addClass('full');
	            }
	        });
	        $star.parent().find('span:last').text(selectedUser.rating + 1 + '/5');
	    });

	    $form.on('click', '.hide-form', function () {
	        $form.hide();
	        selectedUser = null;
	        $('tr').removeClass('table-info');
	        return false;
	    });
	}
	bindEvents();

	function renderTable(userData) {
	    $userList.empty();

	    var userDataContent = _.template($('#user-data-content').html());
	    var toRender = userDataContent({ userData: userData });
	    $userList.append(toRender);

	    // apply metadata to each row
	    $userList.find('tr').each(function (index) {
	        $(this).data({ user: userData[index] });
	    });
	}

	function loadUserList() {
	    selectedUser = null;

	    $.when((0, _userService.getUserList)(), (0, _userService.getMovies)()).then(function (users, movies) {
	        return users.map(function (user) {
	            user.movies = movies.filter(function (movie) {
	                return movie.users.indexOf(user.id) >= 0;
	            }).map(function (movie) {
	                return { name: movie.name };
	            });
	            return user;
	        });
	    }).then(function (userData) {
	        return userData.sort(function (a, b) {
	            return b.rating - a.rating;
	        });
	    }).then(function (userData) {
	        renderTable(userData);
	    }).catch(function (error) {
	        console.error('error', error);
	    });
	}
	loadUserList();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getUserList = getUserList;
	exports.getMovies = getMovies;
	exports.updateUser = updateUser;
	exports.removeUser = removeUser;
	var url = 'http://localhost:1213/';

	function getUserList() {
	    return $.ajax({
	        url: url + "users",
	        dataType: 'jsonp',
	        jsonp: "callback"
	    }).then(function (response) {
	        return response.users;
	    });
	}

	function getMovies() {
	    return $.ajax({
	        url: url + "movies",
	        dataType: 'jsonp',
	        jsonp: "callback"
	    }).then(function (response) {
	        return response.movies;
	    });
	}

	function updateUser(userId, data) {
	    data.userId = userId;

	    return $.ajax({
	        url: url + 'updateUser',
	        type: 'POST',
	        crossDomain: true,
	        data: data
	    });
	}

	function removeUser(userId) {
	    return $.ajax({
	        url: url + 'deleteUser',
	        type: 'DELETE',
	        crossDomain: true,
	        data: { userId: userId }
	    });
	}

/***/ }
/******/ ]);