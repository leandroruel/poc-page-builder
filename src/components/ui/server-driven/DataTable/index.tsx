import { useState } from "react";
import { Table, Input, Button, Space, DatePicker, Select } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  date: string;
  status: string;
}

const { Option } = Select;
const { RangePicker } = DatePicker;

interface DataTableProps {
  data: any[];
  columns: ColumnsType<any>
}

export default function DataTable({ data, columns }: DataTableProps) {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<any>>({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<any>);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof any
  ): ColumnsType<any>[number] => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: "bold" }}>{text}</span>
      ) : (
        text
      ),
  });

  const createColumnConfig = (columns: ColumnsType<any>) => {
    return columns.map((col) => {
      const dataIndex = col.dataIndex; 
      return {
        ...col,
        ...getColumnSearchProps(dataIndex), // Adiciona as propriedades de busca
        sorter: (a: any, b: any) => a[dataIndex] - b[dataIndex], // Função de ordenação
        sortOrder: sortedInfo.columnKey === dataIndex ? sortedInfo.order : null, // Ordem de ordenação
      };
    });
  };

  const updatedColumns = createColumnConfig(columns);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Data Table</h2>
        <Space>
          <RangePicker className="w-64" />
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">All Status</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
          <Button type="primary" icon={<FilterOutlined />}>
            Apply Filters
          </Button>
          <Button
            onClick={() => {
              setFilteredInfo({});
              setSortedInfo({});
              setSearchText("");
              setSearchedColumn("");
            }}
          >
            Reset Filters
          </Button>
        </Space>
      </div>
      <Table
        columns={updatedColumns}
        dataSource={data}
        onChange={handleChange}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        className="shadow-sm rounded-md overflow-hidden"
      />
    </div>
  );
}
