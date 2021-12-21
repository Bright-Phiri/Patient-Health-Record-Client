<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-sm-7 col-xs-4 col-md-5 m-auto">
        <div class="card my-5 shadow-sm" style="border-radius: 10px">
          <div class="card-header">
            <h5 class="text-center text-dark">Welcome Please Sign In</h5>
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="login">
              <div class="form-group">
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  placeholder="Username"
                  v-model.trim="user.username"
                />
              </div>

              <div class="form-group pt-2">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Password"
                  v-model.trim="user.password"
                />
              </div>

              <button
                class="btn login-btn mt-2 col-12"
                type="submit"
                id="loginBtn"
              >
                Login
              </button>
              <p class="text-center mt-2">
                Dont have an Account?
                <router-link to="/signup">Create</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.login-btn {
  background-color: #14a800;
  color: white;
}

.login-btn:hover {
  color: white;
}
</style>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
      BASE_URL: "login",
    };
  },
  methods: {
    login() {
      if (!this.user.username || !this.user.password) {
        this.$swal(
          "Fields validation",
          "Please enter in all fields",
          "warning"
        );
      } else {
        let userPayload = {
          username: this.user.username,
          password: this.user.password,
        };
        let pHRsAPIEndpoint = `${sessionStorage.getItem("API_URL")}/${
          this.BASE_URL
        }`;
        axios
          .post(pHRsAPIEndpoint, userPayload)
          .then((response) => {
            if (response.data.status === "success") {
              sessionStorage.setItem("Authorization", response.data.token);
              sessionStorage.setItem("avatar", response.data.avatar);
              sessionStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
              );
              this.$swal("Message", response.data.message, "success").then(
                () => {
                  this.$router.push({ path: "/" });
                }
              );
            } else {
              this.$swal("Error", response.data.message, "error");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    sessionStorage.setItem("API_URL", "http://127.0.0.1:3000/api/v1");
  },
};
</script>
