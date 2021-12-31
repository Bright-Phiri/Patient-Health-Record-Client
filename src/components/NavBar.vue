<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"
        ><img src="../assets/logo1.png" alt height="40" width="40"
      ></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/addpatient" class="nav-link"
              >Add Patient</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/viewpatients" class="nav-link"
              >Patients</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/viewproviders" class="nav-link"
              >Providers</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <img
              v-bind:src="avatar"
              alt
              height="40"
              width="40"
              class="rounded-circle border text-center"
              id="avatar"
            />
            &nbsp;
          </li>
          <li class="nav-item">
            <button
              class="btn text-white"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
              style="margin-right: 15px; margin-left: -10px"
            >
              Logout <i class="fa fa-sign-out fa-1x"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      aria-labelledby="logoutModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-success">Logout</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="text-dark">Are you sure you want to logout?</p>
          </div>
          <div class="modal-footer">
            <form>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                id="close"
              >
                Close
              </button>
              &nbsp;
              <button v-on:click="logOut" type="submit" class="btn btn-success">
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-brand {
  margin-left: 30px;
}

.navbar {
  background-color: #1d4354;
  color: #fff;
}

#nav {
  padding: 30px;
}

.navbar a {
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      avatar: "",
    };
  },
  methods: {
    loadImage() {
      this.avatar = sessionStorage.getItem("avatar");
    },

    logOut() {
      sessionStorage.removeItem("Authorization");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("avatar");
      document.getElementById("close").click();
      this.$router.push({ path: "/login" });
    },
  },
  mounted() {
    this.loadImage();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
