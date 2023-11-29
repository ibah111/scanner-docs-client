import React from 'react';
import documentColumns from './documentColumns';
import { Doc } from '../../Schemas/Doc.model';
import getDocs from '../../api/getDocs';

export default function useDocumentPage() {
  const columns = documentColumns();
  const [rows, setRows] = React.useState<Doc[]>([]);
  React.useEffect(() => {
    getDocs().then((res) => {
      setRows(res.rows);
    });
  });
  return { rows, columns };
}
