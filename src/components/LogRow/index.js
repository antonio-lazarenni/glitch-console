const template = document.createElement("template")

template.innerHTML = `
    <style>
        :host {
          display: block;
          border: 1px solid #fff;
          color: green;
        }
    </style>
    <li>
        <slot></slot>
    </li>
`;

class LogRow extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const text = this.getAttribute('log-text')
        const t = document.createTextNode(text)
        this.appendChild(t)
    }
}

export default LogRow
