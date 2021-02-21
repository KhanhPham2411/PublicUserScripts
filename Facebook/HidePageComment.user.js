// ==UserScript==
// @name         Facebook Hide Page Comment
// @namespace    khanhpham2411
// @version      1.0.3
// @description  Facebook Hide Page Comment
// @author       You
// @include      *facebook.com/*
// @grant        none
// @require https://raw.githubusercontent.com/KhanhPham2411/PublicUserScripts/main/Core/shared.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Hide Page Comment")

    documentChanged(function(){
        HidePageComment()
    });
})();
async function HidePageComment(){
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
            await hideComment(comment)
            comment.parentElement.parentElement.hidden = true;
        }
    });
}
async function hideComment(comment){
	var commentId = findReactValue(comment, 'comment').id;

	let variables = {
		"input": {
		  "client_mutation_id": "1",
		  "actor_id": "1000000",
		  "comment_id": `${commentId}`,
		  "feedback_source": 2,
		  "site": "www"
		},
		"isComet": true,
		"feedLocation": "PERMALINK"
	  }
	
    var res = await fetch("https://www.facebook.com/api/graphql/", {
		"headers": {
			"content-type": "application/x-www-form-urlencoded",
		},
		"body": `
			__comet_req=1&fb_dtsg=${fb_dtsg}&
			fb_api_req_friendly_name=UFI2HideCommentMutation&variables=${JSON.stringify(variables)}&doc_id=2545600248900847`,
		"method": "POST"
    });

    return await res.text();
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