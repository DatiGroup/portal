import { RHFRating } from './rhf-rating';
import { RHFSlider } from './rhf-slider';
import { RHFTextField } from './rhf-text-field';
import { RHFRadioGroup } from './rhf-radio-group';
import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFSwitch, RHFMultiSwitch } from './rhf-switch';
import { RHFCheckbox, RHFMultiCheckbox } from './rhf-checkbox';
import { RHFDatePicker, RHFMobileDateTimePicker, RHFTimePicker } from './rhf-date-picker';
import { RHFPassword } from './rhf-password';
import { RHFEmailInput } from './rhf-email-input';
import { RHFSelect } from './rhf-select';
import { RHFCode } from './rhf-code';
// ----------------------------------------------------------------------

export const Field = {
  Switch: RHFSwitch,
  Slider: RHFSlider,
  Rating: RHFRating,
  Text: RHFTextField,
  Email: RHFEmailInput,
  Checkbox: RHFCheckbox,
  RadioGroup: RHFRadioGroup,
  DatePicker: RHFDatePicker,
  TimePicker: RHFTimePicker,
  MultiSwitch: RHFMultiSwitch,
  Autocomplete: RHFAutocomplete,
  MultiCheckbox: RHFMultiCheckbox,
  MobileDateTimePicker: RHFMobileDateTimePicker,
  Password: RHFPassword,
  Select: RHFSelect,
  Code: RHFCode
};
