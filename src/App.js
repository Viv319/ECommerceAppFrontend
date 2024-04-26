import { useState, useEffect } from 'react'
import './App.css';
import NavbarComponent from './components/NavbarComponent'
import Product from './components/Product'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([]);
  const productDefaultValue = {
    name: '',
    category: '',
    price: 0,
    imageURL: ''
  }
  const [newProduct, setNewProduct] = useState(productDefaultValue)

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/products')
      if(res.data)
        setProducts(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createProduct = async (e) => {
    try {
      e.preventDefault()
      await axios.post('http://localhost:4000/products', newProduct)
      fetchProducts()
      setNewProduct(productDefaultValue)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <NavbarComponent />
      <h1 className='display-1'>
        Welcome to E-Commerce App
      </h1>
      <p className='lead'>Explore our wide range of products and give yourself a new look!</p>
      <Form onSubmit={createProduct} style={{ width: '20rem', margin: '10px auto' }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Inverter AC" 
            value={newProduct.name}
            onInput={(e) => setNewProduct({
              ...newProduct,
              name: e.target.value
            })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Category Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Appliances" 
            value={newProduct.category}
            onInput={(e) => setNewProduct({
              ...newProduct,
              category: e.target.value
            })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="19999.00" 
            value={newProduct.price}
            onInput={(e) => setNewProduct({
              ...newProduct,
              price: e.target.value
            })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Image URL</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="www.img.com" 
            value={newProduct.imageURL}
            onInput={(e) => setNewProduct({
              ...newProduct,
              imageURL: e.target.value
            })}
          />
        </Form.Group>
        <Button variant='dark' type="submit">Create a new product</Button>
      </Form>
      <Container>
        <Row>
          {products.map(product => (
            <Col key={product._id} md={4} style={{marginTop: '1rem'}}><Product product={product} /></Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
