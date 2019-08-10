class dogsLoader {
    constructor(site) {
        this.title = "Pick a Breed, any Breed";
        this.meta_desc = "A Taino dynamic routing example";
        this.starthtml = `
            <div class="pagewrap about"><h1>Dog Breeds</h1>
            <p>
            An example of using dynamic routing in Taino.<br />
            Each Breed uses the same template file to render images for that specific breed.
            </p>
            </div>
        `;
        this.styling = `
            .breeds{width:80%; max-width:1200px; margin:0 auto 40px auto; font-size:14px; column-count:3;}
            .breeds li{ display:block; text-transform:capitalize;}
        `;
        this.loaddata();
    }

    async loaddata(){
        let datastring = await fetch(site.serverurl+'breeds/list/all')
        .then(response => response.json())
        .then(async function(json){
            let innerstring='<ul class="breeds">';
            for (var breed in json.message) {
                /*await fetch(site.serverurl+'breed/'+breed+'/images/random')
                .then(response2 => response2.json())
                .then(json2 =>{
                    innerstring = innerstring+ '<div>'+breed+'<img src="'+json2.message+'" alt="Random '+breed+'"></div>';
                }); */
                let cleanbreed = site.sanitize(breed);
                innerstring = innerstring +'<li><a href="dogs/'+cleanbreed+'">'+cleanbreed+'</a></li>';
            }
            innerstring +='</ul>';
            return innerstring;
        });

        if(!site.el('.info')){
            site.el('.pagewrap.about').insertAdjacentHTML('beforeend','<div class="info"></div>');
        }
        site.el('.info').innerHTML = datastring;

        //setTimeout("site.cur.loaddata()",1000);
        
    }
}