import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ApprovalType } from 'store/slices/platformUsers/platformUserTypes';
import useCustomBreakpoints from 'hooks/useCustomBreakpoints';
import { columnsMobile } from './columnsMobile';
import { columnsDesktop } from './columnsDesktop';

interface Props {
  data: ApprovalType[];
}
const ApprovalTable = ({ data }: Props) => {
  const { t } = useTranslation();
  const { isMobile } = useCustomBreakpoints();

  const columns = useMemo(() => (isMobile ? columnsMobile({ t }) : columnsDesktop({ t })), [isMobile, t]);

  return (
    <FilteringTable
      {...{
        data: data || [],
        columns
      }}
    />
  );
};

export default ApprovalTable;
