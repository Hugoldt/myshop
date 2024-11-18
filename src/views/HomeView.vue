<template>
    <div class="header">

    </div>

    <div class="shop-container">
       <div class="grid">
        <router-link style="text-decoration: none; color: inherit;" v-for="product in products" :key="product.id" :to="'/products/' + product.id">
         <div class="grid-item">
           <img class="img" src="../assets/img_product.png" alt="product.name" />
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="category">{{ product.category }}</p>
                <p class="price">{{ product.price }} €</p>
                <div class="rating">★★★★☆</div>
         </div>
        </router-link>
       </div>
    </div>

    <footer class="footer-distributed">

<div class="footer-left">

  <h3>My<span>Shop</span></h3>
  <p class="footer-company-name">MyShop © 2024</p>
</div>

<div class="footer-center">

  <div>
    <i class="fa fa-map-marker"></i>
    <p><span>95 Avenue Parmentier</span> Paris, France</p>
  </div>

  <div>
    <i class="fa fa-phone"></i>
    <p>+33 000000000</p>
  </div>

  <div>
    <i class="fa fa-envelope"></i>
    <p><a href="mailto:support@company.com">support@myshop.com</a></p>
  </div>

</div>

<div class="footer-right">

  <p class="footer-company-about">
    <span>About the company</span>
    Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
  </p>

  <div class="footer-icons">

    <a href="https://www.instagram.com/hugoldt_/"><i class="fa fa-instagram"></i></a>
    <a href="https://www.instagram.com/nino_trvl/"><i class="fa fa-instagram"></i></a>
    <a href="https://www.linkedin.com/in/https://www.youtube.com/watch?v=dQw4w9WgXcQ/"><i class="fa fa-linkedin"></i></a>
    <a href="https://github.com/AzizVapiano"><i class="fa fa-github"></i></a>

  </div>

</div>

</footer>

   </template>
   
   <script>
   import axios from "axios";
   
   export default {
    data() {
       return {
         products: [],
       };
    },
    mounted() {
       this.getProducts();
    },
    methods: {
       async getProducts() {
         try {
           const response = axios.get('http://localhost/api/products')
        .then(response => {
          this.products = response.data['hydra:member'];
          this.products.forEach(product => {
            delete product['@context'];
            delete product['@id'];
            delete product['@type'];
            delete product['hydra:search'];
            delete product['hydra:totalItems'];
          });
        })
        .catch(error => {
          console.error(error);
        });
           console.log(response.data)
           this.products = response.data;
         } catch (error) {
           console.error("Error fetching products: ", error);
         }
       },
    },
   };
   </script>
   
   <style scoped>
   .shop-container {
    padding-top: 5%;
    max-width: 87%;
    margin: 0 auto;
   }
   
   .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
    grid-gap: 20px;
   }
   
   .grid-item {
    border: 1px solid #ccc;
    padding: 20px;
    text-align: center;
   }

   .img {
    width: 70%;
   }

   .product-name {
    position: relative;
    right: 36%;
   }

   .category{
    position: relative;
    right: 36%;
   }

   .price {
    position: relative;
    left: 40%;
    font-weight: bold;
   }

   .rating {
    position: relative;
    right: 36%;
   }

   </style>