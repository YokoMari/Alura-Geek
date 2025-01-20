export async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }

  }

  export async function postProduct(product) {
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)   
      });
      return await response.json();
    } catch (error) {
      console.error('Error posting product:', error);
      throw error;
    }
  }
  export function addProductLocally(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  export function getLocalProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }

  export function clearLocalProducts() {
    localStorage.removeItem('products');
  }

  window.addEventListener('beforeunload', clearLocalProducts);
  
  export async function deleteProduct(productId) {
    try {
      await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  
