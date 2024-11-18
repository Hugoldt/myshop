<template>
  <div class="menu">
    <h2><RouterLink style="text-decoration: none; color: inherit;" to="products">Products</RouterLink></h2>
    <h2><RouterLink style="text-decoration: none; color: inherit;" to="categories">Categories</RouterLink></h2>
    <h2><RouterLink style="text-decoration: none; color: inherit;" to="users">Users</RouterLink></h2>
  </div>
  <RouterView />
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.menu > h2 {
  font-family: "Roboto", sans-serif;
  margin: 20px;
  padding-top: 20px;
  color: #6EC4FC;
  text-decoration: underline;
}
</style>

<script>

</script>