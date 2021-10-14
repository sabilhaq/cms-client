<template>
  <div class="datadate">
    <Navbar />

    <div class="container">
      <button
        @click="showAddForm"
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

      <div v-if="isShowAddForm" class="add-form">
        <form class="row" action="">
          <div class="col-auto d-flex align-items-center">
            <label for="letter" class="letter-input fw-bold me-2">Letter</label>
            <input
              type="date"
              class="form-control"
              v-model="newLetter"
              id="newLetter"
            />
          </div>
          <div class="col-auto d-flex align-items-center">
            <label for="letter" class="letter-input fw-bold me-2"
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
              @input="searchData"
              type="date"
              class="form-control"
              v-model="searchLetter"
              id="searchLetter"
            />
          </div>
          <div class="col-auto d-flex align-items-center">
            <label for="letter" class="letter-input fw-bold me-2"
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
            <tr v-for="(item, index) in datadate" :key="item._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <span v-if="edit != item._id">{{ item.letter }}</span>

                <input
                  v-else
                  tabindex="1"
                  style="width: 160px"
                  type="date"
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
              Close
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
      message: "<p>Message</p>",
      isShowAddForm: false,
      isShowModalDelete: false,
      isEdit: false,
      edit: null,
      itemDelete: null,
      datadate: [],
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

    editItem(item) {
      this.beforeEditLetter = item.letter;
      this.beforeEditFrequency = item.frequency;
      this.edit = this.edit !== item._id ? item._id : null;
    },

    doneEdit(item) {
      this.isShowAddForm = false;
      api
        .put(
          `/datadate/${item._id}`,
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
        .then((res) => {
          console.log(res.data);
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

    showAddForm() {
      this.isShowAddForm = !this.isShowAddForm;
    },

    loadData() {
      api
        .get("/datadate", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.datadate = res.data;
        })
        .catch((err) => console.log(err));
    },

    addData() {
      this.isShowAddForm = false;
      api
        .post(
          "/datadate",
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
          console.log(res.data);
          this.datadate.push(res.data.data);
          this.newLetter = "";
          this.newFrequency = "";
          this.loadData();
        })
        .catch((err) => console.log(err));
    },

    searchData() {
      console.log(this.searchLetter);
      console.log(this.searchFrequency);
      api
        .post(
          "/datadate/search",
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
          console.log(res.data);
          this.datadate = res.data;
        })
        .catch((err) => console.log(err));
    },

    deleteData(item) {
      api
        .delete(`/datadate/${item._id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          // this.datadate = res.data;
          this.isShowModalDelete = false;
          this.loadData();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.datadate {
  position: relative;
  width: 100%;
  height: 100%;
}

.datadate .container {
  padding: 3rem 0;
}

.datadate .add-form {
  align-items: center;
  background-color: #eeeeee;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.datadate .add-form form {
  padding: 1rem;
}
</style>
