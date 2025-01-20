export function addProduct(product, container) {
  const productCard = document.createElement('li');
  productCard.classList.add('product-card');
  productCard.dataset.id = product.id;
  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-card__image">
    <h3 class="product-card__title">${product.name}</h3>
    <p class="product-card__price">$${product.price}</p>
    <i class="fa-solid fa-trash-can" title="Eliminar"></i>
  `;

  const productImage = productCard.querySelector('.product-card__image');
  productImage.addEventListener('error', () => {
    productImage.src = './assets/no-img.jpg'; 
  });

  container.appendChild(productCard);
}

document.getElementById('product-name').addEventListener('input', function (e) {
  let words = e.target.value.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  e.target.value = words.join(' ');
});