"use strict";
/*Run this baby: live-server --port=8080 --entry-file=index.html*/

class taino{
    constructor(routes) {
        /*define taino global vars, mostly endpoints and public creds*/
        this.jspath = '/js';
        this.csspath = '/css';
        this.header = ''; /*sitewide header defined in template.js or wherever*/
        this.footer = ''; /*sitewide footer defined in template.js or wherever*/
        this.templatefile = '/template';

        /*define state variable and initial states*/
        this.state = {};

        /*define current location object*/
        this.cur = {};

        this.routes = Object.keys(routes)
            .sort(function(a,b){ return b.length - a.length; })
            .map(function(path) {
            return {
                path: new RegExp("^" + path.replace(/:[^\s/]+/g, '([\\w%+-]+)') + "$"),
                module: routes[path]
            };
        });
        this.routevars=[];

        this.components = new Map();

        /*on browser load, identify current location object*/
        this.currentpage = this.getcurrent(window.location.pathname);
        this.main = window.document.body; /*defaults to body if no id is set*/
        if(document.getElementById('tainomain')!=null){
            this.main.content = document.getElementById('tainomain');
        }else{
            let maindiv = document.createElement('div');
            maindiv.setAttribute('id','tainomain');
            this.main.appendChild(maindiv);
            this.main.content = document.getElementById('tainomain');
        }
        //beforebegin, afterbegin, afterend
        window.addEventListener('popstate', (event) => {
            this.update();
        });

				const mutationObserver = new MutationObserver(() => {
					this.defaultlisteners();
				});

				mutationObserver.observe(document, {
					childList: true,
				});

        var resizeTimer;
        window.addEventListener("resize", (event) => {
            var t =this;
            if(typeof(resizeTimer)!='undefined'){ clearTimeout(resizeTimer); }
            resizeTimer = setTimeout(function() {
                if(taino.ismobile() ===false){
                    t.loadtemplate();
                    t.update();
                }
            },250);
        });
    }


    createLoader(loader){
          if(typeof window[loader] !== "function") {
            return Function("site", `return new ${loader}(site)`)(this); /*filename+'Loader' has to be the main class.*/
        }
        throw new Error(`${loader} constructor does not exist!`);
    }

    /*additional scripts are loaded via callbacks*/
    loadScript(url){
        /*
        This script returns a promise that resolves when the requested script loads
        or rejects if the requested script doesn't load (think 404 error)
        having a rejection on error allows us to potentially redirect gracefully to a 404 page or what have you.
         */
        if(taino.el('script[data-pageid="'+url+'"]')){
            // script already exists. return a resolved promise.
          return Promise.resolve()
        }else{
            let resolve = null
            let reject = null
            let scriptPromise = new Promise((res,rej)=>{
                resolve = res;
                reject = rej;
            });
            let body = document.body;
            let script = document.createElement('script');
            script.async = false;
            script.type = 'text/javascript';
            script.src = url;
            script.dataset.pageid = url;
            script.onreadystatechange = resolve;
            script.onload = resolve;
            script.onerror = reject;
            body.appendChild(script);
            return scriptPromise;
        }
    }

    getcurrent(path){
        let curr = '/fourohfour'; /*Need to make this have a 404 header*/
        for (var i = 0, l = this.routes.length; i < l; i++) {
            var found = path.replace(".html","").match(this.routes[i].path);
            if(found){
                this.removemeta("robots");
                curr ="/"+this.routes[i].module; // module to load
                this.routevars =  found.slice(1); // arguments for module
                break;
            }
        }
        return curr;
    }

    loadtemplate(){
        if(taino.el("body > header").length>0){ taino.el("body > header")[0].remove(); }
        if(taino.el("body > footer").length>0){ taino.el("body > footer")[0].remove(); }
        const callback = () =>{
            var loader = this.templatefile.replace("/","") + 'Loader';
            this.templateobject = this.createLoader(loader) /*filename+'Loader' has to be the main class.*/
            this.main.header = this.templateobject.header;
            this.main.footer = this.templateobject.footer;
            this.main.content.insertAdjacentHTML('beforebegin',this.main.header);
            this.main.content.insertAdjacentHTML('afterend',this.main.footer);
        }
        return this.loadScript(this.jspath+this.templatefile+'.js').then(callback);
    }

    loadcontent(){
        this.main.setAttribute("class",this.currentpage.replace(/\//gi,''));
        var loader = this.currentpage.substr(1).replace(/\//gi,'_') + 'Loader';
        var hashforanchor = window.location.hash.substr(1);
        if(this.cur.constructor.name && this.cur.constructor.name===loader){
            this.cur = this.createLoader(loader) /*filename+'Loader' has to be the main class.*/
            this.main.content.innerHTML = this.cur.starthtml;
            document.title = this.cur.title;
            taino.el('meta[name=description]').setAttribute("content",this.cur.meta_desc);
            this.defaultlisteners();
            this.loadstyling(loader);
            if(taino.elid(hashforanchor)){
                window.scrollBy(0, taino.elid(hashforanchor).offsetTop);
            }
        }else{
            this.loadScript(this.jspath+this.currentpage+'.js').then(() => {
                this.cur = this.createLoader(loader) /*filename+'Loader' has to be the main class.*/
                this.main.content.innerHTML = this.cur.starthtml;
                document.title = this.cur.title;
                taino.el('meta[name=description]').setAttribute("content",this.cur.meta_desc);
                this.defaultlisteners();
                this.loadstyling(loader);
                if(taino.elid(hashforanchor)){
                    window.scrollBy(0, taino.elid(hashforanchor).offsetTop);
                }
            });
        }
    }

    update(){
        var path =window.location.pathname;
        this.currentpage = this.getcurrent(path);
        this.loadScript(this.jspath+this.currentpage+'.js').then(()=>{
            this.loadcontent();
            window.scrollTo(0,0);
        });
    }

    route(path){
        for (var i = 0, l = this.routes.length; i < l; i++) {
            var found = path.match(this.routes[i].path);
            if(found){
                window.history.pushState({"html": this.main.innerHTML, "pageTitle": this.cur.title}, "", path);
                this.update();
                break;
            }
        }
    }

    static el(x, getall){
        var s = x.trim();
        if(s.indexOf(",") > -1 || s.indexOf(" ") > -1 || getall===true){
            return document.querySelectorAll(s);
        }else{
            return document.querySelector(s);
        }
    }

    static elid(x){
        return document.getElementById(x);
    }

    defaultlisteners(){
        let as = taino.el("a:not(.cap)",true); /*recapture A tags when content reloads*/
        for(let i=0; i<as.length; i++){
            as[i].classList.add("cap");
            if(as[i].getAttribute("target")=="_blank"){continue;}
            let linkhost = as[i].hostname;
            as[i].addEventListener('click', (e) => {
                if (
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.metaKey || // apple
                    (e.button && e.button == 1) // middle click, >IE9 + everyone else
                ){
                    return;
                }
                e.preventDefault();
                let href = as[i].href;
                let pathName = new URL(href);
                if(pathName.hostname === linkhost){
                    window.history.pushState({}, pathName, href);
                    this.update();
                }else{
                    window.location.href = pathName;
                }
                return false;
            });
        }
    }

    loadstyling(loader){ /*loads in styling from a component*/
        if(!this.cur.styling){return ;}
        else{
            if(!taino.el('style.tainocss_'+loader)){
                let body = document.body;
                let style = document.createElement('style');
                style.type = 'text/css';
                style.classList.add('tainocss_'+loader);
                style.innerHTML=this.cur.styling;
                body.appendChild(style);
            }
        }
    }

    static sanitize(str) {
        let temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    addmeta(name, content){
        var newmeta = document.createElement("meta");
        newmeta.name=name;
        newmeta.content=content;
        document.head.appendChild(newmeta);
    }

    removemeta(name){
        var oldmeta = taino.el("meta[name="+name+"]");
        if(oldmeta){
            oldmeta.remove();
        }
    }

    static ismobile() {
        var useragent = navigator.userAgent;
        if(useragent.match(/Android|iPhone|iPad/i)){
            return true;
        } else {
            return false;
        }
    }
};

/*define routes*/
let routes = {
    '/':'home',
    '/about':'about',
    '/docs':'docs',
    '/docs/spa_and_server':'docs/spa_and_server',
    '/frequently-asked-questions':'faq',
    '/contact':'contact',
    '/mit-license':'license'
}

const site = new taino(routes);
site.loadtemplate();
site.loadcontent();
