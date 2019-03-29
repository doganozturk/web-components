import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

class TooltipLitElement2 extends LitElement {
    static get styles() {
        return css`
            span {
                cursor: pointer;
            }
            
            div {
                background-color: #fff;
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
        `;
    }

    static get properties() {
        return {
            text: String,
            contentVisible: Boolean,
        }
    }

    constructor() {
        super();

        this.text = 'Standart metin';
        this.contentVisible = false;
    }

    handleMouseenter() {
        this.contentVisible = true;
    }

    handleMouseleave() {
        this.contentVisible = false;
    }

    render() {
        return html`
            <slot></slot><span
                @mouseenter="${this.handleMouseenter}"
                @mouseleave="${this.handleMouseleave}"
            >*</span>
            ${this.contentVisible ?
                html`
                    <div>
                        <span>${this.text}</span>
                    </div>
                ` :
                ''
            }
        `;
    }
}

customElements.define('zingat-tooltip-lit-element-2', TooltipLitElement2);

