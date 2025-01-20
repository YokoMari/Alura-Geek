import {
  fetchProducts,
  postProduct,
  deleteProduct,
  addProductLocally,
} from './api.js';
import { addProduct } from './dom.js';

const productContainer = document.querySelector('.products__list');
const productForm = document.querySelector('#product-form');
const filePickerIcon = document.querySelector('#file-picker-icon');
const filePicker = document.querySelector('#file-picker');
const productImageInput = document.querySelector('#product-image');
const resetButton = document.querySelector('#reset-button'); 

let imageDataUrl = ''; 


filePickerIcon.addEventListener('click', () => {
  filePicker.click();
});


filePicker.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageDataUrl = e.target.result; 
      productImageInput.value = file.name; 
      filePickerIcon.classList.add('hidden');
    };
    reader.readAsDataURL(file); 
  }
});


productImageInput.addEventListener('input', () => {
  if (productImageInput.value) {
    filePickerIcon.classList.add('hidden');
  } else {
    filePickerIcon.classList.remove('hidden');
  }
});


resetButton.addEventListener('click', () => {
  filePickerIcon.classList.remove('hidden');
  imageDataUrl = ''; 
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  products.forEach((product) => addProduct(product, productContainer));

  const noProductsMessage = document.createElement('h2');
  noProductsMessage.classList.add('products__list--empty');
  if (!products.length) {
    productContainer.appendChild(noProductsMessage);
  }
});

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newProduct = {
    name: document.querySelector('#product-name').value,
    image: imageDataUrl || productImageInput.value, 
    price: document.querySelector('#product-price').value,
  };
  const formInputs = document.querySelectorAll('#product-form input');
  try {
    const product = await postProduct(newProduct);
    addProduct(product, productContainer);
  } catch (error) {
    console.error('Error posting product, posting locally:', error);
    addProductLocally(newProduct);
    addProduct(newProduct, productContainer);
  } finally {
    formInputs.forEach((input) => (input.value = ''));
    filePickerIcon.classList.remove('hidden');
    imageDataUrl = ''; 


    const noProductsMessage = document.querySelector('.products__list--empty');
    if (productContainer.childElementCount > 0 && noProductsMessage) {
      noProductsMessage.remove();
    }
  }
});

productContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('fa-trash-can')) {
    const productCard = event.target.closest('.product-card');
    const productId = productCard.dataset.id;
    await deleteProduct(productId);
    productCard.remove();
  }

  if (productContainer.childElementCount === 0) {
    const noProductsMessage = document.createElement('h2');
    noProductsMessage.classList.add('products__list--empty');
    productContainer.appendChild(noProductsMessage);
  }
});
