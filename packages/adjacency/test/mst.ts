import { comparator2, distSq } from "@thi.ng/vectors";
import * as assert from "assert";
import { mst } from "../src";

describe("unionfind", () => {
    it("mst", () => {
        const verts = [
            [0, 0], // 0
            [0, 1], // 1
            [1, 1], // 2
            [1, 2], // 3
            [2, 1], // 4
            [3, 1], // 5
            [3, 3], // 6
            [5, 2], // 7
            [5, 3], // 8
        ];
        const edges = [
            [0, 1],
            [1, 2],
            [0, 4],
            [0, 5],
            [2, 3],
            [2, 4],
            [4, 5],
            [3, 7],
            [5, 7],
            [5, 6],
            [6, 7],
            [6, 8],
            [7, 8],
        ];

        assert.deepStrictEqual(
            mst(
                edges,
                10,
                ([a, b]) => distSq(verts[a], verts[b]),
                ([a, b]) => [a, b]
            ).sort(comparator2(0, 1)),
            [
                [0, 1],
                [1, 2],
                [2, 3],
                [2, 4],
                [4, 5],
                [5, 6],
                [6, 8],
                [7, 8],
            ]
        );
    });
});
