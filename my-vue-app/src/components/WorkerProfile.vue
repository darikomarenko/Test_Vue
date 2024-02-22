<template>
    <div class="profile-container">
      <div class="profile-image_container">
        <img :src="employeePhotoSrc" alt="employee photo" class="profile-photo" />
      </div>
      <div class="profile-info">
        <p class="chapter">{{ userName }}</p>
        <p class="contact">
          email: <span class="contact-info">{{ userEmail }}</span>
        </p>
        <p class="contact">
          phone: <span class="contact-info">{{ userPhone }}</span>
        </p>
        <p class="chapter">О себе:</p>
        <p class="contact-info">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
          sapiente, voluptatum praesentium aperiam, facere inventore illum, natus
          iste maiores commodi delectus sit eveniet quam odit. Eius voluptatibus
          praesentium quasi cupiditate doloremque excepturi id suscipit neque
          necessitatibus. In ad commodi aliquid quibusdam non ea voluptate iste,
          quia nobis a odio? Enim est cum suscipit id rerum fuga, illum pariatur
          error non doloremque esse accusantium expedita commodi. A quae inventore
          minima iste doloremque modi dolores accusantium, vitae maxime et
          voluptas quaerat vel cupiditate numquam soluta commodi quo? Praesentium
          labore corporis ullam, voluptas exercitationem omnis, impedit a sequi
          molestiae sunt odio incidunt. Aut qui cumque nemo, in consequatur sequi
          dolore? Iure vitae magni libero sunt aperiam maxime voluptatum error,
          tempore harum delectus eos ratione quidem autem dolorem voluptates
          reiciendis quam fuga et ipsam saepe quis nostrum. Est harum tempore
          perferendis error vitae eos numquam minima consequuntur nostrum!
          Corrupti natus ducimus blanditiis odio dolores!
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EmployeeProfile",
    props: {
      userId: {
        type: Number,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      userEmail: {
        type: String,
        required: true,
      },
      userPhone: {
        type: String,
        required: true,
      },
    },
    computed: {
      employeePhotoSrc() {
        return `workers/${this.userId}.jpeg`;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  $color-bg-gray-light: #fafafa;
  $color-border-gray: #e9ecef;
  $color-text-gray: #88898b;
  
  .profile-container {
    display: flex;
    align-content: flex-start;
    justify-content: space-around;
    height: 100%;
    background-color: $color-bg-gray-light;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  
    .profile-image_container {
      width: 100%;
      height: 40vh;
      margin-top: 30px;
      margin-left: 25px;
  
      .profile-photo {
        display: block;
        width: 60%;
        margin: 0 auto;
        object-fit: contain;
        border: 2px solid $color-border-gray;
      }
    }
  
    .profile-info {
      width: 150%;
      height: 50vh;
      margin-top: 15px;
      margin-left: 75px;
      margin-right: 30px;
  
      .chapter {
        font-size: 1.8rem;
        font-weight: 900;
        margin: 1.5rem 0;
      }
  
      .contact {
        font-size: 1.5rem;
        font-weight: 900;
        margin: 1.5rem 0;
      }
  
      .contact-info {
        font-size: 1.5rem;
        color: $color-text-gray;
      }
    }
  }
  </style>