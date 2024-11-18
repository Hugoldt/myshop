<script setup>
</script>

<template>
  <button class="btn_add" @click="showAddPopup">Add Categories</button>
    <table>
      <thead>
        <tr>
            <th>Id</th>  
            <th>Name</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categorie in categories" :key="categorie.id">
            <td>{{ categorie.id }}</td>
            <td>{{ categorie.name }}</td>
            <td>
                <a class="action" href="#" @click="showEditPopup(categorie)">Edit</a>
                <a class="action" href="#" @click="showDeletePopup(categorie)">Delete</a>
        </td>
      </tr>
    </tbody>
    </table>

    <div v-if="showAdd" class="popup">
  <div class="popup-content">
    <h2>Add Categorie</h2>
    <form @submit="addCategorie" v-on:submit.prevent="categories">
      <p>Name</p>
      <input v-model="newCategorie.name" />
      <button type="submit">Save</button>
      <button type="button" @click="cancelAdd">Cancel</button>
    </form>
  </div>
</div>


    <div v-if="showEdit" class="popup">
      <div class="popup-content">
        <h2>Edit Categorie</h2>
        <form @submit="editCategorie" v-on:submit.prevent="categories">
            <p>Name</p>
          <input v-model="editedCategorie.name" />
          <button type="submit">Save</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="showDelete" class="popup">
      <div class="popup-content">
        <h2>Delete Categorie</h2>
        <p>Are you sure you want to delete this Categorie?</p>
        <button @click="deleteCategorie">Delete</button>
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
  width: 10%;
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
        categories: [],
      showAdd: false,
      showEdit: false,
      showDelete: false,
      editedCategorie: null,
      selectedCategorie: null,
      newCategorie: {
        name: '',
      }
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost/api/categories')
        .then(response => {
          this.categories = response.data['hydra:member'];
          this.categories.forEach(categorie => {
            delete categorie['@context'];
            delete categorie['@id'];
            delete categorie['@type'];
            delete categorie['hydra:search'];
            delete categorie['hydra:totalItems'];
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    showAddPopup() {
    this.showAdd = true;
  },
    showEditPopup(categorie) {
      this.selectedCategorie = categorie.id;
      this.editedCategorie = { ...categorie };
      this.showEdit = true;
    },
    showDeletePopup(categorie) {
      this.selectedCategorie = categorie.id;
      this.showDelete = true;
    },
    addCategorie() {
    axios.post('http://localhost/api/categories', this.newCategorie)
      .then(response => {
        this.fetchCategories();
        this.showAdd = false;
      })
      .catch(error => {
        console.error(error);
      });
  },
    editCategorie() {
    axios.put(`http://localhost/api/categories/${this.selectedCategorie}`, this.editedCategorie)
    .then(response => {
      this.fetchCategories();
      this.showEdit = false;
    })
    .catch(error => {
      console.error(error);
    });
},
    deleteCategorie(categorieId) {
      axios.delete(`http://localhost/api/categories/${this.selectedCategorie}`)
        .then(response => {
          alert("Categorie deleted")
          this.categories = this.categories.filter(categorie => categorie.id !== categorieId);
          this.fetchCategories();
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
