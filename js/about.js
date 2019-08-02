class aboutLoader {
    constructor(site) {
        this.title = "We are the Taino!";
        this.starthtml = `
            <div class="pagewrap about"><h1>About Taino</h1></div>
        `;
        this.loaddata();
    }

    loaddata(){
        fetch(site.serverurl)
        .then(response => response.json())
        .then(json =>{
            
            let datastring = '';
            //console.log(json.length);
            for(var i = 0; i < json.length; i++) {
                var obj = json[i];
                console.log(obj);
                datastring = datastring+ 'Title: '+obj.title+' -- ID: '+obj.id+'<br />';
            }
            if(!site.el('.info')){
                site.el('.pagewrap.about').insertAdjacentHTML('beforeend','<div class="info"></div>');
            }
            site.el('.info').innerHTML = datastring;
        });
        //setTimeout("site.cur.loaddata()",1000);
        
    }
}