class breedLoader {
    constructor(site) {
        
        this.styling = `
            .doggos{width:80%; max-width:1200px; margin:0 auto 40px auto; font-size:14px; column-count:8;}
            .doggos li{ display:block; text-transform:capitalize;}
        `;
        this.loaddata();
    }

    async loaddata(){
        this.breed = site.sanitize(site.routevars[0]);
        this.title = `Selected Breed: ${this.breed}`;
        this.meta_desc = `A Taino dynamic routing example, selected breed: ${this.breed}`;
        this.starthtml = `
            <div class="pagewrap about"><h1>Everybody loves a ${this.breed}</h1>
            <p>
            An example of using dynamic routing in Taino.<br />
            Each Breed uses the same template file to render images for that specific breed.<br /><br />
            This page does both an XHR request and a Fetch request.
            </p>
            </div>
        `;

        /*XHR Example*/
        site.xhr('GET',site.serverurl+'breed/'+this.breed+'/images',{},function(res){ 
            handleresponse(res);
        });
        
        function handleresponse(data){
            var json = JSON.parse(data); /*In this case it's json, but it doesn't always have to be*/
            let datastring='';
            let innerstring='<ul class="doggos">';
            
            for (var dogimg in json.message) {
                let cleanimg = site.sanitize(json.message[dogimg]);
                innerstring = innerstring +'<li><img src="'+cleanimg+'" width="80"></li>';
            }
            innerstring +='</ul>';
            datastring= innerstring;

            if(!site.el('.info')){
                site.el('.pagewrap.about').insertAdjacentHTML('beforeend','<div class="info"></div>');
            }
            site.el('.info').innerHTML = datastring;
    
        }

        /*Fetch Example*/
        let datastring = await fetch(site.serverurl+'breed/'+this.breed+'/images')
        .then(response => response.json())
        .then(async function(json){
            let innerstring='<ul class="doggos">';
            
            for (var dogimg in json.message) {
                let cleanimg = site.sanitize(json.message[dogimg]);
                innerstring = innerstring +'<li><img src="'+cleanimg+'" width="80"></li>';
            }
            innerstring +='</ul>';
            return innerstring;
        });

        if(!site.el('.info')){
            site.el('.pagewrap.about').insertAdjacentHTML('beforeend','<div class="info"></div>');
        }
        site.el('.info').innerHTML = datastring;
        
    }
}