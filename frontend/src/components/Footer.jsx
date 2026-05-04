import { Box, Container, Typography, Link, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider', mt: 10 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} PetStore. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="/tracking" color="text.secondary" underline="hover">Track Order</Link>
            <Link href="#" color="text.secondary" underline="hover">Privacy</Link>
            <Link href="#" color="text.secondary" underline="hover">Terms</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
