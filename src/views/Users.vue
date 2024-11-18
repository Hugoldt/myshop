<script setup>
</script>

<template>
  <button class="btn_add" @click="showAddPopup">Add User</button>
    <table>
      <thead>
        <tr>
            <th>Id</th>  
            <th>Email</th>
            <th>Role</th>
            <th>Fullname</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.roles }}</td>
            <td>{{ user.fullName }}</td>
            <td>
                <a class="action" href="#" @click="showEditPopup(user)">Edit</a>
                <a class="action" href="#" @click="showDeletePopup(user)">Delete</a>
        </td>
      </tr>
    </tbody>
    </table>

    <div v-if="showAdd" class="popup">
  <div class="popup-content">
    <h2>Add User</h2>
    <form @submit="addUser" v-on:submit.prevent="users">
      <p>Email</p>
      <input v-model="newUser.email" />
      <p>Password</p>
      <input v-model="newUser.password" />
      <p>Full Name</p>
      <input v-model="newUser.fullName" />
      <button type="submit">Save</button>
      <button type="button" @click="cancelAdd">Cancel</button>
    </form>
  </div>
</div>


    <div v-if="showEdit" class="popup">
      <div class="popup-content">
        <h2>Edit User</h2>
        <form @submit="editUser" v-on:submit.prevent="users">
            <p>Email</p>
            <input v-model="editedUser.email" />
            <p>Password</p>
            <input v-model="editedUser.password"> 
            <p>Full Name</p>
            <input v-model="editedUser.fullName" />
            <button type="submit">Save</button>
            <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="showDelete" class="popup">
      <div class="popup-content">
        <h2>Delete User</h2>
        <p>Are you sure you want to delete this user?</p>
        <button @click="deleteUser">Delete</button>
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
      users: [],
      showAdd: false,
      showEdit: false,
      showDelete: false,
      editedUser: {
  email: '',
  password: '',
  fullName: ''
},
      selectedUser: null,
      newUser: {
        email: '',
        password: '',
        fullName : ''
      }
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost/api/users')
        .then(response => {
          this.users = response.data['hydra:member'];
          this.users.forEach(user => {
            delete user['@context'];
            delete user['@id'];
            delete user['@type'];
            delete user['hydra:search'];
            delete user['hydra:totalItems'];
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    showAddPopup() {
    this.showAdd = true;
  },
    showEditPopup(user) {
      this.selectedUser = user.id;
      this.editedUser = { ...user };
      this.showEdit = true;
    },
    showDeletePopup(user) {
      this.selectedUser = user.id;
      this.showDelete = true;
    },
    addUser() {
    axios.post('http://localhost/api/users', this.newUser)
      .then(response => {
        this.fetchUsers();
        this.showAdd = false;
      })
      .catch(error => {
        console.error(error);
      });
  },
    editUser() {
    console.log(this.editedUser);
    axios.put(`http://localhost/api/users/${this.selectedUser}`, this.editedUser)
    .then(response => {
      this.fetchUsers();
      this.showEdit = false;
    })
    .catch(error => {
      console.error(error);
    });
},
    deleteUser(userId) {
      axios.delete(`http://localhost/api/users/${this.selectedUser}`)
        .then(response => {
          alert("User deleted")
          this.users = this.users.filter(user => user.id !== userId);
          this.fetchUsers();
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
