class fourohfourLoader {
    constructor(site) {
        this.title = "Page Not Found";
        this.meta_desc = "Page Not Found";
        this.starthtml = `
            <div class="pagewrap about"><h1>Page not Found, Shoo!</h1>
            <p>
            Ok, so not Shoo, but seriously the url you found doesn't exist.
            </p>
            <h2>Use the menu to find content :)</h2>
            </div>
        `;
        this.loaddata();
    }
    
    loaddata(){
        site.addmeta('robots','noindex');
    }
}