class docs_spa_and_serverLoader {
    constructor(site) {
        this.title = "SPA and Servers";
        this.meta_desc = "Explanation of Single Page Applications and servers";
        this.starthtml = `
            <div class="pagewrap about">
                <h1>SPA and Servers</h1>
                <div class="content">
                    <p>
                    <button class="goback" onclick="window.history.back();">&lt; Back to Docs</button><br><br>
                    Here are two great articles explaining what a SPA is, how it talks to a server and how it all ties together to run singe page applications.<br>
                    <a href="https://blog.pshrmn.com/how-single-page-applications-work/" target="_blank" rel="nofollow">https://blog.pshrmn.com/how-single-page-applications-work/</a><br>
                    <a href="https://blog.pshrmn.com/single-page-applications-and-the-server/" target="_blank" rel="nofollow">https://blog.pshrmn.com/single-page-applications-and-the-server/</a>
            
                    </p>
                </div>
            </div>
        `;
        this.loaddata();
    }

    async loaddata(){
        templateLoader.updatemainnav('docs');
    }      
}