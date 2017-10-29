var getHash = () => {
    return window.location.hash;
}

var setHash = (e) => {
    window.location.hash = e;
}

var getHashPre = (e = getHash()) => {
    return (e + "//").split("/")[1];
}

var sliceHash = (e) => {
    var q = e.indexOf("#");
    return e.substring(q+1);
}

var gotoHash = (e) => {
    window.location.hash = e;
}

var flashHashEvent = (e) => {
    var oldUrl = sliceHash(e.oldURL || "");
    var newUrl = sliceHash(e.newURL || window.location.href);
    
    if (getHashPre(oldUrl) == "articles" || getHashPre(oldUrl) == "home") {
        menuRouter = "#" + oldUrl;
    }
    
    if (newUrl.indexOf("/") != 0) {
        gotoHash("/home");
        return;
    }
    
    var routers = newUrl.substring(1).split("/");
    if (routers.length < 1) {
        gotoHash("/home");
        return;
    }
    
    var pre = routers[0];
    if (pre == "articles" || pre == "tag" || pre == "category") {
        if (routers.length == 2) {
            doFuncS[pre](routers[1]);
        } else {
            if (pre == "articles") {
                gotoHash("/home");
                return;
            } else {
                doFunc[pre]();
            }
        }
    } else {
        if (doFunc.hasOwnProperty(pre)) {
            doFunc[pre]();
        }
    }
}

window.onhashchange = (e) => {
    flashHashEvent(e);
}

var doFuncS = {
    "articles": (e) => {
        changeRoute("Article/" + e);
        loadArticleByName(e);
    },
    "tag": (e) => {
        showMenu(2);
        changeRoute("Tag/" + e);
        showTag(e);
    },
    "category": (e) => {
        showMenu(2);
        changeRoute("Category/" + e);
        showCate(e);
    }
}

var doFunc = {
    "home": () => {
        showMenu(0);
        showArticle();
        changeRoute("Home");
        showHome();
    },
    "tag": () => {
        showMenu(2);
        changeRoute("Tag");
        showTag();
    },
    "category": () => {
        showMenu(2);
        changeRoute("Category");
        showCate();
    },
    "link": () => {
        showMenu(2);
        changeRoute("Link");
        showLink();
    }
}