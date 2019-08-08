class templateLoader {
    constructor(site) {
        this.header = `
            <header>
                <nav>
                    <a href="/home">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/examples">Examples</a>
                    <a href="http://127.0.0.1:8080/contact">Contact Us</a>
                </nav>
            </header>
        `;        
        this.footer = `
            <footer>Copyright TainoJS&reg;</footer>            
        `;
    }
}