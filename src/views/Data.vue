<template>
  <div class="data">
    <Navbar />

    <div class="container">
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
          />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </symbol>
      </svg>

      <div
        v-if="isShowAlert"
        class="alert alert-dismissible fade show d-flex align-items-center"
        :class="[alertType]"
        role="alert"
      >
        <svg
          class="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Success:"
        >
          <use :xlink:href="iconAlert" />
        </svg>
        <div>Data {{ alertMessage }}</div>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click.stop.prevent="toggleAlert"
        ></button>
      </div>

      <button
        @click="toggleShowAddForm"
        type="button"
        class="btn btn-primary mb-3 d-flex align-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-plus"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Add</span>
      </button>

      <div v-if="isShowAddForm" class="add-form mb-3">
        <form class="row" action="">
          <div class="col-auto d-flex align-items-center">
            <label for="letter" class="letter-input fw-bold me-2">Letter</label>
            <input
              type="text"
              class="form-control"
              v-model="newLetter"
              id="newLetter"
            />
          </div>
          <div class="col-auto d-flex align-items-center">
            <label for="frequency" class="frequency-input fw-bold me-2"
              >Frequency</label
            >
            <input
              type="number"
              step="any"
              class="form-control"
              v-model="newFrequency"
              id="newFrequency"
              v-on:keyup.enter="addData"
            />
          </div>
          <div class="col-auto d-flex align-items-center">
            <button @click="addData" type="button" class="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>

      <div class="search">
        <h1>Search</h1>
        <hr />
        <form class="row mb-3" action="">
          <div class="col-auto d-flex align-items-center">
            <label for="letter" class="letter-input fw-bold me-2">Letter</label>
            <input
              @keyup="searchData"
              type="text"
              class="form-control"
              v-model="searchLetter"
              id="searchLetter"
            />
          </div>
          <div class="col-auto d-flex align-items-center">
            <label for="frequency" class="frequency-input fw-bold me-2"
              >Frequency</label
            >
            <input
              @keyup="searchData"
              type="number"
              step="any"
              class="form-control"
              v-model="searchFrequency"
              id="searchFrequency"
            />
          </div>
        </form>
      </div>
      <div class="table-data">
        <table class="table table-striped table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Letter</th>
              <th scope="col">Frequency</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <span v-if="edit != item._id">{{ item.letter }}</span>

                <input
                  v-else
                  tabindex="1"
                  style="width: 50px"
                  type="text"
                  id="inputEditLetter"
                  class="form-control"
                  v-model="item.letter"
                  @keyup.enter="doneEdit(item)"
                  @keyup.esc="cancelEdit(item)"
                />
              </td>
              <td>
                <span v-if="edit != item._id">{{ item.frequency }}</span>

                <input
                  v-else
                  tabindex="2"
                  style="width: 100px"
                  type="text"
                  id="inputEditFrequency"
                  class="form-control"
                  v-model="item.frequency"
                  @keyup.enter="doneEdit(item)"
                  @keyup.esc="cancelEdit(item)"
                />
              </td>
              <td v-if="edit != item._id">
                <button
                  @click="editItem(item)"
                  type="button"
                  class="btn btn-success me-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-pencil"
                    width="20"
                    height="20"
                    viewBox="0 2 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"
                    ></path>
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                  </svg>
                  <span>Update</span>
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="showModalDelete(item)"
                  type="button"
                  class="btn btn-danger"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-trash"
                    width="20"
                    height="20"
                    viewBox="0 2 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="4" y1="7" x2="20" y2="7"></line>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                    <path
                      d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                    ></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                  </svg>
                  <span>Delete</span>
                </button>
              </td>

              <td v-else>
                <button
                  @click="doneEdit(item)"
                  type="button"
                  class="btn btn-primary me-1"
                >
                  Save
                </button>
                <button
                  @click="cancelEdit(item)"
                  type="button"
                  class="btn btn-secondary"
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Data</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this data?</p>
            <p>Letter: {{ itemDelete ? itemDelete.letter : "" }}</p>
            <p>Frequency: {{ itemDelete ? itemDelete.frequency : "" }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              @click="deleteData(itemDelete)"
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Data",
  components: {
    Navbar,
  },
  data() {
    return {
      editedItem: null,
      token: "",
      newLetter: "",
      newFrequency: "",
      searchLetter: "",
      searchFrequency: "",
      beforeEditLetter: "",
      beforeEditFrequency: "",
      editLetter: "",
      editFrequency: "",
      alertMessage: "",
      alertType: "",
      iconAlert: "#",
      message: "<p>Message</p>",
      isShowAddForm: false,
      isShowModalDelete: false,
      isShowAlert: false,
      isEdit: false,
      edit: null,
      itemDelete: null,
      data: [],
    };
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.loadData();
  },

  methods: {
    showModalDelete(item) {
      this.isShowModalDelete = true;
      this.itemDelete = item;
    },

    toggleShowAddForm() {
      this.isShowAddForm = !this.isShowAddForm;
    },

    toggleAlert() {
      this.isShowAlert = !this.isShowAlert;
    },

    editItem(item) {
      this.beforeEditLetter = item.letter;
      this.beforeEditFrequency = item.frequency;
      this.edit = this.edit !== item._id ? item._id : null;
    },

    doneEdit(item) {
      this.isShowAddForm = false;
      api
        .put(
          `/data/${item._id}`,
          {
            letter: item.letter,
            frequency: item.frequency,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          this.edit = this.edit !== item._id ? item._id : null;
          this.loadData();
        })
        .catch((err) => console.log(err));
    },

    cancelEdit(item) {
      item.letter = this.beforeEditLetter;
      item.frequency = this.beforeEditFrequency;
      this.edit = this.edit !== item._id ? item._id : null;
    },

    loadData() {
      api
        .get("/data", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => console.log(err));
    },

    addData() {
      this.isShowAddForm = false;
      api
        .post(
          "/data",
          {
            letter: this.newLetter,
            frequency: this.newFrequency,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((res) => {
          this.data.push(res.data.data);
          this.newLetter = "";
          this.newFrequency = "";
          this.alertType = "alert-success";
          this.alertMessage = "Added";
          this.iconAlert = "#check-circle-fill";
          this.isShowAlert = true;
          this.loadData();
        })
        .catch((err) => {
          this.newLetter = "";
          this.newFrequency = "";
          this.alertType = "alert-danger";
          this.alertMessage = "Add Failed";
          this.iconAlert = "#exclamation-triangle-fill";
          this.isShowAlert = true;
          console.log(err);
        });
    },

    searchData() {
      api
        .post(
          "/data/search",
          {
            letter: this.searchLetter,
            frequency: this.searchFrequency,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => console.log(err));
    },

    deleteData(item) {
      api
        .delete(`/data/${item._id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(() => {
          this.isShowModalDelete = false;
          this.loadData();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.data {
  position: relative;
  width: 100%;
  height: 100%;
}

.data .container {
  padding: 3rem 0;
}

.data .add-form {
  align-items: center;
  background-color: #eeeeee;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.data .add-form form {
  padding: 1rem;
}
</style>
