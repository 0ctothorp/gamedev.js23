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
