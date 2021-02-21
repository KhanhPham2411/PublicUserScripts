console.log("shared.js");

//configuration
isClassic = document.getElementById("fbHelpLiteFlyout") ? true : false;
fb_dtsg = get_fb_dtsg();

console.log("fb_dtsg: " + fb_dtsg);
console.log("isClassic: " + isClassic);

function get_fb_dtsg(){
    if(isClassic){
        var element = document.querySelector('[name="fb_dtsg"]');
        return element? element.value : null;
    }else{
        var element = (/name":"fb_dtsg","value":"(.*?)"/g).exec(document.body.innerHTML)
        return element? element[1] : null;
    }

}



function EnableObserver(target, callback)
{
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        fb_dtsg = get_fb_dtsg();
        callback(mutations);
    });

    // configuration of the observer:
    var config = { subtree: true, childList: true }

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}

var lstCallback = [];
var lock = false
function documentChanged(callback)
{
    lstCallback.push(callback);
}

function runListCallBack(mutations){
    if (lock == true){
        return
    }
    lock = true
    setTimeout(function(){
        lstCallback.forEach(function(callback){
            callback(mutations);
        });
        setTimeout(function(){
            lock = false
        }, 1000)
    }, 700)
}

EnableObserver(document, runListCallBack);

// Element Builder
function createButton(text)
{
    var link = document.createElement('button');
    var linkText = document.createTextNode(text);
    link.appendChild(linkText);
    return link;
}
function createLink(text)
{
    var link = document.createElement('a');
    var linkText = document.createTextNode(text);
    link.appendChild(linkText);
    return link;
}
function createListItem(child)
{
    var listItem = document.createElement('li');
    listItem.appendChild(child);
    return listItem;
}
function createLinkListItem(text)
{
    return createListItem(createLink(text));
}
function createLinkDivItem(text)
{
    var div = document.createElement('div');
    div.appendChild(createLink(text));
    return div;
}
function createButtonDivItem(text)
{
    var div = document.createElement('div');
    div.appendChild(createButton(text));
    return div;
}

//animation
function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

// react
function findReactValueInternal(object, key) {
    if(!object || !object.pendingProps) {
        return null;
    }

    if(key in object.pendingProps){
        return object.pendingProps[key];
    }

    return findReactValueInternal(object.return, key);
}
function getReactFiber(object){
    for(key in object){
        if(key.contains("reactFiber")){
            return object[key];
        }
    }
}
function findReactValue(object, key){
    return findReactValueInternal(getReactFiber(object), key);
}

// system
function formatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};