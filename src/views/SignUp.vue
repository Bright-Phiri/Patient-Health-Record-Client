<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card my-5 shadow-sm" style="border-radius: 10px">
          <div class="card-header">
            <h5 class="text-dark text-center">Create Account</h5>
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="signUp" enctype="multipart/form-data">
              <div class="form-label-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  class="form-control"
                  placeholder="Username"
                  autofocus
                  v-model.trim="user.username"
                />
                <p class="text-danger" id="username_status"></p>
              </div>
              <div class="form-label-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control"
                  placeholder="Email address"
                  v-model.trim="user.email"
                />
                <p class="text-danger" id="email_status"></p>
              </div>
              <div class="form-label-group">
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  class="form-control"
                  v-on:change="selectFile"
                />
              </div>

              <div class="form-label-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control mt-3"
                  placeholder="Password"
                  v-model.trim="user.password"
                />
                <p class="text-danger" id="password_status"></p>
              </div>

              <div class="form-label-group">
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  class="form-control"
                  placeholder="Confirm Password"
                  v-model.trim="user.password_confirmation"
                />
                <p class="text-danger" id="confirm_password_status"></p>
              </div>
              <button
                class="btn signup-btn col-12 text-uppercase"
                type="submit"
                id="createAccountBtn"
              >
                Signup
              </button>
              <p class="text-center">
                Already have an account?
                <router-link to="/login">Sign In</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.signup-btn {
  background-color: #14a800;
  color: white;
}

.signup-btn:hover {
  color: white;
}
</style>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        username: null,
        email: null,
        avatar: null,
        password: null,
        password_confirmation: null,
      },
    };
  },
  methods: {
    selectFile(event) {
      this.user.avatar = event.target.files[0];
    },
    signUp() {
      if (
        !this.user.username ||
        !this.user.email ||
        !this.user.password ||
        !this.user.password_confirmation
      ) {
        this.$swal(
          "Fields validation",
          "Please enter in all fields",
          "warning"
        );
      } else {
        if (this.user.password === this.user.password_confirmation) {
          var userPayload = new FormData();
          userPayload.append("username", this.user.username);
          userPayload.append("email", this.user.email);
          userPayload.append("avatar", this.user.avatar);
          userPayload.append("password", this.user.password);
          userPayload.append(
            "password_confirmation",
            this.user.password_confirmation
          );
          let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/users`;
          axios
            .post(pHRsAPIEndpoint, userPayload)
            .then((response) => {
              if (response.data.status === "success") {
                this.$swal("Message", response.data.message, "success").then(
                  () => {
                    this.$router.push({ path: "/login" });
                  }
                );
              } else {
                this.$swal("Error", response.data.message, "error");
              }
            })
            .catch((error) => {
              this.$swal("Error", error + ", Couldn't reach API", "error");
            });
        } else {
          this.$swal("Error", "Passwords dont match", "error");
        }
      }
    },
  },
};
</script>
