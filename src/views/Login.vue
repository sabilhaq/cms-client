<template>
  <div class="login">
    <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link
          to="/login"
          class="nav-link active"
          id="login-tab"
          type="button"
          role="tab"
          aria-controls="login"
          aria-selected="true"
        >
          Login
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          to="/register"
          class="nav-link"
          id="register-tab"
          type="button"
          role="tab"
          aria-controls="register"
          aria-selected="false"
        >
          Register
        </router-link>
      </li>
    </ul>

    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="login"
        role="tabpanel"
        aria-labelledby="login-tab"
      >
        <form id="login-form" action="/api/users/login" method="post">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              v-model="email"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              v-model="password"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button
            @click.stop.prevent="login"
            type="submit"
            class="btn btn-primary"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>

    <div
      v-if="showAlert"
      class="
        failed-login
        alert alert-danger
        d-flex
        align-items-center
        alert-dismissible
        fade
        show
      "
      role="alert"
    >
      <svg
        class="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Danger:"
      >
        <use xlink:href="#exclamation-triangle-fill" />
      </svg>
      <div>Invalid email or password</div>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="setAlert"
      ></button>
    </div>
  </div>
</template>
<script>
import api from "../../services/api";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showAlert: false,
    };
  },

  methods: {
    setAlert() {
      this.showAlert = false;
    },
    login() {
      api
        .post("/users/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("email", res.data.data.email);
          localStorage.setItem("token", res.data.token);
          this.$router.push("home");
        })
        .catch((err) => {
          this.showAlert = true;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 300px;
  border: 1px solid #b8b8b8;
  border-radius: 0.25rem;
}

.login .tab-content {
  flex-grow: 1;
}

.login .tab-content .tab-pane {
  height: 100%;
}

.login .tab-content form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 1.5rem 1.5rem 2rem;
}

.login .tab-content form button[type="submit"] {
  margin: auto;
  padding: 0.75rem 0;
  width: 50%;
}

.login .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #088308;
}

.login .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link {
  font-weight: bold;
  font-size: 1.25rem;
  color: #585858;
}
</style>
