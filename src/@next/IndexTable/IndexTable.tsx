import React from 'react';
import {
  Cell,
  IndexTable as PolarisIndexTable,
  IndexTableProps,
} from 'polaris-glints';
import { Checkbox } from '../Checkbox';
import { CheckboxProps } from '../Checkbox';
import { Row } from './components/Row/Row';
import { StyledIndexTable } from './IndexTableStyle';

const IndexTable = ({
  bulkActions,
  children,
  itemCount,
  selectedItemsCount,
  ...props
}: IndexTableProps) => {
  const renderCheckboxHeader = ({
    checked,
    onChange,
    ...props
  }: CheckboxProps) => {
    return (
      <Checkbox
        onChange={onChange}
        checked={checked}
        isPadded={false}
        {...props}
      />
    );
  };

  return (
    <>
      <StyledIndexTable />
      <PolarisIndexTable
        bulkActions={bulkActions}
        checkbox={renderCheckboxHeader}
        itemCount={itemCount}
        selectedItemsCount={selectedItemsCount}
        {...props}
      >
        {children}
      </PolarisIndexTable>
    </>
  );
};

IndexTable.Cell = Cell;
IndexTable.Row = Row;
export { useIndexResourceState } from 'polaris-glints';
export { IndexTable, IndexTableProps };
