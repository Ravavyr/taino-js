class faqLoader {
    constructor(site) {
        this.title = "Questions about TainoJS";
        this.meta_desc = "Questions and answers about the TainoJS";
        this.starthtml = `
            <div class="pagewrap">
                <h1>Frequently Asked Questions about TainoJS</h1>
                <div class="content">
                    <h2>Why did you make TainoJS?</h2><name id="make" name="make"></a>
                    <p>
                    Existing frameworks have tried to abstract away from core vanilla javascript far too much and from our point of view it is not necessary. 
                    We simply need to create "good relatives" to vanilla js, just the Taino.
                    </p>
                    <h2>What does Taino mean?</h2><name id="what" name="what"></a>
                    <p>
                    Taino is a term referring to the indigenous peoples of the carribean. 
                    It's original meaning is "relatives" and "good people" and these were considered to be part of the Arawak natives of south america and the carribean.
                    For more information: <a href="https://en.wikipedia.org/wiki/Arawak">See Wikipedia</a> and also <a href="https://www.researchgate.net/publication/296694496_Origins_of_the_word_Taino">The origins of the word Taino</a>
                    </p>
                    <h2>Why should I use TainoJS?</h2><name id="why" name="why"></a>
                    <p>
                        You will be able to build any website or web app without a massive learning curve. You only need to know HTML/CSS/Javascript.
                        Taino itself is made to be as simple as possible when compared to other frameworks.<br><br>
                        Save yourself time and often money.
                    </p>
                </div>    
            </div>
        `;
        this.loaddata();
    }

    async loaddata(){
        templateLoader.updatemainnav('faq');
    }
}