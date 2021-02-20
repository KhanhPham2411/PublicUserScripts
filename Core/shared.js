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
function documentChanged(callback)
{
    lstCallback.push(callback);
}

function runListCallBack(mutations){
    lstCallback.forEach(function(callback){
        callback(mutations);
    });
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
