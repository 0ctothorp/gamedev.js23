export const randomInt = (to) => Math.floor(Math.random() * to);

export const rad2Deg = (x) => (x * 180) / Math.PI;

export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromPoints(from, to) {
        return new Vec2(to.x - from.x, to.y - from.y);
    }

    static dotProduct(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    static sub(a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }

    static angleBetween(a, b) {
        const scalar = Vec2.dotProduct(a, b);
        const angle = rad2Deg(Math.acos(scalar / (a.len * b.len)));
        // angle is always <0, 180>, so I need to turn it into <0, 360> somehow.
        // I'm calculating direction of a vector pointing from a to b and returning
        // <180, 360> range in this case.
        const dir = Vec2.sub(a.normalized, b.normalized);
        if (dir.x < 0) return Math.abs(angle - 360);

        return angle;
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    get len() {
        return Math.hypot(this.x, this.y);
    }

    get normalized() {
        const len = this.len;
        return new Vec2(this.x / len, this.y / len);
    }
}
