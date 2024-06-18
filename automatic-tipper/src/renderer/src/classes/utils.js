import Trimf from "./Trimf";
import Trapmf from "./Trapmf";

export const Point = (x, y) => ({x, y});
export const getSlope = (p1, p2) => (p2.y - p1.y) / (p2.x - p1.x);
export const getIntercept = (p1, p2) => p1.y - (getSlope(p1, p2) * p1.x);

// service
export const poor_mf = new Trapmf(Point(0,0), Point(0, 1), Point(1, 1), Point(2, 0))
export const good_mf = new Trimf(Point(1, 0), Point(2.5, 1), Point(4, 0))
export const excellent_mf = new Trapmf(Point(3, 0), Point(4,1), Point(5,1), Point(5,0))
export const serviceLabels = ["Poor", "Good", "Excellent"];

// food quality
export const rancid_mf = new Trapmf(Point(0,0), Point(0, 1), Point(1, 1), Point(2, 0))
export const mediocre_mf = new Trimf(Point(1, 0), Point(2.5, 1), Point(4, 0))
export const delicious_mf = new Trapmf(Point(3, 0), Point(4,1), Point(5,1), Point(5,0))
export const foodQualityLabels = ["Rancid", "Mediocre", "Delicious"];

// rules
export const applyRules = (food_rating, service_rating) => {
  const r1 = Math.max(rancid_mf.calculate(food_rating), poor_mf.calculate(service_rating));
  const r2 = good_mf.calculate(service_rating);
  const r3 = Math.max(delicious_mf.calculate(food_rating), excellent_mf.calculate(service_rating));
  return [parseFloat(r1).toFixed(2), parseFloat(r2).toFixed(2), parseFloat(r3).toFixed(2)];
}

export const z = [0.05, 0.15, 0.2]

export const calculateWeightedAverage = (data) => {
  let WA = 0;
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    WA += (parseFloat(data[i]) * parseFloat(z[i]));
    sum += parseFloat(data[i]);
  };
  WA = WA / sum;
  return WA.toFixed(2);
}