class homeLoader {
    constructor(site) {
        this.title = "Welcome to the Taino!";
        this.meta_desc = "Taino is a vanilla javascript framework";
        this.starthtml = `
            <div class="pagewrap home">
                <h1>Taino JS<span>A simple code base for making websites</span></h1>
                <div class="content">
                    <a class="btn" href="/docs" title="Start learning Taino">Get Started!</a>
                </div>

                <div class="two-blocks">
                    <div class="block">
                        <h2>Our Purpose</h2>
                        <p>
                            The goal was to create a script/framework/library that would allow anyone to quickly build websites using minimal html/css/javascript
                            <br><br>We miss when the web was simple to code for, so we're bringing it back.
                        </p>
                    </div>
                    <div class="block">
                        <h2>Why should I use it?</h2>
                        <p>
                            You will be able to build any website or web app without a massive learning curve. You only need to know HTML/CSS/Javascript.
                            Taino itself is made to be as simple as possible when compared to other frameworks.<br><br>
                            Save yourself time and often money.
                        </p>
                    </div>         
                </div>
                <div class="content">
                    <a class="btn" href="/docs" title="Start learning Taino">Get Started!</a>
                </div>
            
            </div>
        `;
    }
}