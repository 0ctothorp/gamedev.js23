import { instantiateTemplate, $, getCssProperty, setCssProperty, getElementCenter } from "./utils.mjs";
import { Vec2 } from "./math.mjs";

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

/**
 * Needs to be called after the element is embedded into the page.
 */
export function makeClockHaveAdjustablePointers(clock) {
    const hoursPointer = $(".pointer.hours", clock);

    hoursPointer.addEventListener("mousedown", () => {
        clock.dataset.setting = "hours";
    });

    document.addEventListener("mouseup", () => {
        delete clock.dataset.setting;
    });

    const getHours = getCssProperty("hour");
    const setHours = setCssProperty("hour");

    // TODO: should recalculate after window resize
    const center = getElementCenter(clock);
    $("#rect").style.top = center.y + "px";
    $("#rect").style.left = center.x + "px";

    window.addEventListener("mousemove", (event) => {
        if (!clock.dataset.setting) return;

        const C = center;
        const M = event;
        const UP = new Vec2(center.x, center.y - 10);
        const vCM = Vec2.fromPoints(C, M);
        const vCU = Vec2.fromPoints(C, UP);
        const angle = Vec2.angleBetween(vCM, vCU);

        const currentHours = getHours(clock);
        const currentAngle = currentHours * DEGREES_IN_HOUR;

        if (currentAngle === 0 && angle > 11 * DEGREES_IN_HOUR) {
            setHours(clock, 12);
        } else {
            const h = angle > currentAngle ? Math.floor(angle / DEGREES_IN_HOUR) : Math.ceil(angle / DEGREES_IN_HOUR);
            setHours(clock, h);
        }
    });
}
