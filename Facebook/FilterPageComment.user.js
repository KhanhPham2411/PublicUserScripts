// ==UserScript==
// @name         Facebook Page Comment Cleaner
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Facebook Filter Page Comment
// @author       You
// @include      *facebook.com/*
// @grant        none
// @require https://raw.githubusercontent.com/KhanhPham2411/PublicUserScripts/main/Core/shared.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Filter Page Comment")

    documentChanged(function(){
        setTimeout(function(){
            FilterPageComment()
        }, 1000)
    });
})();
async function FilterPageComment(){
    var comments = document.querySelectorAll('[aria-label^="Comment by"], [aria-label^="Reply by"]');

    comments.forEach(async function(comment){
        if (comment.actorID == null){
            comment.actorID = findReactValue(comment.querySelector('a[role=link]'), 'actorID')
        }
        if (comment.entity == null){
            comment.entity = await GetEntity(comment.actorID)
            comment.entityType =  comment.entity.data.node.__typename
        }
    
        if (comment.entityType == "Page"){
            comment.parentElement.parentElement.hidden = true;
        }
    });
}
async function GetEntity(actorID){
    let variables = {
        "actorID":`${actorID}`,
        "context":"DEFAULT",
        "scale":1
    }

    var res = await fetch("/api/graphql/", {
    "headers": {
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded",
    },
    "body": `
        &fb_dtsg=${fb_dtsg}
        &variables=${JSON.stringify(variables)}
        &doc_id=3677010929002403`,
    "method": "POST",
    });

    var text = await res.text();
    var entity = JSON.parse(text)

    return entity
}