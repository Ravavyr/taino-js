class twoLoader {
    constructor(site) {
        this.title = "Slideshow layouts with Taino";
        this.meta_desc = "How to setup a slideshow layout with Taino";
        this.starthtml = `
            <div class="pagewrap">
                <h1>Slideshow Layouts!</h1>
                <ul>
                <li>This page uses the https://dog.ceo api to pull in random dog images.</li>
                <li>We're using https://glidejs.com/ to generate the slider.</li>
                </ul>               
                <div class="doggoslides"></div>
                <div class="doggoslides2"></div>

            </div>
        `;

        this.loaddata();

        /*copied default styling from: https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css
        You can also just include this in the index.html if it's something you'll use across the entire project*/
        this.styling =`
        .doggoslides,.doggoslides2{ margin:30px 0; }
        .glide{position:relative;width:100%;box-sizing:border-box}.glide *{box-sizing:inherit}.glide__track{overflow:hidden}.glide__slides{position:relative;width:100%;list-style:none;backface-visibility:hidden;transform-style:preserve-3d;touch-action:pan-Y;overflow:hidden;padding:0;white-space:nowrap;display:flex;flex-wrap:nowrap;will-change:transform}.glide__slides--dragging{user-select:none}.glide__slide{width:100%;height:100%;flex-shrink:0;white-space:normal;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}.glide__slide a{user-select:none;-webkit-user-drag:none;-moz-user-select:none;-ms-user-select:none}.glide__arrows{-webkit-touch-callout:none;user-select:none}.glide__bullets{-webkit-touch-callout:none;user-select:none}.glide--rtl{direction:rtl}
        /*custom overrides*/
        .glide{max-width:1200px; margin:0 auto; }
        .glide_slide{background:rgba(33,33,33,.5); padding:2px; display:flex; justify-content:center; align-items:center;}
        .glide_slide img{align-self:center; border-radius:10px; width:auto; max-height:300px;}
        .glide__arrows,.glide__bullets{margin-top:10px;}
        .glide__arrow{color: #fff; padding:0.5rem 1rem; border:0; border-radius:4px; box-shadow:0px 0px 5px #C59952; background:rgba(13, 18, 25,0.8);}
        .glide__bullet{padding:0.5rem; margin:2px; border:0; border-radius:50%; box-shadow:0px 0px 5px #C59952; background:rgba(13, 18, 25,0.8);}
        .glide__bullet:hover{cursor:pointer; background:#00A128;}
        .glide__bullet--active{box-shadow:0px 0px 5px #00A128; background:#00A128;}
        `;
    }
       
    async loaddata(){
        /*insert the glide js script into this page*/
        site.loadScript('https://cdn.jsdelivr.net/npm/@glidejs/glide');

        /*Fetch multiple Example*/
        let datastring = await fetch(site.serverurl+'breeds/image/random/12') /*returns 10 dog images*/
        .then(response => response.json())
        .then(async function(json){
            let innerstring='';
            for (var dogimg in json.message) {
                let cleanimg = taino.sanitize(json.message[dogimg]);
                innerstring = innerstring +'<li class="glide_slide"><img src="'+cleanimg+'" width="200"></li>';

            }
            
            return innerstring;
        });
        
        /*insert elements into html*/
        let slidebox = `
        <div class="glide">
            <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${datastring}
            </ul>
            </div>
            <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--start" data-glide-dir="<<">Start</button>
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                <button class="glide__arrow glide__arrow--end" data-glide-dir=">>">End</button>
            </div>
        </div>
        `
        taino.el('.doggoslides').innerHTML = slidebox;

        /*triggering slideshow*/
        new Glide('.doggoslides .glide').mount();

        /*Fetch second data set Example*/
        let datadoggies = await fetch(site.serverurl+'breeds/image/random/12') /*returns 10 dog images*/
        .then(response => response.json())
        .then(async function(json){
            let innerobj={};
            innerobj.text='';
            innerobj.bullets='';
            var counter=0;
            for (var dogimg in json.message) {
                let cleanimg = taino.sanitize(json.message[dogimg]);
                innerobj.text = innerobj.text +'<li class="glide_slide"><img src="'+cleanimg+'" width="200"></li>';
                innerobj.bullets = innerobj.bullets +'<button class="glide__bullet" data-glide-dir="='+counter+'"></button>';
                counter++;                
            }            
            return innerobj;
        });

        /*insert elements into second slider html
        note the fetch has returned an object instead of string so we have two data objects*/
        let slidebox2 = `
        <div class="glide">
            <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${datadoggies.text}
            </ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">   
                ${datadoggies.bullets}                
            </div>
        </div>
        `
        taino.el('.doggoslides2').innerHTML = slidebox2;

        /*triggering second slideshow*/
        new Glide('.doggoslides2 .glide',{
            type: 'carousel',
            startAt: 0,
            perView: 3,
            autoplay:3000
        }).mount();
    }
}

