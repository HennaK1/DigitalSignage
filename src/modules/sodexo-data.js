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
  const prices = [];
  const courses = Object.values(menu);
  for (const course of courses) {
    const diet = course.dietcodes;
    const price = course.price;
    if (course.dietcodes === undefined) {
      coursesEn.push(course.title_en);
      coursesFi.push(course.title_fi);
    } else {
      coursesEn.push(course.title_en + ' (' + diet + ')');
      coursesFi.push(course.title_fi + ' (' + diet + ')');
    }

    prices.push(price);
  }
  return [coursesFi, coursesEn, prices];
};

const SodexoData = { parseSodexoMenu, sodexoMyyrmakiDataUrl, sodexoMyllypuroDataUrl };
export default SodexoData;

