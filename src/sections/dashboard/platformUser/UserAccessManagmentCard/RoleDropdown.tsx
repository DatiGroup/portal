import { Autocomplete, Chip, TextField } from '@mui/material';
import { RoleGroupEnum } from 'store/type/RoleGroupEnum';

interface Props {
  value: string[];
  onChange?: (value: string[]) => void;
}
const RoleDropdown = ({ value, onChange }: Props) => {
  const data: string[] = Object.values(RoleGroupEnum) || [];

  const handleChange = (event: any, newValue: string[]) => {
    onChange?.(newValue);
  };

  return (
    <Autocomplete
      multiple
      options={data}
      value={value}
      disableClearable={true}
      onChange={handleChange}
      renderOption={({ key, ...props }, option) => (
        <li key={key} {...props}>
          {option}
        </li>
      )}
      renderValue={(values, getItemProps) => {
        return values.map((option, index) => <Chip {...getItemProps({ index })} key={index} label={option} />);
      }}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} />}
      sx={{
        '& .MuiOutlinedInput-root': {
          p: 1
        },
        '& .MuiAutocomplete-tag': {
          bgcolor: 'primary.lighter',
          border: '1px solid',
          borderColor: 'primary.light',
          '& .MuiSvgIcon-root': {
            color: 'primary.main',
            '&:hover': {
              color: 'primary.dark'
            }
          }
        }
      }}
    />
  );
};

export default RoleDropdown;
