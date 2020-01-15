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

        
        this.styling =`
        .doggomodals{ display:flex; flex-wrap:wrap; justify-content:space-between; margin:30px auto; width:100%; max-width:1400px; height:500px; }
        .doggomodals .image_tiles{ display:flex; flex-wrap:wrap; justify-content:space-between; width:40%; max-height:100%; border:2px solid #ededed; border-right:0;}
        .doggomodals .image_tiles .tiles{width:23%; height:30%; margin:1%; background:rgba(33,33,33,.9); border-radius:10px; padding:4px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.5s;}
        .doggomodals .image_tiles .tiles:hover{background:rgba(0,162,43,1);}
        .doggomodals .image_tiles .tiles img{align-self:center; border-radius:10px; width:auto; max-height:140px;}
        .doggomodals .image_big{max-height:100%; width:60%; border:2px solid #ededed;}
        .doggomodals .biggywrap{ margin:1%; height:calc(98% - 8px); background:rgba(33,33,33,.9); border-radius:10px; padding:4px; display:flex; align-items:center; justify-content:center;}
        .doggomodals .biggywrap img{ max-height:98%; max-width:98%; animation:imgfadein 3s ease; border-radius:10px;}  
        
        @keyframes imgfadein { from { opacity:0; } to{ opacity:1; } }

        .doggomodals2{ margin:30px auto; width:100%; max-width:1000px; }
        .doggomodals2 .image_tiles{ display:flex; flex-wrap:wrap; justify-content:space-between; border:2px solid #ededed;}
        .doggomodals2 .image_tiles .tiles{width:23%; margin:1%; background:rgba(33,33,33,.9); border-radius:10px; padding:4px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.5s;}
        .doggomodals2 .image_tiles .tiles:hover{background:rgba(0,162,43,1);}
        .doggomodals2 .image_tiles .tiles img{align-self:center; border-radius:10px; width:auto; max-height:200px;}

        .puppyoverlay{position:fixed; top:0; left:0; width:100%; height:100%; background:#333; z-index:100; animation:modalfadeout 1s; animation-fill-mode: forwards; }
        .puppymodal{ display:flex; justify-content:center; position:fixed; top:0; left:0; right:0; bottom:0; margin:auto; width:60vw; height:80vh; background:#666; border-radius:10px; border:4px solid #dedede; z-index:101; animation:modalfadeout 1s; animation-fill-mode: forwards; }
        .puppymodal img{width:auto; height:auto; max-height:100%; align-self:center; border-radius:10px;}
        .puppyoverlay.on{animation:modalfadein 0.5s; animation-fill-mode: forwards; }
        .puppymodal.on{animation:modalfadein 1s; animation-fill-mode: forwards; }

        @keyframes modalfadein { 0% {top:200%; opacity:0; } 100%{top:0; opacity:1; } }
        @keyframes modalfadeout { 0% {top:0; opacity:1; } 100%{ top:200%; opacity:0; } }

        @media screen and (max-width: 960px){
            .doggomodals{height:auto;}
            .doggomodals .image_tiles{width:100%; order:2; border-right:2px solid #ededed; border-top:0;}
            .doggomodals .image_tiles .tiles img{max-height:80px;}
            .doggomodals .image_big{width:100%; order:1; height:300px;}

            .doggomodals2{}

            .puppymodal{width:80vw; height:60vh;}
            @keyframes modalfadein { 0% {top:-200%; opacity:0; } 100%{top:0; opacity:1; } }
            @keyframes modalfadeout { 0% {top:0; opacity:1; } 100%{ top:-200%; opacity:0; } }

        }

        `;
    }
       
    async loaddata(){
        /*Fetch multiple Example*/
        let datastring = await fetch(site.serverurl+'breeds/image/random/12') /*returns 12 dog images*/
        .then(response => response.json())
        .then(async function(json){
            let innerstring='';
            for (var dogimg in json.message) {
                let cleanimg = taino.sanitize(json.message[dogimg]);
                innerstring = innerstring +'<li class="tiles"><img src="'+cleanimg+'" width="200"></li>';

            }
            
            return innerstring;
        });
        
        /*insert elements into html*/
        let tilebox = `
            <ul class="image_tiles">
                ${datastring}
            </ul>
            <div class="image_big">
                <div class="biggywrap">Click a pupper image!</div>
            </div>
        `
        taino.el('.doggomodals').innerHTML = tilebox;

        /*bind events*/
        let dogpics = taino.el(".doggomodals .image_tiles .tiles img");
        for(let i=0; i<dogpics.length; i++){
            dogpics[i].addEventListener("click",function(){
                taino.el(".doggomodals .biggywrap")[0].innerHTML=`<img src="${this.getAttribute("src")}" alt="" />`;
            });
        }
        

        /*Fetch second data set Example*/
        let datadoggies = await fetch(site.serverurl+'breeds/image/random/12') /*returns 12 dog images*/
        .then(response => response.json())
        .then(async function(json){
            let innerstring='';
            for (var dogimg in json.message) {
                let cleanimg = taino.sanitize(json.message[dogimg]);
                innerstring = innerstring +'<li class="tiles"><img src="'+cleanimg+'" width="200"></li>';
          
            }            
            return innerstring;
        });

        /*insert elements into html*/
        let tilebox2 = `
            <ul class="image_tiles">
                ${datadoggies}
            </ul>
        </div>
        `
        taino.el('.doggomodals2').innerHTML = tilebox2;

        

        /*bind events*/
        let dogpics2 = taino.el(".doggomodals2 .image_tiles .tiles img");
        for(let i=0; i<dogpics2.length; i++){
            dogpics2[i].addEventListener("click",function(){
                let pic = this.getAttribute("src");
                site.cur.loadmodal(pic);
            });
        }

    }

    loadmodal(pic){
        /* append modal to parent wrapper*/
        if(taino.el(".puppyoverlay")){
            taino.el(".puppyoverlay").classList.add("on");
            taino.el(".puppymodal").classList.add("on");
        }else{
            taino.el('body').insertAdjacentHTML('beforeend','<div class="puppyoverlay"></div><div class="puppymodal"></div>');
            taino.el(".puppyoverlay").classList.add("on");
            taino.el(".puppymodal").classList.add("on");
            taino.el(".puppymodal").addEventListener("click",function(){
                taino.el(".puppyoverlay").classList.remove("on");
                taino.el(".puppymodal").classList.remove("on");
            });
            taino.el(".puppyoverlay").addEventListener("click",function(){
                taino.el(".puppyoverlay").classList.remove("on");
                taino.el(".puppymodal").classList.remove("on");
            });
        }


        taino.el(".puppymodal").innerHTML='<img src="'+pic+'" alt="Modal Image" />';


    }
}

