<template>
  <div class="login">
    <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link
          to="/login"
          class="nav-link active"
          id="login-tab"
          data-bs-toggle="tab"
          data-bs-target="#login"
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
          data-bs-toggle="tab"
          data-bs-target="#register"
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
        <form>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button type="submit" class="btn btn-primary">LOG IN</button>
        </form>
      </div>

      <div
        class="tab-pane fade"
        id="register"
        role="tabpanel"
        aria-labelledby="register-tab"
      >
        ...
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      title: "Login",
    };
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
