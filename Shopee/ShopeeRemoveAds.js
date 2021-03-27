// ==UserScript==
// @name         Shopee remove ads
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       You
// @include      *shopee*
// @grant        none
// @require https://raw.githubusercontent.com/KhanhPham2411/PublicUserScripts/main/Core/shared.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Hide Page Comment")

    documentChanged(function(){
        RemoveAds();
    });
})();

function RemoveAds(){
    var items = [...document.querySelectorAll('.shopee-search-item-result__item')]
                .filter(item => item.innerHTML.includes('Tài'));
    items.forEach(function(item){
        item.hidden = true;
    })
}