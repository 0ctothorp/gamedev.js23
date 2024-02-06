const DIFFICULTY_CONFIGS = {
    NORMAL: {
        name: "normal",
        punishOnMistake: false,
        vertWobbleStartAt: 2,
    },
    HARD: {
        name: "hard",
        punishOnMistake: true,
        vertWobbleStartAt: 6,
    },
    INSANE: {
        name: "insane",
        punishOnMistake: true,
        vertWobbleStartAt: 6,
    },
    IMPOSSIBLE: {
        name: "impossible",
        punishOnMistake: true,
        vertWobbleStartAt: 6,
    },
};

const LS_KEYS = {
    HS_NORMAL: "__time_flies__highscore_normal",
    HS_HARD: "__time_flies__highscore_hard",
};

const DEGREES_IN_HOUR = 30;
const DEGREES_IN_MINUTES = 6;
