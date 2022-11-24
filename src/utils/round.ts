export default function round(value: number, precision: number) {
  return Math.floor(value * 10 ** precision) / 10 ** precision;
}
