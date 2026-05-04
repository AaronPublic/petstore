import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const categories = [
  { label: 'All', value: null },
  { label: 'Dogs', value: 'DOG' },
  { label: 'Cats', value: 'CAT' },
  { label: 'Birds', value: 'BIRD' },
  { label: 'Fishes', value: 'FISH' },
];

const FilterBar = ({ activeCategory, onCategoryChange }) => {
  return (
    <Box className="my-8">
      <Typography variant="h6" className="mb-4 flex items-center gap-2 font-semibold">
        <PetsIcon color="primary" /> Filter by Category
      </Typography>
      <Stack direction="row" spacing={1} className="flex-wrap gap-2">
        {categories.map((cat) => (
          <Chip
            key={cat.label}
            label={cat.label}
            onClick={() => onCategoryChange(cat.value)}
            color={activeCategory === cat.value ? "primary" : "default"}
            variant={activeCategory === cat.value ? "filled" : "outlined"}
            className="cursor-pointer"
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FilterBar;
