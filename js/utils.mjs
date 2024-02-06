export function instantiateTemplate(id) {
    const template = document.querySelector(id);
    return template.content.cloneNode(true);
}

export const playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
};

export const $ = (selector, parent) => {
    if (parent) return parent.querySelector(selector);
    return document.querySelector(selector);
};
export const $$ = document.querySelectorAll.bind(document);

export const showEl = (el) => el.classList.add("active");
export const hideEl = (el) => el.classList.remove("active");

export const getCssProperty = (name) => (instance) => instance.style.getPropertyValue(`--${name}`);
export const setCssProperty = (name) => (instance, value) => instance.style.setProperty(`--${name}`, value);

export const getElementCenter = (el) => {
    const { x, y, width, height } = el.getBoundingClientRect();
    return { x: x + width / 2, y: y + height / 2 };
};

export function debounce(fn, time) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), time);
    };
}
