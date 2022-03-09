import { todayISODate } from "./tools";

const sodexoMyyrmakiDataUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${todayISODate}`;
const sodexoMyllypuroDataUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/158/${todayISODate}`;

/**
 * Parsing Sodexo menu JSON object
 *
 * @param {string} menu - JSON Menu to be parsed
 */
const parseSodexoMenu = (menu) => {
  const coursesEn = [];
  const coursesFi = [];
  const prices = [];
  const diets = [];
  const courses = Object.values(menu);
  for (const course of courses) {
    const diet = course.dietcodes;
    const price = course.price;
    if (course.dietcodes === undefined) {
      diets.push('');
    } else {
      diets.push(' (' + diet + ')');
    }
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
    prices.push(price);
  }
  return [coursesFi, coursesEn, prices, diets];
};

const SodexoData = { parseSodexoMenu, sodexoMyyrmakiDataUrl, sodexoMyllypuroDataUrl };
export default SodexoData;

