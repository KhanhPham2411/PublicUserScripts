// ==UserScript==
// @name         Facebook Page Comment Cleaner
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Facebook Filter Page Comment
// @author       You
// @include      *facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Hello world")
})();

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
    "body": `av=100003962809479&__a=1&__dyn=7AzHxqU5a5Q2m3mbG2KnFw9uu2i5U4e0yoW3q322aewXwnEbotwp8O2S1DwUx609vCxS320om78-0BE88427Uy11xmfz83WwgEcHzoaEaoG0Boy1PwBgK7qxS18wc61uwPyoox22K263ifK6E7e58jwGzEaE766Fobrxu5Elxm3y2K5ojUlDw-wAxe1MwDy88EbU2kw&__csr=gcn6ZT2ArN5hApkTT4ihIREWFs_kW_7h4OV7-mRp2Kzn9nvtqCjjq8uyaJ4BlW-pSiLmiZvBjzuFXRBAoxkmingB5miX-iUB2WAVemUXCiOAoHCZ3aAALQ4edCt9a8CmaBhA9iFeHp4iaByoGmfyEOq7F9ufGKjAAxe4uvUSaiAZ6BVo4uaxC6Ey5ElKqqm8y5z8KUjhozy98yU4jG9AyqGJ4wKUO4U9F8ymEF4wMyUpxCfwKxe9yU9edwGoC9Qp0xUozA3pe7WyEmwTyEzyEO3Za2q4ocE8oHwo85a4E0mfw0qFUbo1n8qw5mw9m0esw6GwFxx0dTwk9Qicz-cKAbU9qAg2vwmEiwmo4904_wzwwwCgO2C224o4J1mza7k23SeyE8k0oh09-0fkw0wJw6Iw&__req=5i&__beoa=0&__pc=EXP2%3Acomet_pkg&dpr=1&__ccg=GOOD&__rev=1003337484&__s=wu05tz%3A23i5mv%3Aykhzsx&__hsi=6931319880962660833-0&__comet_req=1
    &fb_dtsg=${fb_dtsg}
    &jazoest=22151&__spin_r=1003337484&__spin_b=trunk&__spin_t=1613823669&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CometHovercardQueryRendererQuery
    &variables=${JSON.stringify(variables)}&server_timestamps=true&doc_id=3677010929002403`,
    "method": "POST",
    });

    var text = await res.text();
    var entity = JSON.parse(text)

    return entity
}