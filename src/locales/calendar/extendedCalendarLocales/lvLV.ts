// Šis objekts nav Partial<PickersLocaleText>, jo tas ir noklusējuma vērtības

import type { PickersLocaleText } from '@mui/x-date-pickers/locales';

const getPickersLocalization = (pickersTranslations: Partial<PickersLocaleText>) => ({
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        localeText: { ...pickersTranslations }
      }
    }
  }
});

const lvLVPickers: Partial<PickersLocaleText> = {
  // Kalendāra navigācija
  previousMonth: 'Iepriekšējais mēnesis',
  nextMonth: 'Nākamais mēnesis',

  // Skata navigācija
  openPreviousView: 'Atvērt iepriekšējo skatu',
  openNextView: 'Atvērt nākamo skatu',
  calendarViewSwitchingButtonAriaLabel: (view) =>
    view === 'year' ? 'Atvērts gada skats, pārslēgties uz kalendāra skatu' : 'Atvērts kalendāra skats, pārslēgties uz gada skatu',

  // DateRange etiķetes
  start: 'Sākums',
  end: 'Beigas',
  startDate: 'Sākuma datums',
  startTime: 'Sākuma laiks',
  endDate: 'Beigu datums',
  endTime: 'Beigu laiks',

  // Darbību josla
  cancelButtonLabel: 'Atcelt',
  clearButtonLabel: 'Notīrīt',
  okButtonLabel: 'Labi',
  todayButtonLabel: 'Šodien',

  // Rīkjoslas nosaukumi
  datePickerToolbarTitle: 'Izvēlieties datumu',
  dateTimePickerToolbarTitle: 'Izvēlieties datumu un laiku',
  timePickerToolbarTitle: 'Izvēlieties laiku',
  dateRangePickerToolbarTitle: 'Izvēlieties datumu diapazonu',

  // Pulksteņa etiķetes
  /*  clockLabelText: (view, time, utils, formattedTime) =>
         `Izvēlieties ${view}. ${!formattedTime && (time === null || !utils.isValid(time))
             ? 'Nav izvēlēts laiks'
             : `Izvēlētais laiks ir ${formattedTime ?? utils.format(time, 'fullTime')}`
         }`, */
  hoursClockNumberText: (hours) => `${hours} stundas`,
  minutesClockNumberText: (minutes) => `${minutes} minūtes`,
  secondsClockNumberText: (seconds) => `${seconds} sekundes`,

  // Digitālā pulksteņa etiķetes
  selectViewText: (view) => `Izvēlieties ${view}`,

  // Kalendāra etiķetes
  calendarWeekNumberHeaderLabel: 'Nedēļas numurs',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: (weekNumber) => `Nedēļa ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,

  // Atvērt izvēlētāja etiķetes
  openDatePickerDialogue: (formattedDate: string | null) =>
    formattedDate ? `Izvēlieties datumu, izvēlētais datums ir ${formattedDate}` : 'Izvēlieties datumu',
  openTimePickerDialogue: (formattedTime: string | null) =>
    formattedTime ? `Izvēlieties laiku, izvēlētais laiks ir ${formattedTime}` : 'Izvēlieties laiku',

  fieldClearLabel: 'Notīrīt',

  // Tabulas etiķetes
  timeTableLabel: 'izvēlieties laiku',
  dateTableLabel: 'izvēlieties datumu',

  // Lauka sekciju aizvietotāji
  fieldYearPlaceholder: (params) => 'Y'.repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => (params.contentType === 'letter' ? 'MMMM' : 'MM'),
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: (params) => (params.contentType === 'letter' ? 'EEEE' : 'EE'),
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',

  // Skatu nosaukumi
  year: 'Gads',
  month: 'Mēnesis',
  day: 'Diena',
  weekDay: 'Nedēļas diena',
  hours: 'Stundas',
  minutes: 'Minūtes',
  seconds: 'Sekundes',
  meridiem: 'Meridiems',

  // Kopējs
  empty: 'Tukšs'
};

export const DEFAULT_LOCALE = lvLVPickers;

export const lvLV = getPickersLocalization(lvLVPickers);
