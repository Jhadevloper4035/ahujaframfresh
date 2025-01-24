import { Box, Card, Container, Grid, Link, Menu, MenuItem, Stack, Typography, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../Pages/Loading';
import EditProduct from './EditProduct';
import { useDispatch } from "react-redux";
import { userLogOut } from "../store/slices/UserSlice";
import { FormatPrice } from '../utils/FormatPrice';


const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

const AllProducts = () => {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('newest');
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (e) => {
    setValue(e.target.innerText === '' ? value : e.target.innerText);
    setOpen(null);
  };

  const getProduct = async () => {
    try {
      const resp = await axios.get(`https://swarnsutra.com/api/products`);
      setProducts(resp.data);
    } catch (error) {
      toast.error("Check your internet connection");
    }
  }

  useEffect(() => {
    getProduct();
  }, [location.pathname]);

  const delteProduct = async (id) => {
    const sure = window.confirm("Are you sure you want to delete this product?");
    if (sure) {
      setLoading(true);
      const data = { productId: id };
      try {
        const resp = await axios.post('https://swarnsutra.com/api/fileDelete', data, { headers: { 'authorization': userInfo.token } });
        if (resp.data.status == 200) {
          setLoading(false);
          toast("Product deleted successfully");
          window.location.reload();
        } else if (resp.data.status == 505) {
          setLoading(false);
          dispatch(userLogOut());
          localStorage.removeItem("userInfo")
          toast.error(`${resp.data.message}`);
          navigate('/login');
        } else {
          setLoading(false);
          toast("Something went wrong");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Check your internet connection");
      }
    } else {
      toast("Product deletion operation cencelled!");
    }
  }

  if (products == undefined) {
    return (
      <Loading />
    )
  }

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <Box sx={{ margin: { xs: '56px 0 0 0', sm: '64px 0 0 0', md: '64px 0 60px 280px' }, padding: '10px 0px', backgroundColor: 'rgb(248,250, 255)' }}>
      <Container>
        <Typography variant="h4" sx={{ mb: 5, fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem' } }} >
          Products
        </Typography>

        <TextField placeholder='Search by Product Code' sx={{width:{xs:'100%', sm:'50%'}}} onChange={(e) => setSearch(e.target.value)} />
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" sx={{ my: 2, flexDirection: { xs: 'column', sm: 'row' } }}>

          <Button disableRipple startIcon={<AddIcon />} variant='contained' sx={{ marginBottom: { xs: '15px', sm: '0' } }} onClick={() => navigate('/dashboard/products/new')}>Add Product</Button>
          <Button
            color="inherit"
            disableRipple
            onClick={handleOpen}
            endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ fontWeight: 700 }}
          >
            Sort By:&nbsp;
            <Typography component="span" variant="subtitle2" sx={{ color: 'rgb(99, 115, 129)', fontWeight: 600 }}>
              {value}
            </Typography>
          </Button>
          <Menu
            keepMounted
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {SORT_BY_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                selected={option.value === 'newest'}
                onClick={handleClose}
                sx={{ typography: 'body2' }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>

        </Box>

        <Grid container spacing={3}>
          {products.filter((item) => {
            return search.toLowerCase() === '' ? item : item.productCode.toLowerCase().includes(search.toLowerCase())
          })?.map((item, index) => {
            const { _id, title, images, price, section } = item;
            return (
              <Grid key={_id} item xs={12} sm={6} md={4}>
                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    {/* {section && (
                    <Box
                      component='span'
                      variant="filled"
                      // color={(status === 'sale' && 'error') || 'info'}
                      color='white'
                      bgcolor={ section === 'new' ? 'rgb(24, 144, 255)' : ''}
                      sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase',
                        padding: '0px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        height: '24px',
                        minWidth: '22px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 0,

                      }}
                    >
                      {section}
                    </Box>
                  )} */}
                    <img alt={`product_${index+1}`} src={images[0]} style={{ top: 0, width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', }} />
                  </Box>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="subtitle2">
                        {title}
                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography>Price : </Typography>
                      <Typography variant="subtitle1">
                        {/* <Typography
                        component="span"
                        variant="body1"
                        sx={{
                          color: 'text.disabled',
                          textDecoration: 'line-through',
                        }}
                      >
                        {priceSale && fCurrency(priceSale)}
                      </Typography> */}
                        {/* &nbsp; */}
                        {/* {fCurrency(price)} */}
                        <FormatPrice price={price} />
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <EditProduct item={item} />
                      <Button color="inherit" variant='contained' onClick={() => delteProduct(_id)}>Delete</Button>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            )
          })}

          {
            products.filter((item) => {
              return search.toLowerCase() === '' ? item : item.productCode.toLowerCase().includes(search.toLowerCase())
            }).length === 0 && (
              <Box mt={4} ml={3}>
                 <Typography>No Product found for this Product Code.</Typography>
              </Box>
            )
          }
        </Grid>

      </Container>
    </Box>
  )
}

export default AllProducts;