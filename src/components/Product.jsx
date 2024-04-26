import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Product({ product }) {
  const styles = {
    image: {
      width: '5rem',
      display: 'block',
      margin: '10px auto',
      height: '120px'
    }
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.imageURL} style={styles.image} />
      <Card.Body>
        <Card.Title style={{ minHeight: '80px' }}>{product.name}</Card.Title>
        <Card.Text className='text-muted'>
          {product.category}
        </Card.Text>
        <Button variant="warning" style={{ marginRight: '1rem' }}>Edit</Button>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;