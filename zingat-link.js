class Link extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', e => {
           /*e.preventDefault();

           window.location = 'https://zingat.dev';*/

           if (!confirm('Bu siteden ayrılmak istediğinize emin misiniz?')) {
               e.preventDefault();
           }
        });
    }
}

customElements.define('zingat-link', Link, { extends: 'a' });