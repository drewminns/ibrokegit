'use strict';

var iBrokeGit = angular.module('gitApp', ['ngDropdowns', 'ngAnimate']);

iBrokeGit.factory

iBrokeGit.controller('gitAppCtrl', function($scope) {
	$scope.templateOptions = [
		{
			text: 'Push my files',
			url: 'push.html'
		},{
			text: 'Pull Changes from my Repo',
			url: 'pullLocal.html'
		},{
			text: 'Update my repo with changes from another repo',
			url: 'pullUpstream.html'
		},{
			text: 'Clone a repo to my computer',
			url: 'clone.html'
		},{
			text: 'Create a new Repository',
			url: 'create.html'
		},{
			text: 'Fork a Repo',
			url: 'fork.html'
		},{
			text: 'Create a Pull Request',
			url: 'pullRequest.html'
		}];
	$scope.templateSelected = { text: 'Select an Option'};
});