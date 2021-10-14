<template>
  <div class="register">
    <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link
          to="/login"
          class="nav-link"
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
          class="nav-link active"
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
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingConfirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm Password"
          />
          <label for="floatingConfirmPassword">Confirm Password</label>
        </div>
        <button
          @click.stop.prevent="register"
          type="submit"
          class="btn btn-success"
        >
          REGISTER NOW
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import api from "../../services/api";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },

  methods: {
    register() {
      api
        .post("/users/register", {
          email: this.email,
          password: this.password,
          retypepassword: this.confirmPassword,
        })
        .then((res) => {
          this.data = res.data;
          this.$router.push("home");
        });
    },
  },
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 380px;
  border: 1px solid #b8b8b8;
  border-radius: 0.25rem;
}

.register .tab-content {
  flex-grow: 1;
}

.register .tab-content .tab-pane {
  height: 100%;
}

.register .tab-content form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 1.5rem 1.5rem 2rem;
}

.register .tab-content form button[type="submit"] {
  margin: auto;
  padding: 0.75rem 0;
  width: 50%;
}

.register .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #088308;
}

.register .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link {
  font-weight: bold;
  font-size: 1.25rem;
  color: #585858;
}
</style>
