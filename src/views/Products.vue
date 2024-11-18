<script setup>
</script>

<template>
  <button class="btn_add" @click="showAddPopup">Add Product</button>
    <table>
      <thead>
        <tr>
            <th>Id</th>  
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image Id</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.image_id }}</td>
            <td>
                <a class="action" href="#" @click="showEditPopup(product)">Edit</a>
                <a class="action" href="#" @click="showDeletePopup(product)">Delete</a>
        </td>
      </tr>
    </tbody>
    </table>

    <div v-if="showAdd" class="popup">
  <div class="popup-content">
    <h2>Add Product</h2>
    <form @submit="addProduct" v-on:submit.prevent="products">
      <p>Name</p>
      <input v-model="newProduct.name" />
      <p>Description</p>
      <input v-model="newProduct.description" />
      <p>Price</p>
      <input v-model="newProduct.price" />
      <button type="submit">Save</button>
      <button type="button" @click="cancelAdd">Cancel</button>
    </form>
  </div>
</div>


    <div v-if="showEdit" class="popup">
      <div class="popup-content">
        <h2>Edit Product</h2>
        <form @submit="editProduct" v-on:submit.prevent="products">
            <p>Name</p>
          <input v-model="editedProduct.name" />
            <p>Price</p>
          <input v-model="editedProduct.price" />
          <p>Description</p>
          <input v-model="editedProduct.description" />
          <p>Image ID</p>
          <input v-model="editedProduct.image_id" />
          <button type="submit">Save</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="showDelete" class="popup">
      <div class="popup-content">
        <h2>Delete Product</h2>
        <p>Are you sure you want to delete this product?</p>
        <button @click="deleteProduct">Delete</button>
        <button @click="cancelDelete">Cancel</button>
      </div>
    </div>
</template>
  

<style>
body {
    font-family: "Roboto", sans-serif;
        }

        table {
            margin-left: 5%;
            width: 90%;
            border-collapse: collapse;
            margin-top: 3%;
        }

        th {
            background-color: #f2f2f2;
            text-align: left;
            padding: 15px;
            border: 1px solid #ddd;
        }

        td {
            padding: 15px;
            border: 1px solid #ddd;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f1f1;
        }

        .popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 40%;
}

.popup h2 {
  margin-top: 0;
}

.popup form {
  display: flex;
  flex-direction: column;
}

.popup input {
  margin-bottom: 10px;
}

.popup button {
  margin-top: 10px;
}

.action {
    margin: 1%;
    text-decoration: none;
    color: 6EC4FC;
}

.btn_add {
  color: white;
  background-color: #2E81EC;
  font-size: 15px;
  width: 7%;
  padding: 10px;
  float: right;
  margin-right: 5%;
  border-radius: 8px;
  box-shadow: none;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      showAdd: false,
      showEdit: false,
      showDelete: false,
      editedProduct: null,
      selectedProduct: null,
      newProduct: {
        name: '',
        description: '',
        price: ''
      }
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost/api/products')
        .then(response => {
          // Extract the relevant items from the response
          this.products = response.data['hydra:member'];

          // Remove the "hydra" properties from each product
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
    },
    showAddPopup() {
    this.showAdd = true;
  },
    showEditPopup(product) {
      this.selectedProduct = product.id;
      this.editedProduct = { ...product };
      this.showEdit = true;
    },
    showDeletePopup(product) {
      this.selectedProduct = product.id;
      this.showDelete = true;
    },
    addProduct() {
      this.newProduct.price = parseFloat(this.newProduct.price);
    axios.post('http://localhost/api/products', this.newProduct)
      .then(response => {
        this.fetchProducts();
        this.showAdd = false;
      })
      .catch(error => {
        console.error(error);
      });
  },
    editProduct() {
    this.editedProduct.price = parseFloat(this.editedProduct.price);
    axios.put(`http://localhost/api/products/${this.selectedProduct}`, this.editedProduct)
    .then(response => {
      this.fetchProducts();
      this.showEdit = false;
    })
    .catch(error => {
      console.error(error);
    });
},
    deleteProduct(productId) {
      axios.delete(`http://localhost/api/products/${this.selectedProduct}`)
        .then(response => {
          alert("Product deleted")
          this.products = this.products.filter(product => product.id !== productId);
          this.fetchProducts();
          this.showDelete = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    cancelEdit() {
      this.showEdit = false;
    },
    cancelDelete() {
      this.showDelete = false;
    },
    cancelAdd() {
    this.showAdd = false;
  },
  },
};
</script>
