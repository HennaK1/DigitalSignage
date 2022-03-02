import { todayISODate } from "./tools";

const sodexoMyyrmakiDataUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${todayISODate}`;
const sodexoMyllypuroDataUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/158/${todayISODate}`;

/**
 * Extract course titles from Sodexo menu JSON object
 *
 * @param {string} menu - JSON Menu to be parsed
 */
const parseSodexoMenu = (menu) => {
  const coursesEn = [];
  const coursesFi = [];
  const courses = Object.values(menu);
  for (const course of courses) {
    const diet = course.dietcodes;
    const price = course.price;
    coursesEn.push(course.title_en + ' (' + diet + ')' + '\xa0\xa0' + price);
    coursesFi.push(course.title_fi + ' (' + diet + ')' + '\xa0\xa0' + price);
  }
  return [coursesFi, coursesEn];
};

const SodexoData = { parseSodexoMenu, sodexoMyyrmakiDataUrl, sodexoMyllypuroDataUrl };
export default SodexoData;
