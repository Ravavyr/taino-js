"use strict";
/*Run this baby: live-server --port=8080 --open=public --entry-file=index.html*/

class siteobj{
    constructor() {
        /*define taino global vars, mostly endpoints and public creds*/
        this.serverurl = 'https://dog.ceo/api/';
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
        this.routes = {
            '/':'home',
            '/home':'home',
            '/about':'about',
            '/contact':'contact',
            '/examples':'examples',
            '/dogs':'dogs'
        }

        this.components = new Map();

        /*on browser load, identify current location object*/
        this.currentpage = this.getcurrent(window.location.pathname);
        this.main = window.document.body; /*defaults to body if no id is set*/
        let maindiv = document.createElement('div');
        maindiv.setAttribute('id','tainomain');
        this.main.appendChild(maindiv);
        this.main.content = document.getElementById('tainomain');

        //beforebegin, afterbegin, afterend
    }

    /*additional scripts are loaded via callbacks*/
    loadScript(url, callback){
        if(typeof(callback)=="function" && site.el('script[data-pageid="'+url+'"]')){ callback(); }
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
        let curr = '';
        if(Object.keys(this.routes).some(function(k){ return ~k.indexOf(path) })) {
            curr = (path == '/' ? "/home" : path);
        }else{
            curr = "/404"; /*Need to make this have a 404 header*/
        }
        return curr;
    }

    loadtemplate(){
        this.loadScript(site.jspath+site.templatefile+'.js',function(){
            var loader = site.templatefile.replace("/","") + 'Loader';
            site.templateobject = Function(`return new ${loader}()`)(); /*filename+'Loader' has to be the main class.*/
            site.main.header = site.templateobject.header;
            site.main.footer = site.templateobject.footer;
            site.main.content.insertAdjacentHTML('beforebegin',site.main.header);
            site.main.content.insertAdjacentHTML('afterend',site.main.footer);
        });
    }

    loadcontent(){        
        site.main.setAttribute("class",site.currentpage.replace("/",""));        
        var loader = site.currentpage.replace("/","") + 'Loader';
        if(site.cur.constructor.name && site.cur.constructor.name==loader){
            site.cur = Function(`return new ${loader}()`)(); /*filename+'Loader' has to be the main class.*/
            site.main.content.innerHTML = site.cur.starthtml;
            document.title = site.cur.title;
            site.defaultlisteners();
            site.loadstyling(loader);
        }else{
            site.loadScript(site.jspath+site.currentpage+'.js',function(){                
                site.cur = Function(`return new ${loader}()`)(); /*filename+'Loader' has to be the main class.*/
                site.main.content.innerHTML = site.cur.starthtml;
                document.title = site.cur.title;
                site.defaultlisteners();
                site.loadstyling(loader);
            });
        }
            /*   
        }else if(site.currentpage=='/game'){
            site.loadScript('/js/socket.js',function(){
                site.sock = io(site.socketurl,{'reconnectionAttempts' : '4','query':'verify='+site.state.sessk});
                site.sock.on('connect_error', function(err) {
                    console.log(err);
                });
                site.sock.on('reload', function(err) {
                    location.reload();
                });
                site.cur = new gamewrap(site);
                site.main.innerHTML = site.cur.starthtml;
                site.cur.loadhtmlobjects();
            });
        }else{
            //site.cur = new fourohfourpage(this);
            site.main.innerHTML = 'no page here'; //site.cur.starthtml;
        }*/
    }

    update(){
        var path =window.location.pathname;
        site.currentpage = site.getcurrent(path);
        site.loadScript(site.jspath+site.currentpage+'.js',site.loadcontent);

    }

    route(path){
        if(Object.keys(site.routes).some(function(k){ return ~k.indexOf(path) })) {
            console.log(path);
            window.history.pushState({"html": site.main.innerHTML, "pageTitle": site.cur.title}, "", path);
            site.update();
        }else{

        }
    }

    xhr(url, data, callback){
        var r = new XMLHttpRequest();
        r.open("POST", url, true);
        r.setRequestHeader("Accept", "application/json");
        r.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200){ return;}
            else { callback(r.responseText); }
        };
        r.send(data);
    }

    el(x, getall){
        var s = x.trim();
        if(s.indexOf(",") > -1 || s.indexOf(" ") > -1 || getall===true){
            return document.querySelectorAll(s);
        }else{
            return document.querySelector(s);
        }
    }
    elid(x){
        return document.getElementById(x);
    }
    defaultlisteners(){
        let as = site.el("a:not(.cap)",true); /*recapture A tags when content reloads*/
        for(let i=0; i<as.length; i++){
            as[i].classList.add("cap");
            let linkhost = as[i].hostname;
            as[i].addEventListener('click', function(e){
                e.preventDefault();
                let pathName = new URL(this.href);
                if(pathName.hostname === linkhost){                    
                    window.history.pushState({}, pathName, this.href);  
                    site.update();
                }else{
                    window.location.href = pathName;
                }
                return false;
            });
        }
    }
    loadstyling(loader){ /*loads in styling from a component*/
        if(!site.cur.styling){return ;}
        else{
            if(!site.el('style.'+loader)){
                let body = document.body;
                let style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML=site.cur.styling;
                body.appendChild(style);
            }
        }
    }
};
let site = new siteobj();
site.loadtemplate();
site.loadcontent();