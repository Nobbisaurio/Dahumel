export const calcularIntegralDuhamel = (
  masa: number,
  rigidez: number,
  amortiguamiento: number,
  frecuencia: number,
  paso: number,
  fuerza: number[]
) => {
  const n = fuerza.length;
  const wa = frecuencia * Math.sqrt(1 - amortiguamiento ** 2);
  const c: number[] = [];
  const s: number[] = [];
  const desplazamientos: number[] = [];

  for (let i = 0; i < n; i++) {
    const fi = fuerza[i] * Math.cos(wa * i * paso);
    const gi = fuerza[i] * Math.sin(wa * i * paso);

    const pc = i === 0 ? fi : c[i - 1] * Math.exp(-amortiguamiento * frecuencia * paso) + fi;
    const ps = i === 0 ? gi : s[i - 1] * Math.exp(-amortiguamiento * frecuencia * paso) + gi;

    c.push(pc);
    s.push(ps);

    const d = pc * Math.sin(wa * i * paso) - ps * Math.cos(wa * i * paso);
    desplazamientos.push(d);
  }

  return desplazamientos;
};
