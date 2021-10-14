<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Content Management System</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/data">Data</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/dataDate">Data Date</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/maps">Maps</a>
          </li>
        </ul>
        <form class="d-flex">
          <button
            @click.stop.prevent="logout"
            class="btn btn-outline-danger"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import api from "../../services/api";

export default {
  name: "Navbar",
  props: {
    token: String
  },
  data() {
    return {
    };
  },

  mounted() {
  },

  methods: {
    logout() {
      api
        .get("/users/destroy", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("token");
          this.$router.push({ path: "/" });
        });
    },
  },
};
</script>

<style>

</style>