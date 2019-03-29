class ToolTip extends HTMLElement {
    constructor() {
        super();

        this.tooltipIcon = null;
        this.text = 'Standart metin';
        this.bgColor = "#fff";
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                span {
                    cursor: pointer;
                }
                
                div {
                    background-color: ${this.bgColor};
                    color: #000;
                    padding: 0.5rem;
                    border: 1px solid #000;
                    border-radius: 4px;
                    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.5);
                    position: absolute;
                    top: 0.5rem;
                    left: 0.5rem;
                    z-index: 1;
                }
                
                ::slotted(.bg-orange) {
                    background-color: orange;
                }
                
                :host {
                    border: 1px dashed cornflowerblue;
                }
                
                :host(.attention) {
                    font-weight: bold;
                    font-size: 21px;
                }
                
                :host-context(p.info-content) {
                    font-style: italic;
                }
            </style>

            <slot></slot><span>*</span>
        `;
    }

    render(e) {
        const visible = e.type === 'mouseenter';

        let tooltipContent = this.shadowRoot.querySelector('div');

        if (visible) {
            tooltipContent = document.createElement('div');
            tooltipContent.innerHTML = '<span>' + this.text + '</span>';
            tooltipContent.style.backgroundColor = this.bgColor;
        }

        if (visible) {
            this.shadowRoot.appendChild(tooltipContent);
        } else if (!visible && tooltipContent) {
             this.shadowRoot.removeChild(tooltipContent);
        }
    }

    connectedCallback() {
        this.text = this.getAttribute('text') || this.text;
        this.bgColor = this.getAttribute('bg-color') || this.bgColor;

        this.tooltipIcon = this.shadowRoot.querySelector('span');
        this.tooltipIcon.addEventListener('mouseenter', this.render.bind(this));
        this.tooltipIcon.addEventListener('mouseleave', this.render.bind(this));
    }

    disconnectedCallback() {
        this.tooltipIcon.removeEventListener('mouseenter', this.render);
        this.tooltipIcon.removeEventListener('mouseleave', this.render);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'text') {
            this.text = newValue;
        }

        if (name === 'bg-color') {
            this.bgColor = newValue;
        }
    }

    static get observedAttributes() {
        return ['text', 'bg-color'];
    }
}

customElements.define('zingat-tooltip', ToolTip);