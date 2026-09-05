export type MapAccent = `#${string}`;

export const MAP_COLORS = {
  bazaar: '#f3a51c',
  exhibition: '#db5492',
  gym: '#87cefa',
  information: '#0a1b6f',
  inactiveBubble: '#aab3c5',
  inactiveMarker: '#98a3b8',
  primaryText: '#0a1b6f',
  secondaryText: '#222b43',
  restArea: '#32cd32',
} as const satisfies Record<string, MapAccent>;
