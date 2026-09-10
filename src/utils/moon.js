import { MoonPhase, Illumination, SearchMoonPhase } from 'astronomy-engine';

// Geocentric ephemeris; the illustration uses south-up orientation.
export function calculateLunarData(date) {
  const instant = new Date(date);
  const phase = MoonPhase(instant) / 360;
  const illumination = Illumination('Moon', instant).phase_fraction;
  const lastNewMoon = SearchMoonPhase(0, instant, -32);
  const names = ['Lua Nova', 'Lua Crescente', 'Quarto Crescente',
    'Lua Gibosa Crescente', 'Lua Cheia', 'Lua Gibosa Minguante',
    'Quarto Minguante', 'Lua Minguante'];
  const tolerance = 1 / 360;
  const index = phase < tolerance || phase >= 1 - tolerance ? 0
    : phase < 0.25 - tolerance ? 1 : phase < 0.25 + tolerance ? 2
      : phase < 0.5 - tolerance ? 3 : phase < 0.5 + tolerance ? 4
        : phase < 0.75 - tolerance ? 5 : phase < 0.75 + tolerance ? 6 : 7;
  // A semicircle plus an elliptical terminator gives the illuminated fraction.
  const radius = Math.abs(1 - 2 * illumination) * 50;
  const terminatorSweep = illumination < 0.5 ? 0 : 1;
  return {
    phaseName: names[index],
    illuminationPercent: (illumination * 100).toFixed(1),
    ageDays: ((instant - lastNewMoon.date) / 86400000).toFixed(1),
    waxing: phase < 0.5,
    lightPath: `M 50 0 A 50 50 0 0 1 50 100 A ${Math.max(radius, 0.0001)} 50 0 0 ${terminatorSweep} 50 0 Z`,
    glowColor: `rgba(190, 210, 240, ${0.12 + illumination * 0.5})`,
  };
}
