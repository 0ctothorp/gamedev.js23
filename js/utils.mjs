export function randomInt(to) {
    return Math.floor(Math.random() * to);
}

export function instantiateTemplate(id) {
    const template = document.querySelector(id);
    return template.content.cloneNode(true);
}

export const qs = document.querySelector.bind(document);

export const playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
};

/** Map<queryString, DOMNode> */
const DOM_NODES = new Map();

export function getEl(selector) {
    const hasCached = DOM_NODES.has(selector);
    if (!hasCached) {
        const el = qs(selector);
        DOM_NODES.set(selector, el);
    }
    return DOM_NODES.get(selector);
}
