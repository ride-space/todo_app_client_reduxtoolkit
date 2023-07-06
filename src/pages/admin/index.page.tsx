import type { MRT_ColumnDef } from 'mantine-react-table';
import { MantineReactTable } from 'mantine-react-table';
import { useMemo } from 'react';

type Person = {
  address: string;
  city: string;
  name: {
    firstName: string;
    lastName: string;
  };
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    address: '261 Battle Ford',
    city: '大阪',
    name: {
      firstName: '田中',
      lastName: '小次郎',
    },
    state: 'Ohio',
  },
  {
    address: '566 Brakus Inlet',
    city: '函館',
    name: {
      firstName: '山田',
      lastName: '伸郎',
    },
    state: 'West Virginia',
  },
  {
    address: '7777 Kuhic Knoll',
    city: '鉾田',
    name: {
      firstName: '北九州',
      lastName: '達郎',
    },
    state: 'West Virginia',
  },
  {
    address: '722 Emie Stream',
    city: '北区',
    name: {
      firstName: '堀',
      lastName: '色生',
    },
    state: 'Washington',
  },
  {
    address: '1 Kuhic Knoll',
    city: '津',
    name: {
      firstName: '池田',
      lastName: '大悟',
    },
    state: 'Nebraska',
  },
];

const Admin = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => {
    return [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: '苗字',
      },
      {
        accessorKey: 'name.lastName',
        header: '名前',
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: '市町村',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ];
  }, []);

  return (
    <>
      <MantineReactTable columns={columns} data={data} />
    </>
  );
};

export default Admin;
