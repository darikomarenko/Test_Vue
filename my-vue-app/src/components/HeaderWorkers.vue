<template>
    <div class="header-employees">
      <h1 class="company">Жилфонд</h1>
      <p class="account">
        <a href="#" title="Сменить учетную запись">Пользователь</a>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeaderWorkers",
  };
  </script>
  
  <style lang="scss" scoped>
  $color-text-gray: #88898b;
  
  .header-employees {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5vh;
  
    .company {
      font-size: 3.5rem;
      font-weight: bold;
      color: red;
    }
  
    .account {
      font-size: 2rem;
      a {
        color: $color-text-gray;
  
        &:visited {
          color: $color-text-gray;
        }
      }
    }
  }

  @media screen and (min-width:320px) and (max-width: 390px) {
    .header-employees {
        flex-direction: column;
    }
    
  }
  </style>