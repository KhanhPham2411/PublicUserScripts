// ==UserScript==
// @name         Tiki hide low sale
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       You
// @include      *tiki*
// @grant        none
// @require https://raw.githubusercontent.com/KhanhPham2411/PublicUserScripts/main/Core/shared.js
// ==/UserScript==

(function() {
	'use strict';

	// Your code here...
	console.log("Hide Low Sale")

	documentChanged(function(){
			HideLowSale();
	});
})();

function HideLowSale(){
	var items = [...document.querySelectorAll('.product-item')]
		.filter(item => {
			var result = /Đã bán ([0-9]*)/g.exec(item.innerHTML);
			if(result == null) {
				return true;
			}
			if (result[1] < 100) {
				return true;
			}

			return false;
		});
	items.forEach(function(item){
			item.remove();
	})
}
