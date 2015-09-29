/**
@toc

@param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
TODO

@param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
TODO

@dependencies
TODO

@usage
partial / html:
<div app-my-directive></div>
TODO

controller / js:
TODO

//end: usage
*/

'use strict';

angular.module('app').directive('appMyDirective', [ function () {

	return {
		restrict: 'A',
		scope: {
                    scopeTest: '=', 
                    funcOne: '&?'
		},

		// replace: true,
		template: function(element, attrs) {
                if(!attrs.customText) {
                   attrs.customText='';
                }
			var html ="<div class='app-my-directive-cont'>"+
				"my-directive edit"+
				"<br />custome text: "+ attrs.customText +
				"<br />scope one: {{scopeTest}}" +
				"<br />scope two: {{scopeTwo}}" +
                                "<div class='btn' ng-click='emitEvt()'>EmitEvt</div>"+
                                "<div class='btn' ng-click='funcOne()'>FuncYan</div>"+
			"</div>";
			return html;
		},
		
		link: function(scope, element, attrs) {
		},
		
		controller: function($scope, $element, $attrs) {
                    $scope.scopeTwo = 'Scope Yan 2';
                    $scope.emitEvt = function() {
                        $scope.$emit('appMyDirectiveEvt1', {});
                        console.log('directive emit event');  
                    };
		}
	};
}]);
