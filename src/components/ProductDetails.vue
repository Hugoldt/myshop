<template>
    <div v-if="product">
        <div class="product">
            <header class="heades">
                <hgroup>
                    <h1>{{ product.name }}</h1>
                </hgroup>
            </header>

            <figure>
                <img class="img" src="../assets/img_product.png" alt="product.name" />
            </figure>

            <section>
                <p>{{ product.description }}</p>
                <button class="btn_achat">Buy Now</button>
            </section>
        </div>
    </div>
    <div v-else>
        <center><div class="lds-dual-ring"></div></center>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        product: null,
      };
    },
    mounted() {
      this.getProductDetails();
    },
    methods: {
      async getProductDetails() {
        try {
          const response = await axios.get(`http://localhost/api/products/${this.$route.params.id}`);
          this.product = response.data;
        } catch (error) {
          console.error("Error fetching product details: ", error);
        }
      },
    },
  };
  </script>

  <style>

.heades {
    margin-top: 3%;
    margin-bottom: 20px;
    margin-left: 20%;
}

figure {
  float: left;
  margin-left: 20%;
}
figure img {
  max-width: 100%;
}

section {
margin-right: 32%;
  font-family: Tahoma, Arial, sans-serif;
  line-height: 150%;
  float: right;
  width: 300px;
  color: #333;
}

.btn_achat {
    padding: 3%;
    border-radius: 10px;
    color: white;
    background-color: #616161;
    
}

.lds-dual-ring {
  display: inline-block;
  width: 20%;
  height: 20%;
  margin-top: 20%;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000000;
  border-color: #000000 transparent #000000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>
  