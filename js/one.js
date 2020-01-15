class oneLoader {
    constructor(site) {
        this.title = "Basic image layout with Taino";
        this.meta_desc = "How to setup a basic image layout with Taino";
        this.starthtml = `
            <div class="pagewrap">
                <h1>Basic Image Layouts</h1>
                <ul>
                <li>This page uses the dogs.ceo api to pull in random dog images.</li>
                <li>We have a standard image layout and a flexbox layout.</li>
                </ul>               
                <div class="doggopic"></div>
                <div class="doggyflex"></div>
            </div>
        `;

        this.styling = `
            .doggopic{ padding:50px 0; }
            .doggopic img{border:2px solid #ccc; border-radius:50%; width:300px;}
            .doggyflex{display:flex; flex-wrap:wrap; justify-content:space-between;}
            .doggyflex .im{width:23%; padding:2px; border-radius:10px; margin-bottom:2vw; background:rgba(33,33,33,.5); display:flex; justify-content:center; align-items:center;}
            .doggyflex .im img{align-self:center; border-radius:10px; width:auto; max-height:200px;}

            @media screen and (max-width:960px){
                .doggyflex .im{width:48%;}
            }
        `;

        this.loaddata();
    }
       
    async loaddata(){

        
        /*Fetch Example*/
        let datastring = await fetch(site.serverurl+'breeds/image/random') /*returns only one dog image*/
        .then(response => response.json())
        .then(async function(json){
            let innerstring='';
            let cleanimg = taino.sanitize(json.message);
            innerstring = innerstring +'<img src="'+cleanimg+'" width="400">';
            
            taino.el('.doggopic').innerHTML = innerstring; /*if no further interactions are needed updata html from within the fetch result.*/
            return true;
        });

        /*Fetch multiple Example*/
        let datastring2 = await fetch(site.serverurl+'breeds/image/random/12') /*returns 10 dog images*/
        .then(response => response.json())
        .then(async function(json){
            let innerstring='';
            for (var dogimg in json.message) {
                let cleanimg = taino.sanitize(json.message[dogimg]);
                innerstring = innerstring +'<div class="im"><img src="'+cleanimg+'" width="200"></div>';
            }
            
            return innerstring;
        });
        
        /*
        here you can do further interactions with the response data by manipulating datastring 
        or returning the json data as an object to it
        In this case we are only updating the interface, see next example for more complexity*/
        taino.el('.doggyflex').innerHTML = datastring2;

    }
}