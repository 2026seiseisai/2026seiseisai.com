import { Color, type Box } from './map-2026-geometry-types';

//中学棟職員室側
const juniorBoxes: readonly Box[] = [
    {
        //昇降口
        begin: [125, 0, 75],
        end: [175, 300, 125],
        color: Color.gray,
    },
    {
        //CD間1
        begin: [25, 0, -125],
        end: [75, 50, -75],
        color: Color.gray,
    },
    {
        //CD間2
        begin: [25, 50, -125],
        end: [75, 100, -75],
        color: Color.yellow,
    },
    {
        //CD間3
        begin: [25, 100, -125],
        end: [75, 200, -75],
        color: Color.gray,
    },
    {
        //CD間4
        begin: [25, 200, -125],
        end: [75, 250, -75],
        color: Color.yellow,
    },
    {
        //CD間5
        begin: [25, 250, -125],
        end: [75, 300, -75],
        color: Color.gray,
    },
];

const seniorBoxes: readonly Box[] = [
    {
        //昇降口
        begin: [-300, 150, 25],
        end: [-250, 450, 75],
        color: Color.gray,
    },
    {
        //CD間1
        begin: [-300, 150, -225],
        end: [-250, 200, -175],
        color: Color.gray,
    },
    {
        //CD間2
        begin: [-300, 200, -225],
        end: [-250, 250, -175],
        color: Color.yellow,
    },
    {
        //CD間3
        begin: [-300, 250, -225],
        end: [-250, 350, -175],
        color: Color.gray,
    },
    {
        //CD間4
        begin: [-300, 350, -225],
        end: [-250, 400, -175],
        color: Color.yellow,
    },
    {
        //CD間5
        begin: [-300, 400, -225],
        end: [-250, 450, -175],
        color: Color.gray,
    },
    {
        //体育館
        begin: [-250, 0, -425],
        end: [-290, 300, -375],
        color: Color.gray,
    },
];

const libraryBoxes: readonly Box[] = [
    {
        begin: [-175, 200, 300],
        end: [-225, 350, 275],
        color: Color.gray,
    },
];

export const boxes: readonly Box[] = [...juniorBoxes, ...seniorBoxes, ...libraryBoxes];

