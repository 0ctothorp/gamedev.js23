import { instantiateTemplate, $, getCssProperty, setCssProperty, getElementCenter, debounce } from "./utils.mjs";
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
    const minutesPointer = $(".pointer.minutes", clock);

    hoursPointer.addEventListener("mousedown", () => {
        clock.dataset.setting = "hours";
    });
    minutesPointer.addEventListener("mousedown", () => {
        clock.dataset.setting = "minutes";
    });

    const prevDefault = (e) => {
        e.preventDefault();
    };
    // Prevent unwanted behavior triggered by dragstart event.
    hoursPointer.ondragstart = minutesPointer.ondragstart = prevDefault;

    document.addEventListener("mouseup", () => {
        delete clock.dataset.setting;
    });

    const getHours = getCssProperty("hour");
    const setHours = setCssProperty("hour");
    const getMinutes = getCssProperty("minutes");
    const setMinutes = setCssProperty("minutes");

    window.addEventListener("mousemove", (event) => {
        if (!clock.dataset.setting) return;

        const C = getElementCenter(clock);
        const M = event;
        const UP = new Vec2(C.x, C.y - 10);
        const vCM = Vec2.fromPoints(C, M);
        const vCU = Vec2.fromPoints(C, UP);
        const angle = Vec2.angleBetween(vCM, vCU);

        if (clock.dataset.setting === "hours") {
            const currentHours = getHours(clock);
            const currentAngle = currentHours * DEGREES_IN_HOUR;

            if (currentAngle === 0 && angle > 11 * DEGREES_IN_HOUR) {
                setHours(clock, 12);
            } else {
                const h =
                    angle > currentAngle ? Math.floor(angle / DEGREES_IN_HOUR) : Math.ceil(angle / DEGREES_IN_HOUR);
                setHours(clock, h);
            }
        } else {
            // I will most likely only want to set minutesMoveBy to 5, or 1. And in case of 5, the calculations are exactly the
            // the same as in case of setting hours, but well... I made it flexible, so you can set any step with which the
            // minutes pointer will move by.
            const moveByMinutes = Number(clock.dataset.minutesMoveBy) || "1";
            const moveByDegrees = moveByMinutes * DEGREES_IN_MINUTES;
            const currentAngle = getMinutes(clock) * DEGREES_IN_MINUTES;

            if (currentAngle === 0 && angle > (60 - moveByMinutes) * DEGREES_IN_MINUTES) {
                setMinutes(clock, 0);
            } else {
                const m = angle > currentAngle ? Math.floor(angle / moveByDegrees) : Math.ceil(angle / moveByDegrees);
                setMinutes(clock, m * moveByMinutes);
            }
        }
    });
}
