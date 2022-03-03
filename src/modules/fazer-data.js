import { todayISODate } from "./tools";

const fazerLunchMenuKaramalmiFiUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=${todayISODate}`;
const fazerLunchMenuKaramalmiEnUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=${todayISODate}`;
const fazerLunchMenuArabiaFiUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=321259&weekDate=${todayISODate}`;
const fazerLunchMenuArabiaEnUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=321259&weekDate=${todayISODate}`;

/**
 * Parsing Fazer menu JSON object
 *
 * @param {string} menu - JSON Menu to be parsed
 */
const parseFazerMenu = (menu, dayOfWeek) => {
  const course = [];
  const prices = [];
  const setMenus = menu[dayOfWeek].SetMenus;
  for (const setMenu of setMenus) {
    const meals = setMenu.Meals;
    const price = setMenu.Price;
    for (const meal of meals) {
      const name = meal.Name;
      const diet = meal.Diets;
      course.push(name + ' (' + diet.toString().replaceAll(',', ', ') + ')');
      prices.push(price);
    }
  }
  return [course, prices];
};


const FazerData = { parseFazerMenu, fazerLunchMenuKaramalmiFiUrl, fazerLunchMenuKaramalmiEnUrl, fazerLunchMenuArabiaFiUrl, fazerLunchMenuArabiaEnUrl };
export default FazerData;
