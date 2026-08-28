export const MAP_CONFIG = {
  style:
    process.env.NEXT_PUBLIC_MAP_STYLE ||
    "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json",
  center: [139.6917, 35.6895] as [number, number],
  zoom: 11,
  attribution:
    '© <a href="https://stadiamaps.com/">Stadia Maps</a> © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
};
