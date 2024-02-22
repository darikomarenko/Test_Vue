<template>
    <div
      class="cart"
      @click.prevent="chooseEmployee"
      @dblclick="removeEmployeeCard"
      :class="{ active: addActiveClass }"
    >
      <div class="cart-image">
        <img :src="employeePhotoSrc" alt="employee photo" class="cart-photo" />
      </div>
      <div class="cart-info">
        <p class="cart-info_name">{{ userName }}</p>
        <p class="cart-info_mail">{{ userEmail }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WorkerCard",
    props: {
      userId: {
        type: Number,
        required: true,
      },
      activeCardId: {
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
    },
    emits: ["chooseEmployee", "removeEmployeeCard"],
    computed: {
      addActiveClass() {
        return this.userId === this.activeCardId;
      },
      employeePhotoSrc() {
        return `workers/${this.userId}.jpeg`;
      },
    },
    methods: {
      chooseEmployee() {
        this.$emit("chooseEmployee", this.userId);
      },
      removeEmployeeCard() {
        this.$emit("removeEmployeeCard", this.userId);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  $color-border-gray: #e9ecef;
  $color-bg-gray-dark: #e0e0e0;
  $color-text-gray: #88898b;
  
  .cart {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    height: 80px;
    margin-block: 14px;
    margin-left: 3px;
    border: 1px solid $color-border-gray;
    border-radius: 10px;
    box-shadow: 0 0 5px grey;
    background-color: white;
  
    &:hover {
      cursor: pointer;
      border: 1px solid black;
      box-shadow: 0 0 5px black;
    }
  
    .cart-image {
      display: flex;
      justify-content: center;
      width: 30%;
      height: 100%;
      border-right: 2px solid $color-border-gray;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: white;
  
      .cart-photo {
        display: block;
        width: 100%;
        object-fit: contain;
        margin: 20% 0;
      }
    }
  
    .cart-info {
      margin: auto 5%;
  
      .cart-info_name {
        font-size: 1.5rem;
        font-weight: 900;
      }
  
      .cart-info_mail {
        font-size: 0.9rem;
        color: $color-text-gray;
        line-height: 1rem;
      }
    }
  }
  
  .active {
    background-color: $color-bg-gray-dark;
  }
  </style>