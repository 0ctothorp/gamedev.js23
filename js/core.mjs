import { instantiateTemplate } from "./utils.mjs";

export function instantiateClock(
    hour = Math.floor(Math.random() * 12),
    minutes = Math.floor(Math.random() * 60),
    { seconds, className } = {}
) {
    const instance = instantiateTemplate("#t-clock");
    const clock = instance.children[0];
    clock.style.setProperty("--hour", hour);
    clock.style.setProperty("--minutes", minutes);
    if (seconds != undefined) {
        clock.style.setProperty("--seconds", seconds);
    }
    if (className) {
        clock.className += " " + className;
    }
    clock.style.setProperty("animation-delay", Math.random() + "s");
    return clock;
}
