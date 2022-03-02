import { todayISODate } from "./tools";

const sodexoDataUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${todayISODate}`;

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
    coursesEn.push(course.title_en + ' (' + diet + ')' + ' ' + price);
    coursesFi.push(course.title_fi + ' (' + diet + ')' + ' ' + price);
  }
  return [coursesFi, coursesEn];
};

const SodexoData = { parseSodexoMenu, sodexoDataUrl };
export default SodexoData;
