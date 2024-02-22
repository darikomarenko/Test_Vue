<template>
  <header>
    <header-workers></header-workers>
  </header>
  <div class="search">
    <div class="search-aside">
      <div class="search-aside_container">
        <p class="chapter">Поиск сотрудников</p>
        <input
          type="text"
          placeholder="Введите id или имя"
          class="search-input"
          @keyup.enter.prevent="searchEmployee"
        />
        <p class="chapter">Результаты</p>
        <p class="temporary-result">{{ searchMessage }}</p>

        <worker-card
          :user-id="employee.id"
          :active-card-id="activeCardId"
          :user-name="employee.username"
          :user-email="employee.email"
          v-for="employee in employees"
          :key="employee.id"
          @chooseEmployee="chooseEmployee"
          @removeEmployeeCard="removeEmployeeCard"
        ></worker-card>
      </div>
      <button
        class="clear-result"
        title="Очистить результаты поиска"
        @click.prevent="clearSearchResult"
        v-if="showClearButton"
      >
      х
      </button>
    </div>

    <div class="search-main">
      <p class="search-main_temporary" v-if="showInitialMessage">
        Выберите сотрудника, чтобы посмотреть его профиль
      </p>

      <loader v-if="showPreLoader"></loader>

      <worker-profile
        v-if="showEmployeeProfile"
        :user-id="currentEmployeeProfile.id"
        :user-name="currentEmployeeProfile.name"
        :user-email="currentEmployeeProfile.email"
        :user-phone="currentEmployeeProfile.phone"
      ></worker-profile>
    </div>
  </div>
</template>

<script>
import HeaderWorkers from "./components/HeaderWorkers.vue";
import Loader from "./components/Loader.vue";
import WorkerCard from "./components/WorkerCard.vue";
import WorkerProfile from "./components/WorkerProfile.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: { HeaderWorkers, WorkerCard, WorkerProfile, Loader },
  data() {
    return {
      currentEmployeeProfile: [],
      activeCardId: 0,
      showInitialMessage: true,
      showPreLoader: false,
      showEmployeeProfile: false,
    };
  },
  computed: {
    ...mapState(["employees", "searchMessage"]),
    showClearButton() {
      return this.employees.length > 0;
    },
  },
  methods: {
    async searchEmployee(event) {
      this.showInitialMessage = false;
      this.showEmployeeProfile = false;
      this.showPreLoader = true;
      let inputValue = event.target.value.trim();
      if (parseInt(inputValue, 10)) {
        await this.$store.dispatch("searchEmployeeByID", inputValue);
        this.showPreLoader = false;
        this.showInitialMessage = true;
      } else {
        inputValue.split(", ").forEach(async (employeeUserName) => {
          await this.$store.dispatch(
            "searchEmployeeByUserName",
            employeeUserName
          );
          this.showPreLoader = false;
          this.showInitialMessage = true;
        });
      }
    },
    chooseEmployee(userId) {
      this.activeCardId = userId;
      this.currentEmployeeProfile = this.employees.find(
        (employee) => employee.id === userId
      );
      this.showInitialMessage = false;
      this.showEmployeeProfile = true;
    },
    removeEmployeeCard(userId) {
      this.$store.dispatch("removeEmployeeCard", userId);
      this.activeCardId = 0;
      this.showInitialMessage = true;
      this.showEmployeeProfile = false;
    },
    clearSearchResult() {
      this.$store.dispatch("clearSearchResult");
      this.currentEmployeeProfile = [];
      this.showInitialMessage = true;
      this.showEmployeeProfile = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$color-bg-gray-light: #fafafa;
$color-bg-gray-dark: #e0e0e0;
$color-border-gray: #e9ecef;
$color-border-active-gray: #868484;
$color-text-gray: #88898b;

.search {
  display: flex;
  height: 80vh;
  margin-bottom: 5vh;
  display: flex;
  border: 2px solid $color-border-gray;
  border-radius: 20px;
  box-shadow: 0 0 15px grey;

  .search-aside {
    display: flex;
    width: 30%;
    height: 100%;
    border-right: 2px solid $color-border-gray;
    background-color: $color-bg-gray-light;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;

    .search-aside_container {
      height: 70vh;
      margin-top: 10%;
      margin-left: 10%;
      overflow-x: auto;

      .chapter {
        font-size: 1.8rem;
        font-weight: 900;
        margin: 1.5rem 0;
      }

      .search-input {
        display: block;
        width: 100%;
        height: 50px;
        margin: 20px 0;
        padding: 0 20px;
        border: 2px solid $color-border-gray;
        border-radius: 10px;
        font-size: 1.5rem;
        font-family: "Montserrat";
      }

      .temporary-result {
        font-size: 1.5rem;
        margin: 0;
        padding-right: 5px;
        color: $color-text-gray;
      }
    }

    .clear-result {
      display: block;
      width: 15%;
      height: 30px;
      margin: 10px auto;
      border: 2px solid $color-border-gray;
      color: black;
      background-color: #e56c6c;
      border-radius: 10px;
      font-size: 1.5rem;
      font-family: "Montserrat";

      &:hover {
        background-color: $color-bg-gray-dark;
        box-shadow: 0 0 5px grey;
      }

      &:active {
        border: 1px solid $color-border-active-gray;
      }
    }
  }

  .search-main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

    .search-main_temporary {
      font-size: 1.5rem;
      color: $color-text-gray;
    }
  }
}

@media screen and (min-width: 319px) and (max-width: 600px) {
  .search {
    flex-direction: column;
    overflow: scroll;
  .search-aside {
    width: 100%;
    

    .search-aside_container {
      height: 40vh;
      .search-input {
        padding: 0px;
      }
    }
  }
}
}
</style>