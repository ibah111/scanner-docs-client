import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-premium';
import {
  SectionFiveEventDialog,
  SectionFiveEvents,
} from './RequisitesTableDialog';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Tooltip } from '@mui/material';
import { BankRequisitesClass } from '../../../../../../../../apiSend/BankRequisites/BankRequisitesInput';

interface requisitsColumnsProps {
  DialogTarget: EventTarget;
}

export default function RequisitsColumns({
  DialogTarget,
}: requisitsColumnsProps): GridColDef<BankRequisitesClass>[] {
  const columns: GridColDef<BankRequisitesClass>[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Название',
    },
    {
      field: 'recipient',
      headerName: 'Получатель',
    },
    {
      field: 'br_name',
      headerName: 'Банк получателя',
    },
    {
      field: 'inn',
      headerName: 'ИНН',
    },
    {
      field: 'kpp',
      headerName: 'КПП',
    },
    {
      field: 'r_account',
      headerName: 'Рассчётный счёт',
    },
    {
      field: 'k_account',
      headerName: 'Корр.счёт',
    },
    {
      field: 'bik',
      headerName: 'БИК',
    },
    {
      field: 'pay_purpose',
      headerName: 'Назначение платежа / ОГРНИП',
    },
    {
      field: 'typ',
      headerName: 'Тип реквизита',
    },
    {
      headerName: 'Действия',
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <>
          <>
            <GridActionsCellItem
              icon={<AddIcon />}
              label="Open"
              onClick={() => {
                const rowValue = params.row.id;
                DialogTarget.dispatchEvent(
                  new SectionFiveEventDialog(
                    SectionFiveEvents.openRequisitesAddPortfoliosToRequisitesDialog,
                    rowValue,
                  ),
                );
              }}
            />
          </>
        </>,
        <>
          <Tooltip title={'Редактировать реквизит'}>
            <GridActionsCellItem
              onClick={() => {
                const rowValue = params.row.id;
                DialogTarget.dispatchEvent(
                  new SectionFiveEventDialog(
                    SectionFiveEvents.openRequisitesEditDialog,
                    rowValue,
                  ),
                );
              }}
              icon={<ModeEditIcon />}
              label={'Edit'}
            />
          </Tooltip>
        </>,
      ],
    },
  ];
  return columns.map((items) => ({
    ...items,
    headerAlign: 'center',
    align: 'center',
  }));
}
