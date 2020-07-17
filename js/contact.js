class contactLoader {
    constructor(site) {
        this.title = "Contact us about TainoJS";
        this.meta_desc = "Contact us about TainoJS";
        this.starthtml = `
            <div class="pagewrap contact">
                <h1>Contact us about TainoJS</h1>
                <div class="content">
                    As this project is just starting out, please contact Ravavyr with any questions or comments.<br><br>
                    Twitter: <a href="https://twitter.com/ravavyr" target="_blank">@Ravavyr</a><br><br>
                    Email: Ravavyr{at}gmail.com
                </div>
            </div>
        `;
        this.loaddata();
    }

    async loaddata(){
        templateLoader.updatemainnav('contact');
    }
}