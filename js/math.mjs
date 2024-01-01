export const randomInt = (to) => Math.floor(Math.random() * to);

export const vDotProd = (a, b) => a.x * b.x + a.y * b.y;

export const vlength = (v) => Math.sqrt(v.x * v.x + v.y * v.y);

export const vAngleBetween = (a, b) => Math.acos(vDotProd(a, b) / (vlength(a) * vlength(b)));

export const normalize = (v) => {
    const len = vlength(v);
    return { x: v.x / len, y: v.y / len };
};

export const rad2Deg = (x) => (x * 180) / Math.PI;
