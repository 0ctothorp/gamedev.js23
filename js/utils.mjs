export function randomInt(to) {
    return Math.floor(Math.random() * to);
}

export function instantiateTemplate(id) {
    const template = document.querySelector(id);
    return template.content.cloneNode(true);
}

export const playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
};

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const showEl = (el) => el.classList.add("active");
export const hideEl = (el) => el.classList.remove("active");
