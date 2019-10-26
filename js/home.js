class homeLoader {
    constructor(site) {
        this.title = "Welcome to the Taino!";
        this.meta_desc = "Taino is a vanilla javascript framework";
        this.starthtml = `
            <div class="pagewrap home">
                <h1>Taino <span>Javascript stuff for making websites</span></h1>
                <div class="content">
                    <a href="/docs" title="Start learning Taino">Get Started!</a>
                </div>

                <div class="two-blocks">
                    <div class="block">
                        <h2>Our Purpose</h2>
                        <p>
                            The goal was to create a script/framework/library that would allow anyone to quickly build websites using minimal html/css/javascript                        
                        </p>
                    </div>
                    <div class="block">
                        <h2>Questions about Taino</h2>
                    </div>         
                </div>
            
            </div>
        `;
    }
}