class threeLoader {
    constructor(site) {
        this.title = "Image galleries with modals in Taino";
        this.meta_desc = "How to setup a gallery with modal using Taino";
        this.starthtml = `
            <div class="pagewrap">
                <h1>Galleries with modals!</h1>
                <ul>
                <li>This page uses the dogs.ceo api to pull in random dog images.</li>
                <li>Note these modals can be applied to the sliders and static layouts too.</li>
                </ul>               
                <div class="doggomodals"></div>
                <div class="doggomodals2"></div>

            </div>
        `;

        this.loaddata();

        /*copied default styling from: https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css
        You can also just include this in the index.html if it's something you'll use across the entire project*/
        this.styling =`
        .doggomodals,.doggomodals2{ margin:30px 0; }
        `;
    }
       
    async loaddata(){
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

