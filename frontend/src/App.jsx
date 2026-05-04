import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetGallery from './pages/PetGallery';
import PetDetails from './pages/PetDetails';
import Cart from './pages/Cart';
import Tracking from './pages/Tracking';
import { CartProvider, useCart } from './context/CartContext';
import Footer from './components/Footer';

const CartIcon = () => {
  const { cartItems } = useCart();
  return (
    <IconButton color="inherit" component={Link} to="/cart">
      <Badge badgeContent={cartItems.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }} elevation={0}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography variant="h5" component={Link} to="/" sx={{ flexGrow: 1, fontWeight: 800, color: 'primary.main', letterSpacing: -0.5, textDecoration: 'none' }}>
                PetStore.
              </Typography>
              <CartIcon />
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<PetGallery />} />
              <Route path="/pets/:id" element={<PetDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/tracking" element={<Tracking />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </CartProvider>
  );
}

export default App;
