import { Box, Tabs, Tab } from '@mui/material';

const categories = [
  { label: 'All', value: null },
  { label: 'Dogs', value: 'DOG' },
  { label: 'Cats', value: 'CAT' },
  { label: 'Birds', value: 'BIRD' },
  { label: 'Fishes', value: 'FISH' },
];

const FilterBar = ({ activeCategory, onCategoryChange }) => {
  const currentIndex = categories.findIndex((c) => c.value === activeCategory);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
      <Tabs 
        value={currentIndex === -1 ? 0 : currentIndex} 
        onChange={(_, newValue) => onCategoryChange(categories[newValue].value)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {categories.map((cat) => (
          <Tab key={cat.label} label={cat.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default FilterBar;
