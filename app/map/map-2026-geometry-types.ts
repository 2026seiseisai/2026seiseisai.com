export enum Color {
    red = 0xff6347,
    blue = 0x6495ed,
    yellow = 0xf0e68c,
    green = 0x32cd32,
    ylgreen = 0x98fb98,
    gray = 0x999999,
    ltblue = 0xc71585,
    magenta = 0x87cefa,
    white = 0xeeeeee,
    brown = 0xc0ae9a,
}

export type Rect = Readonly<{
    y: number;
    x1: number;
    z1: number;
    x2: number;
    z2: number;
    color?: Color;
    room?: readonly [floorId: string, roomName: string];
}>;

export type Polygon = Readonly<{
    points: readonly (readonly [x: number, y: number, z: number])[];
    color?: Color;
}>;

//begin-endを対角線とする直方体
export type Box = Readonly<{
    begin: readonly [x: number, y: number, z: number];
    end: readonly [x: number, y: number, z: number];
    color?: Color;
}>;
