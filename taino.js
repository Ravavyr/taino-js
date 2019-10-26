"use strict";
/*Run this baby: live-server --port=8080 --open=home --entry-file=index.html*/

class taino{
    constructor() {
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

        /*define routes*/
        let routes = {
            '/':'home',
            '/about':'about',
            '/docs':'docs',
            '/frequently-asked-questions':'faq',
            '/contact':'contact',
            '/license':'license'
        }
        this.routes = Object.keys(routes)
            .sort(function(a,b){ return b.length - a.length; })
            .map(function(path) {
            return {
                path: new RegExp("^" + path.replace(/:[^\s/]+/g, '([\\w-]+)') + "$"),
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
    }


    createLoader(loader){
        if(typeof window[loader] !== "function") {
            return Function(`return new ${loader}()`)(); /*filename+'Loader' has to be the main class.*/
        }
        throw new Error(`${loader} constructor does not exist!`);
    }

    /*additional scripts are loaded via callbacks*/
    loadScript(url, callback){
        if(typeof(callback)=="function" && taino.el('script[data-pageid="'+url+'"]')){ callback(); }
        else {
            let body = document.body;
            let script = document.createElement('script');
            script.async = false;
            script.type = 'text/javascript';
            script.src = url;
            script.dataset.pageid = url;
            if(typeof(callback)=="function") {
                script.onreadystatechange = callback;
                script.onload = callback;
            }
            body.appendChild(script);
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
/*
        if(Object.keys(this.routes).some(function(k){ return ~k.indexOf(path) })) {
            curr = (path == '/' ? "/home" : path);
        }else{
            curr = "/404"; /*Need to make this have a 404 header*
    }*/
        return curr;
    }

    loadtemplate(){
        const callback = () =>{
            var loader = this.templatefile.replace("/","") + 'Loader';
            this.templateobject = this.createLoader(loader) /*filename+'Loader' has to be the main class.*/
            this.main.header = this.templateobject.header;
            this.main.footer = this.templateobject.footer;
            this.main.content.insertAdjacentHTML('beforebegin',this.main.header);
            this.main.content.insertAdjacentHTML('afterend',this.main.footer);
        }
        this.loadScript(this.jspath+this.templatefile+'.js',callback);
    }

    loadcontent(){


        this.main.setAttribute("class",this.currentpage.replace("/",""));
        var loader = this.currentpage.replace("/","") + 'Loader';
        if(this.cur.constructor.name && this.cur.constructor.name===loader){
            this.cur = this.createLoader(loader) /*filename+'Loader' has to be the main class.*/
            this.main.content.innerHTML = this.cur.starthtml;
            document.title = this.cur.title;
            this.el('meta[name=description]').setAttribute("content",this.cur.meta_desc);
            this.defaultlisteners();
            this.loadstyling(loader);
        }else{
            this.loadScript(this.jspath+this.currentpage+'.js',() => {
                this.cur = this.createLoader(loader) /*filename+'Loader' has to be the main class.*/
                this.main.content.innerHTML = this.cur.starthtml;
                document.title = this.cur.title;
                this.el('meta[name=description]').setAttribute("content",this.cur.meta_desc);
                this.defaultlisteners();
                this.loadstyling(loader);
            });
        }
    }

    update(){
        var path =window.location.pathname;
        this.currentpage = this.getcurrent(path);
        this.loadScript(this.jspath+this.currentpage+'.js',this.loadcontent);

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
       /* if(Object.keys(site.routes).some(function(k){ return ~k.indexOf(path) })) {
            console.log(path);
        }else{

        }*/
    }

    static xhr(type,url, data, callback){
        var r = new XMLHttpRequest();
        r.open(type.toUpperCase(), url, true);
        //r.setRequestHeader("Accept", "application/json");
        //r.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        r.onreadystatechange = function () {
            if (r.readyState !== 4) return;
            if (r.status >= 200 && r.status < 300) {
                callback(r.responseText);
            } else {
                console.log('error',r);
            }
        };
        r.send(data);
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
        let as = this.el("a:not(.cap)",true); /*recapture A tags when content reloads*/
        for(let i=0; i<as.length; i++){
            as[i].classList.add("cap");
            let linkhost = as[i].hostname;
            as[i].addEventListener('click', function(e){
                e.preventDefault();
                let pathName = new URL(this.href);
                if(pathName.hostname === linkhost){
                    window.history.pushState({}, pathName, this.href);
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
            if(!this.el('style.'+loader)){
                let body = document.body;
                let style = document.createElement('style');
                style.type = 'text/css';
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
        var oldmeta = document.querySelector("meta[name="+name+"]");
        if(oldmeta){
            oldmeta.remove();
        }
    }

};

let site = new taino();
site.loadtemplate();
site.loadcontent();
