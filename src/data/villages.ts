/**
 * Localities covered by the Kunjwal City flyer distribution.
 *
 * Sourced from the sales team's "Kunjwal City Targeted Area" sheet (76 villages,
 * ~40,700 houses). Each entry carries the Urdu name so the draw form reads
 * naturally for walk-in villagers and the English name so the exported sheet
 * stays sortable for the sales desk.
 *
 * `aliases` exist purely for search: common misspellings and alternate
 * transliterations people actually type on a phone keypad.
 */

export type Locality = {
  /** English name — this is what gets stored and exported. */
  en: string;
  /** Urdu name — this is what gets displayed first. */
  ur: string;
  /** Extra search terms; never displayed. */
  aliases?: string[];
};

export const LOCALITIES: Locality[] = [
  { en: "Mangowal Garbi", ur: "منگووال غربی", aliases: ["mangowal gharbi", "mangwal"] },
  { en: "Mangowal Purana", ur: "منگووال پرانا", aliases: ["mangwal purana", "old mangowal"] },
  { en: "Kot Fateh Deen", ur: "کوٹ فتح دین", aliases: ["kot fatehdin"] },
  { en: "Kot Gaddah", ur: "کوٹ گدہ", aliases: ["kot gada"] },
  { en: "Rajay Ki", ur: "راجے کی", aliases: ["raje ki", "rajeki"] },
  { en: "Kang Sahali", ur: "کنگ سہالی", aliases: ["kang suhali"] },
  { en: "Kang Chanan", ur: "کنگ چنن", aliases: ["kang chanaan"] },
  { en: "Puli Rasiki", ur: "پلی رسیکی", aliases: ["pulli rasiki"] },
  { en: "Haigar Wala", ur: "ہیگر والا", aliases: ["haigarwala", "hegar wala"] },
  { en: "Pahrianwali", ur: "پہاڑیاں والی", aliases: ["paharianwali", "pahrian wali"] },
  { en: "Khaiya", ur: "کھیا", aliases: ["khaya"] },
  { en: "Ghagoki", ur: "گھگوکی", aliases: ["ghagoke"] },
  { en: "Khan Wali", ur: "خان والی", aliases: ["khanwali"] },
  { en: "Ghakra Khurd", ur: "گھکڑہ خورد", aliases: ["ghakhra khurd"] },
  { en: "Ghakra Kalan", ur: "گھکڑہ کلاں", aliases: ["ghakhra kalan", "ghakra kalah"] },
  { en: "Nawa Lok", ur: "نوا لوک", aliases: ["nawalok"] },
  { en: "Chak Wasan", ur: "چک وسان", aliases: ["chakwasan"] },
  { en: "Cheema", ur: "چیمہ", aliases: ["chima"] },
  { en: "Khoja", ur: "خوجہ", aliases: ["khoja sharif"] },
  { en: "Soliwe", ur: "سولیوے", aliases: ["soliwal", "solive"] },
  { en: "Larkha Wali", ur: "لڑکھا والی", aliases: ["larkhawali"] },
  { en: "Tapyala", ur: "ٹپیالہ", aliases: ["tapiala"] },
  { en: "Bhagriyan", ur: "بھگڑیاں", aliases: ["bhagrian"] },
  { en: "Chak Hussain", ur: "چک حسین", aliases: ["chak hussain"] },
  { en: "Kalo Sahi", ur: "کالو ساہی", aliases: ["kalosahi"] },
  { en: "Jambola", ur: "جمبولہ", aliases: ["jamboola"] },
  { en: "Khreeran Wala", ur: "کھریڑاں والا", aliases: ["khreran wala", "khiraran wala"] },
  { en: "Jhangeer Pur", ur: "جہانگیر پور", aliases: ["jahangir pur", "jahangirpur"] },
  { en: "Gumrali", ur: "گمرالی", aliases: ["gumrala"] },
  { en: "Kot Matta", ur: "کوٹ متہ", aliases: ["kot mata"] },
  { en: "Shah Jahaniyan", ur: "شاہ جہانیاں", aliases: ["shahjahanian"] },
  { en: "Darya", ur: "دریا", aliases: [] },
  { en: "Kasana", ur: "کسانہ", aliases: ["kassana"] },
  { en: "Kunjari", ur: "کنجری", aliases: ["kunjri"] },
  { en: "Khunnan Garbi", ur: "کھنن غربی", aliases: ["khunan gharbi"] },
  { en: "Chokri Bakhu", ur: "چوکری بخو", aliases: ["chokri bakho"] },
  { en: "Kunjah", ur: "کنجاہ", aliases: ["kunja", "kunjah city"] },
  { en: "Chak Baegha", ur: "چک بیگہ", aliases: ["chak begha"] },
  { en: "Maajra", ur: "ماجرہ", aliases: ["majra"] },
  { en: "Jheera Wali", ur: "جھیرا والی", aliases: ["jhera wali"] },
  { en: "Jhasoki", ur: "جسوکی", aliases: ["jasoki"] },
  { en: "Dharo Wal", ur: "دھڑووال", aliases: ["dharowal"] },
  { en: "Chak Dhilo", ur: "چک ڈھلو", aliases: ["chak dhillo"] },
  { en: "Golay Ki", ur: "گولے کی", aliases: ["gole ki", "goleki"] },
  { en: "Ichra", ur: "اچھرہ", aliases: ["ichhra"] },
  { en: "Dhoop Sarri", ur: "دھوپ سڑی", aliases: ["dhoop sari"] },
  { en: "Shah Raddo", ur: "شاہ رڈو", aliases: ["shah rado"] },
  { en: "Chah Mugala", ur: "چاہ مغلاں", aliases: ["chah mughlan"] },
  { en: "Kot Alla Baksh", ur: "کوٹ اللہ بخش", aliases: ["kot allah bakhsh"] },
  { en: "Taroor Ki", ur: "تروڑ کی", aliases: ["taroorki"] },
  { en: "Chakori", ur: "چکوری", aliases: ["chakauri"] },
  { en: "Chokra", ur: "چوکرہ", aliases: ["chokrah"] },
  { en: "Khojaya Ali", ur: "خوجیا علی", aliases: ["khojia ali"] },
  { en: "Langay", ur: "لنگے", aliases: ["lange"] },
  { en: "Chak Gill", ur: "چک گل", aliases: ["chak gil"] },
  { en: "Nawa Lok 2", ur: "نوا لوک ۲", aliases: ["nawalok 2"] },
  { en: "Sadulla Pur", ur: "سعد اللہ پور", aliases: ["saadullah pur", "sadullapur"] },
  { en: "Long", ur: "لونگ", aliases: [] },
  { en: "Charkay", ur: "چڑکے", aliases: ["charke"] },
  { en: "Malhiyan", ur: "ملہیاں", aliases: ["malhian"] },
  { en: "Khosar", ur: "کھوسر", aliases: ["khoser"] },
  { en: "Chukaliyan", ur: "چکالیاں", aliases: ["chakalian", "chukalian"] },
  { en: "Meetha Chak", ur: "میٹھا چک", aliases: ["mitha chak"] },
  { en: "Pinddi Dhotla", ur: "پنڈی ڈھوٹلہ", aliases: ["pindi dhotla"] },
  { en: "Narang", ur: "نارنگ", aliases: [] },
  { en: "Ratti Pindi", ur: "رتی پنڈی", aliases: ["rati pindi"] },
  { en: "Dhudra", ur: "ڈھدرا", aliases: ["dhoodra"] },
  { en: "Ghaddu Kalan", ur: "گھدو کلاں", aliases: ["ghadu kalan"] },
  { en: "Dumniya Wali", ur: "ڈمنیاں والی", aliases: ["dumnian wali"] },
  { en: "Sadiqabad", ur: "صادق آباد", aliases: ["sadiq abad"] },
  { en: "Chakriyan", ur: "چکڑیاں", aliases: ["chakrian"] },
  { en: "Ropoki", ur: "روپوکی", aliases: ["rupoki"] },
  { en: "Tibbi", ur: "ٹبی", aliases: ["tibi"] },
  { en: "Dhilo Garbi", ur: "ڈھلو غربی", aliases: ["dhillo gharbi"] },
  { en: "Lokhri Malah", ur: "لوکھڑی ملاح", aliases: ["lokhri malha"] },

  // Nearby towns — not on the flyer route, but people from them scan the QR too.
  { en: "Gujrat City", ur: "گجرات شہر", aliases: ["gujrat"] },
  { en: "Jalalpur Jattan", ur: "جلالپور جٹاں", aliases: ["jalalpur"] },
  { en: "Kharian", ur: "کھاریاں", aliases: [] },
  { en: "Lalamusa", ur: "لالہ موسیٰ", aliases: ["lala musa"] },
  { en: "Dinga", ur: "ڈنگہ", aliases: [] },
  { en: "Sarai Alamgir", ur: "سرائے عالمگیر", aliases: ["saray alamgir"] },
];

/** Normalised haystack for a locality, used by the search filter. */
export function localityHaystack(l: Locality): string {
  return [l.en, l.ur, ...(l.aliases ?? [])].join(" ").toLowerCase();
}
