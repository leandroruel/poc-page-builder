import { useState } from "react";
import { Table, Input, Button, Space, DatePicker, Select, Flex } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useNode } from "@craftjs/core";
import { DataTableSettings } from "./DataTableSettings";

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

export const DataTable = ({
  data = [],
  columns = [],
  title = "Data Table",
  showPagination = true,
  pageSize = 10,
  dataSource = "static",
}) => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getTableData = () => {
    switch (dataSource) {
      case "static":
        return tableData;
      case "prop":
        return data;
      default:
        return [];
    }
  };

  const getColumnSearchProps = (
    dataIndex: keyof DataType
  ): ColumnsType<DataType>[number] => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
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

  const tableColumns =
    columns.length > 0
      ? columns
      : ([
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder:
              sortedInfo.columnKey === "name" ? sortedInfo.order : null,
            ...getColumnSearchProps("name"),
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address",
            ...getColumnSearchProps("address"),
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
            sortOrder:
              sortedInfo.columnKey === "date" ? sortedInfo.order : null,
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: [
              { text: "Active", value: "Active" },
              { text: "Inactive", value: "Inactive" },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) =>
              record.status.includes(value as string),
          },
        ] as ColumnsType<DataType>);

  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const tableData: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      date: "2023-05-01",
      status: "Active",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Bridge Street",
      date: "2023-05-02",
      status: "Inactive",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 York Street",
      date: "2023-05-03",
      status: "Active",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Bridge Street",
      date: "2023-05-04",
      status: "Inactive",
    },
  ];

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
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

  return (
    <div>
      <div
        ref={(ref) => ref && connect(drag(ref))}
        className={`p-6 bg-white rounded-lg shadow-md ${
          selected ? "border-2 border-blue-500" : ""
        }`}
      >
        <Flex gap="middle" align="middle" justify="end">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
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
        </Flex>
        <Table
          columns={tableColumns}
          dataSource={getTableData()}
          onChange={handleChange}
          pagination={
            showPagination
              ? {
                  position: ["bottomCenter"],
                  showSizeChanger: true,
                  showQuickJumper: true,
                  pageSize: pageSize,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} de ${total} itens`,
                }
              : false
          }
          className="shadow-sm rounded-md overflow-hidden"
        />
      </div>
    </div>
  );
};

DataTable.craft = {
  props: {
    data: [],
    columns: [],
    title: "Data Table",
    showPagination: true,
    pageSize: 10,
    dataSource: "static",
  },
  related: {
    settings: DataTableSettings,
  },
};

export default DataTable;
