import LogRow from '../LogRow/index.js'

const template = document.createElement("template");

template.innerHTML = `
    <style>
        :host {
          display: block;
          position: absolute;
          z-index: 1;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 250px;
          color: #ffffff;
          background: #17032e;
        }
      </style>
      <ul id="logs">
      </ul>
`;

class GlitchConsole extends HTMLElement {
  constructor() {
    super();
    this.traceMethodCalls = this.traceMethodCalls.bind(this);

    console = this.traceMethodCalls(console);
    
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    
    this.logs = this.shadowRoot.querySelector("ul");
  }

  connectedCallback() {
    // console.log("Custom square element added to page.");
  }

  traceMethodCalls(obj) {
    const handler = glitchConsole => ({
      get(target, propKey, receiver) {
        const targetValue = Reflect.get(target, propKey, receiver);
        if (typeof targetValue === "function") {
          return function(...args) {
            const row = document.createElement("log-row")
            row.setAttribute('log-text', args);
            glitchConsole.logs.appendChild(row);

            return targetValue.apply(this, args);
          };
        } else {
          return targetValue;
        }
      }
    });

    return new Proxy(obj, handler(this));
  }
}

customElements.define("glitch-console", GlitchConsole);

export default GlitchConsole
