import { Button, Input } from "@mui/material";

interface DataEntryProps {
  newData: string;
  placeholder: string;
  onChangeNewData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddNewData: () => void;
  disabledCondition?: boolean;
}

const DataEntry: React.FC<DataEntryProps> = ({
  newData,
  placeholder,
  onChangeNewData,
  onAddNewData,
  disabledCondition = false,
}) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        value={newData}
        sx={{ marginRight: "8px" }}
        onChange={onChangeNewData}
      />
      <Button onClick={onAddNewData} disabled={disabledCondition}>
        Add
      </Button>
    </>
  );
};

export default DataEntry;
