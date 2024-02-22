import { createStore } from "vuex";

export default createStore({
  state: {
    employees: [],
    searchMessage: "Начните поиск",
  },
  mutations: {
    setEmployeeByID(state, newEmployee) {
      let newEmployeeInArray = state.employees.some(
        (currentEmployee) => currentEmployee["id"] === newEmployee["id"]
      );
      if (!newEmployeeInArray) {
        state.employees.push(newEmployee);
        state.searchMessage = "Результат поиска:";
      } else {
        state.searchMessage = "Сотрудник уже найден";
      }
    },
    setEmployeeByUserName(state, newEmployee) {
      let newEmployeeInArray = state.employees.some(
        (currentEmployee) =>
          currentEmployee["username"] === newEmployee[0]["username"]
      );
      if (!newEmployeeInArray) {
        state.employees.push(newEmployee[0]);
        state.searchMessage = "Результат поиска:";
      } else {
        state.searchMessage = "Сотрудник уже найден";
      }
    },
    changeSearchMessage(state) {
      state.searchMessage = "Нет данных";
    },
    removeEmployeeCard(state, userId) {
      let removeEmployeeName = state.employees.filter(
        (employee) => employee.id === userId
      )[0].username;
      state.employees = state.employees.filter(
        (employee) => employee.id !== userId
      );
      if (state.employees.length === 0) {
        state.searchMessage = "Начните поиск";
      } else {
        state.searchMessage = `Сотрудник ${removeEmployeeName} удален`;
      }
    },
    clearSearchResult(state) {
      state.employees = [];
      state.searchMessage = "Результаты поиска очищены";
    },
  },
  actions: {
    async searchEmployeeByID(store, employeeID) {
      await fetch(`https://jsonplaceholder.typicode.com/users/${employeeID}`)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error(`Сотрудника с ID: "${employeeID}" не существует`);
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
              `Сотрудника с именем: "${employeeUserName}" не существует`
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