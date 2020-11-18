class docsLoader {
    constructor(site) {
        this.title = "How to use Taino JS";
        this.meta_desc = "Examples for uses of the Taino JS Framework";
        this.starthtml = `
            <div class="pagewrap about">
                <h1>Taino 101</h1>
                <div class="content">
                    <p>
                        The Source Code lives here and is open source:<br>
                        <a href="https://github.com/Ravavyr/taino-js" target="_blank" rel="noopener">https://github.com/Ravavyr/taino-js</a><br>
                        The branches mentioned below can be downloaded there.
                    </p>
                    <p>
                        <h2>Initial Requirements</h2>
                        <ul>
                            <li>Taino is a Single Page Application - <a href="/docs/spa_and_server">Read about SPA and Servers</a></li>
                            <li>Once you can run a SPA, it's just a matter of dropping the files into place.</li>
                            <li>Our instructions will help you set it up using <a class="cap" href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.JS</a> with NPM to get <a href="https://www.npmjs.com/package/live-server" target="_blank" rel="noopener">Live Server</a> installed</li>
                        </ul>
                    </p>
                </div>
                <div class="content">
                    <p>
                        <h2>Installing any Branch</h2>
                        <ul class="l">
                            <li>Clone or download any branch from our <a class="cap" href="https://github.com/Ravavyr/taino-js" target="_blank" rel="noopener">repository</a>.<br>
                            In time we'll create different branches with different purposes.</li>
                            <li>Install <a class="cap" href="https://www.npmjs.com/package/live-server" target="_blank" rel="noopener">Live Server</a> [may require <a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js</a> and NPM depending on your setup]
                            <li>Use your terminal/command line to navigate to the folder with the files</li>
                            <li>Run the command stored at the top of taino.js.<br>It looks something like this: <a class="cap" href="https://www.npmjs.com/package/live-server" target="_blank" rel="noopener">~~live-server --port=8080 --entry-file=index.html~~</a></li>
                            <li>It's a live-server command, you can modify your starting/base url any time making your site load any component for your "home page".</li>
                        </ul>
                    </p>
                </div>
                <div class="content">
                    <p>
                        <h2>Current Branches</h2>
                        <ul class="l">
                            <li><a class="cap" href="https://github.com/Ravavyr/taino-js" target="_blank" rel="noopener">Taino_Base:</a> This branch is this website.</li>
                            <li><a class="cap" href="https://github.com/Ravavyr/taino-js/tree/taino_simple" target="_blank" rel="noopener">Taino_Simple:</a> [a basic 2 flat pages starter site]</li>
                            <li><a class="cap" href="https://github.com/Ravavyr/taino-js/tree/taino_galleries" target="_blank" rel="noopener">Taino_Galleries:</a> [built for portfolio sites]</li>
                        </ul>
                        <h3>Coming Soon:</h3>
                        <ul class="l">
                            <li>Taino_Ecomm: [built with ecommerce in mind, with cart logic and partial checkout]</li>
                            <li>Taino_Business: [built as a standard business website layout]</li>
                            <li>Ideas for additional builds are welcome.</li>
                        </ul>
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