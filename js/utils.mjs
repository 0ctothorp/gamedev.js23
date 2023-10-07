export function randomInt(to) {
    return Math.floor(Math.random() * to);
}

export function instantiateTemplate(id) {
    const template = document.querySelector(id);
    return template.content.cloneNode(true);
}

export const qs = document.querySelector.bind(document);
export const qsa = document.querySelectorAll.bind(document);

export const playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
};

/** Map<queryString, DOMNode> */
const DOM_NODES = new Map();

export function $(selector, multiple = false) {
    const hasCached = DOM_NODES.has(selector);
    if (!hasCached) {
        const el = multiple ? qsa(selector) : qs(selector);
        DOM_NODES.set(selector, el);
    }
    return DOM_NODES.get(selector);
}

export const $$ = (selector) => $(selector, true);

export const showEl = (el) => el.classList.add("active");
export const hideEl = (el) => el.classList.remove("active");
