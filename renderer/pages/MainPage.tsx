import {
    Button
  } from "@mui/material";
  import React from "react";
  import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
  import Link from "../components/Link";


  const rows: GridRowsProp = [
  ];

const columns: GridColDef[] = [
  { field: 'id', headerName: '№', width: 12 },
  { field: 'date_post', headerName: 'Дата поступления', width: 170 },
  { field: 'st_pnkt', headerName: 'Статья и пункт', width: 150 },
  { field: 'kd', headerName: 'КД', width: 150 },
  { field: 'reestr', headerName: 'Реестр', width: 150 },
  { field: 'fio_dol', headerName: 'ФИО должника', width: 180 },
  { field: 'current_holder', headerName: 'Текущий держатель', width: 160 },
  { field: 'date_send', headerName: 'Дата отправки', width: 150 },
  { field: 'where_send', headerName: 'Куда отправлено', width: 150 },

];

export default function MainPage() {
    return (
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
        <Button component={Link} href="/home"> Вернуться</Button>
      </div>
      
    );
  }


