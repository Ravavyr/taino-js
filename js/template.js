class templateLoader {
    constructor(site) {
        this.header = `
            <header>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/docs">Docs</a>
                    <a href="/frequently-asked-questions">F.A.Q.</a>
                    <a href="/contact">Contact Us</a>
                </nav>
            </header>
        `;        
        this.footer = `
            <footer>
                Copyright TainoJS&reg; - 2019<br>
                <a href="/license">MIT Style License</a>
            </footer>            
        `;
    }
}