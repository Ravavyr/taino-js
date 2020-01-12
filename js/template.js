class templateLoader {
    constructor(site) {
        this.header = `
            <header>
                <nav>
                    <a href="/">Home</a>
                    <a href="/one">Basic Layouts</a>
                    <a href="/two">Slideshows</a>
                    <a href="/three">Modals/Popups</a>                   
                </nav>
            </header>
        `;        
        this.footer = `
            <footer>
                Copyright Do Your Thing<br>
            </footer>            
        `;
    }
}