<template>
  <header>
    <div class="wrapper">
      <nav class="navbar">
        <RouterLink to="/ministerios">Ministérios</RouterLink>
        <RouterLink to="/secretarias">Secretarías</RouterLink>
        <RouterLink to="/ministros">Ministros</RouterLink>
        <RouterLink to="/presidentes">Presidentes</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.navbar {
  background-color: #333; /* Cor de fundo */
  padding: 10px 0; /* Espaçamento interno */
}

.navbar a {
  color: #fff; /* Cor do texto */
  text-decoration: none; /* Remover sublinhado nos links */
  margin-right: 20px; /* Espaçamento entre os links */
  font-size: 18px; /* Tamanho da fonte */
}

.navbar a:hover {
  text-decoration: underline; /* Sublinhar os links no hover */
}
</style>
