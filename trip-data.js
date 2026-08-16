import { REGIONS_1 } from './regions-1.js?v=16';
import { REGIONS_2 } from './regions-2.js?v=16';
import { REGIONS_3 } from './regions-3.js?v=16';
import { REGIONS_4 } from './regions-4.js?v=16';

export const REGIONS = [...REGIONS_1, ...REGIONS_2, ...REGIONS_3, ...REGIONS_4];

// 分野の一覧は、実データに出てくるものから自動的に組み立てる
const FIELD_LABELS = {
  history: '歴史',
  geology: '地質学',
  nature: '自然・生き物',
  food: '食文化・酒・水',
  climate: '気象・気候',
  deepsea: '深海学',
  evolution: '進化論',
  anthropology: '文化人類学',
  religion: '宗教学',
  science: '科学・物理',
  industry: '産業・技術',
  architecture: '建築',
};

const FIELD_SEQUENCE = [
  'history', 'geology', 'nature', 'food', 'climate', 'deepsea',
  'evolution', 'anthropology', 'religion', 'science', 'industry', 'architecture',
];

export const FIELD_ORDER = FIELD_SEQUENCE.filter((id) =>
  REGIONS.some((r) => r.fields.some((f) => f.id === id))
).map((id) => ({ id, label: FIELD_LABELS[id] }));

// 緯度経度から直線距離(km)を求め、ざっくりした移動時間(時間)に換算する
function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function travelHoursBetween(a, b) {
  if (!a || !b || a.id === b.id) return 0;
  const km = distanceKm(a, b);
  // 近距離は在来線・車、長距離は新幹線や飛行機を想定したざっくり換算
  const hours = km < 150 ? km / 60 : km < 600 ? km / 130 : 1.5 + km / 700;
  return Math.round(hours * 2) / 2;
}
