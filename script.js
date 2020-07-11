const body = document.querySelector("body");
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
          color: green;
        }
        #logs {
            height: 250px;
            background: #000;
          }
      </style>
      <ul id="logs"></ul>
`;

class GlitchConsole extends HTMLElement {
  constructor() {
    super();
    this.rock = 1;
    this.traceMethodCalls = this.traceMethodCalls.bind(this);

    console = this.traceMethodCalls(console);

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("Custom square element added to page.");
  }

  traceMethodCalls(obj) {
    const handler = glitchConsole => ({
      get(target, propKey, receiver) {
        const targetValue = Reflect.get(target, propKey, receiver);
        if (typeof targetValue === "function") {
          return function(...args) {
            const logs = glitchConsole.shadowRoot.querySelector("ul");
            const li = document.createElement("li");
            const t = document.createTextNode(args);
            li.appendChild(t);
            logs.appendChild(li);
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

const glitch = document.createElement("glitch-console");

body.appendChild(glitch);

console.log("test");
