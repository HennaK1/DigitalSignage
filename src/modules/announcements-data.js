import announcementsFi from '../assets/json/announcement_fi.json';
import announcementsEn from '../assets/json/announcement_en.json';

const infoText = document.querySelector('.info-text');
const infoTopic = document.querySelector('.info-topic');
const infoDate = document.querySelector('.info-date');

/**
 * Function for showing announcments
 * @param {boolean} fi defining lang as a parameter
 */
 const showInfo = (fi) => {
  if (fi === true) {
    infoTopic.textContent = announcementData.announcementsFi.Announcements[0].Name;
    infoText.textContent = announcementData.announcementsFi.Announcements[0].Information;
    infoDate.textContent = announcementData.announcementsFi.Announcements[0].Date;
  } else {
    infoTopic.textContent = announcementData.announcementsEn.Announcements[0].Name;
    infoText.textContent = announcementData.announcementsEn.Announcements[0].Information;
    infoDate.textContent = announcementData.announcementsEn.Announcements[0].Date;
  }

};

const announcementData = { announcementsFi, announcementsEn, showInfo };
export default announcementData;
