<template>
  <div class="wrapper">
    <nav class="navbar">
      <RouterLink to="/ministerios">Ministérios</RouterLink>
      <RouterLink to="/secretarias">Secretarías</RouterLink>
      <RouterLink to="/ministros">Ministros</RouterLink>
      <RouterLink to="/presidentes">Presidentes</RouterLink>
    </nav>
  </div>

  <RouterView class="body-wrapper"/>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  background-color: #333;
}
.navbar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #333;
  padding: 0 20%;
  margin: 0;
}

.navbar a {
  color: #fff; 
  text-decoration: none;
  margin-right: 20px;
  font-size: 18px;
}

.navbar a:hover {
  text-decoration: underline;
}

.body-wrapper {
  padding: 2% 20%;
  display: flex;
  flex-direction: column;
}
</style>
