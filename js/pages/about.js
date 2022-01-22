class aboutLoader {
    constructor(site) {
        this.title = "We are the Taino!";
        this.meta_desc = "About the Taino JS Framework";
        this.starthtml = `
            <div class="pagewrap about">
                <h1>About TainoJS</h1>
                <div class="content">
                    <p>
                    It's a simple codebase built on vanilla javascript.
                    </p>
                    <h2>TainoJS is the brainchild of Ravavyr.</h2>
                    <p>
                    I've been coding websites and web applications since 2005 and in that time I've noticed how everything has shifted towards making things easier for non-developers to do, and for new developers to use. 
                    This is a great concept, but at the same time web development has been over-abstracted and over-engineered to this end goal that is frankly unachievable.
                    <br><br>
                    You have all seen the bulky and bloated sites out there, full of popups and tracking scripts that the owners don't understand. 
                    Libraries on top of frameworks that contain 100k lines of code, where maybe 5k are being used to actually render the site. 
                    All because the team that built it didn't understand the tools they were using.
                    <br><br>
                    The average person does not need to, nor wants to make websites. They want a website that does the things they want and does it well. 
                    Giving them these modern tools is like saying "Here's a scalpel, go be a surgeon". 
                    Imagine if we started selling "Surgery kits for amateurs" that come with big gloves and dulled scalpels that let you pretend to be a surgeon. 
                    You'd end up with the equivalent of the web today. A massacred pile of things you want to call successful surgeries.
                    <br><br>
                    I propose we simplify the codebase we need to implement websites, but require developers to still learn the basic languages behind web development. 
                    For frontend this is specifically HTML/CSS/Vanilla JS. 
                    In the end, this is what every single website and web application renders.
                    We can use simple tools while producing beautiful and performant websites we can feel proud of.
                    </p>
                    <h2>Why Taino</h2>
                    <p>
                    In looking for a name for what I was building I wanted it to relate to my origins as a native of the carribean. 
                    When I came across the term Taino and its meaning “relatives”, it just felt like the right name as this project is meant to give developers multiple ways to approach building sites and applications by starting with a codebase setup relative to their end goals. 
                    <br><br>
                    Taino is a term referring to the indigenous people of the carribean. 
                    It's original meaning is "relatives" and "good people" and these were considered to be part of the Arawak natives of south america and the carribean.
                    For more information: <a href="https://en.wikipedia.org/wiki/Arawak" target="_blank">See Wikipedia</a> and also <a href="https://www.researchgate.net/publication/296694496_Origins_of_the_word_Taino" target="_blank">The origins of the word Taino</a>
                    </p>
                </div>
            </div>
        `;
        this.loaddata();
    }

    async loaddata(){
        templateLoader.updatemainnav('about');
    }
       
}