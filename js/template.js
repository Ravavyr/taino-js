class templateLoader {
    constructor(site) {
        this.header = `
            <header>
                <nav>
                    <a data-active="home" href="/">Home</a>
                    <a data-active="about" href="/about">About Us</a>
                    <a data-active="docs" href="/docs">Docs</a>
                    <a data-active="faq" href="/frequently-asked-questions">F.A.Q.</a>
                    <a data-active="contact" href="/contact">Contact Us</a>
                </nav>
            </header>
        `;        
        this.footer = `
            <footer>
                Copyright TainoJS&reg; - 2019 - 2020<br>
                <a href="/mit-license">MIT Style License</a>
            </footer>            
        `;
    }

    static updatemainnav(linkname){        
        let curlink = taino.el('header nav a[data-active="'+linkname+'"]')[0];
        if(curlink){
            if(taino.el('header nav a.active').length>0){ taino.el('header nav a.active')[0].classList.remove("active"); }
            curlink.classList.add("active");
        }
    }
}