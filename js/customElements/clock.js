function instantiateTemplate(id) {
    const template = document.querySelector(id);
    return template.content.cloneNode(true);
}

class Clock extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const templateInstance = instantiateTemplate("#t-clock");

        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "./style.css");

        shadow.appendChild(linkElem);
        shadow.appendChild(templateInstance);
    }
}

customElements.define("timeflies-clock", Clock);
