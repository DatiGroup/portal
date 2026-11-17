import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

interface LayoutToggleProps<T> {
  value: T;
  onChange: (value: T) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const LayoutToggle = <T,>({ value, onChange, size = 'small', disabled = false }: LayoutToggleProps<T>) => (
  <ToggleButtonGroup
    value={value}
    exclusive
    onChange={(_, v) => {
      if (v) onChange(v);
    }}
    size={size}
    disabled={disabled}
  >
    <ToggleButton value="grid">
      <Tooltip title="Grid">
        <GridViewIcon fontSize="small" />
      </Tooltip>
    </ToggleButton>
    <ToggleButton value="list">
      <Tooltip title="List">
        <ViewListIcon fontSize="small" />
      </Tooltip>
    </ToggleButton>
    <ToggleButton value="flex">
      <Tooltip title="Flex">
        <ViewModuleIcon fontSize="small" />
      </Tooltip>
    </ToggleButton>
  </ToggleButtonGroup>
);

export default LayoutToggle;
