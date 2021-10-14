<template>
  <div class="home">
    <Navbar :token="token" />

    <div class="welcome">
      <h1>Welcome, {{ email }}</h1>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {
      email: "",
      token: "",
    };
  },

  mounted() {
    this.email = localStorage.getItem("email");
    this.token = localStorage.getItem("token");
  },
};
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
}

.home nav {
  position: absolute;
  width: 100%;
}

.home .welcome {
  margin: 5rem;
  padding: 2rem;
  background: #ecebeb;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
}
.home .welcome h1 {
  font-weight: bold;
}
</style>
