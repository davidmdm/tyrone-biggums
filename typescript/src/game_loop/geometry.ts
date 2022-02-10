import { Moveable, Vector2D } from "./physics";

export interface Collidable<T> {
    geo: Geometry<T>
}

export interface Geometry<T> {
    readonly pos: Vector2D;
    hasCollision(other: T): boolean;
    setPosition(vec: Vector2D): Geometry<T>;
}

export class AABB implements Geometry<AABB>, Moveable {
    pos: Vector2D;
    constructor(x1: number, y1: number, private width: number, private height: number) {
        this.pos = [x1, y1];
    }

    hasCollision(other: AABB): boolean {
        const o_x1 = other.pos[0];
        const o_x2 = o_x1 + other.width;
        const this_x1 = this.pos[0];
        const this_x2 = this_x1 + this.width;

        if (o_x2 < this_x1 || o_x1 > this_x2) {
            return false;
        }

        const o_y1 = other.pos[1];
        const o_y2 = o_y1 + other.height;
        const this_y1 = this.pos[1];
        const this_y2 = this_y1 + this.height;

        if (o_y2 < this_y1 || o_y1 > this_y2) {
            return false;
        }

        return true;
    }

    setPosition(vec: Vector2D): Geometry<AABB> {
        this.pos[0] = vec[0];
        this.pos[1] = vec[1];
        return this;
    }

    applyDelta(vec: Vector2D): void {
        this.pos[0] += vec[0];
        this.pos[1] += vec[1];
    }

    static fromWidthHeight(width: number, height: number): AABB {
        return new AABB(0, 0, width, height);
    }
}

export type Collisions<T> = [Collidable<T>, Collidable<T>][];
export function checkForCollisions<T>(items: Collidable<T>[]): Collisions<T> {
    const out: Collisions<T> = [];

    // TODO: We could implement a space partitioning algorithm to reduce search
    // space.
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            // @ts-ignore
            // TODO: I don't know how to make this work without an ignore.
            if (items[i].geo.hasCollision(items[j].geo)) {
                out.push([items[i], items[j]]);
            }
        }
    }

    return out;
}

