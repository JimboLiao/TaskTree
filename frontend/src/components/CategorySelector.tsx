import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useCategories from "../hooks/useCategories";
import { Category } from "../../../config/type";

interface CategorySelectorProps {
  categoryId: string;
  onCategory: (newCategory: Category) => void;
}
const CategorySelector: React.FC<CategorySelectorProps> = ({
  categoryId = "",
  onCategory,
}) => {
  const { categories } = useCategories();

  return (
    <>
      <FormControl
        variant="standard"
        sx={{ minWidth: 120, paddingRight: "8px" }}
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={categoryId}
          onChange={handleCategory}
          label="Category"
          name="category"
        >
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  function handleCategory(event: SelectChangeEvent) {
    const newCategory = categories.find(
      (c) => c.id === parseInt(event.target.value)
    );

    if (!newCategory) return;
    onCategory(newCategory);
  }
};

export default CategorySelector;
