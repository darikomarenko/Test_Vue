import { createStore } from "vuex";

export default createStore({
  state: {
    employees: [],
    searchMessage: "начните поиск",
  },
  mutations: {
    setEmployeeByID(state, newEmployee) {
      let newEmployeeInArray = state.employees.some(
        (currentEmployee) => currentEmployee["id"] === newEmployee["id"]
      );
      if (!newEmployeeInArray) {
        state.employees.push(newEmployee);
        state.searchMessage = "результат добавлен ниже";
      } else {
        state.searchMessage = "сотрудник уже показан ниже";
      }
    },
    setEmployeeByUserName(state, newEmployee) {
      let newEmployeeInArray = state.employees.some(
        (currentEmployee) =>
          currentEmployee["username"] === newEmployee[0]["username"]
      );
      if (!newEmployeeInArray) {
        state.employees.push(newEmployee[0]);
        state.searchMessage = "результат добавлен ниже";
      } else {
        state.searchMessage = "сотрудник уже показан ниже";
      }
    },
    changeSearchMessage(state) {
      state.searchMessage = "ничего не найдено";
    },
    removeEmployeeCard(state, userId) {
      let removeEmployeeName = state.employees.filter(
        (employee) => employee.id === userId
      )[0].username;
      state.employees = state.employees.filter(
        (employee) => employee.id !== userId
      );
      if (state.employees.length === 0) {
        state.searchMessage = "начните поиск";
      } else {
        state.searchMessage = `сотрудник ${removeEmployeeName} удален`;
      }
    },
    clearSearchResult(state) {
      state.employees = [];
      state.searchMessage = "результаты поиска очищены";
    },
  },
  actions: {
    async searchEmployeeByID(store, employeeID) {
      await fetch(`https://jsonplaceholder.typicode.com/users/${employeeID}`)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error(`сотрудника с ID: "${employeeID}" не существует`);
          } else {
            return response.json();
          }
        })
        .then((newEmployee) => store.commit("setEmployeeByID", newEmployee))
        .catch((error) => {
          console.warn(`${error.message}`);
          store.commit("changeSearchMessage");
        });
    },
    async searchEmployeeByUserName(store, employeeUserName) {
      await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${employeeUserName}`
      )
        .then((response) => response.json())
        .then((newEmployee) => {
          if (newEmployee.length === 0) {
            throw new Error(
              `сотрудника с именем: "${employeeUserName}" не существует`
            );
          } else {
            store.commit("setEmployeeByUserName", newEmployee);
          }
        })
        .catch((error) => {
          console.warn(`${error.message}`);
          store.commit("changeSearchMessage");
        });
    },
    removeEmployeeCard(store, userId) {
      store.commit("removeEmployeeCard", userId);
    },
    clearSearchResult(store) {
      store.commit("clearSearchResult");
    },
  },
  strict: process.env.NODE_ENV !== "production",
});