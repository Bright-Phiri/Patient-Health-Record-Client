<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col class="col=xl-4 col-lg-4 col-sm-7 col-xs-6 col-md-5">
                <div class="text-center">
                     <v-avatar size="90" class="text-center">
                        <v-img src="../assets/logo.jpg"></v-img>
                    </v-avatar>
                </div>
                <p class="text-center font-weight-light">Sign up to HealthRecord</p> 
                <v-card>
                    <v-card-text>
                      <v-form ref="form" v-on:submit.prevent="signUp" enctype="multipart/form-data">
                           <v-text-field label="Username" autocomplete="false" prepend-icon="person" v-model.trim="user.username"></v-text-field>
                           <v-text-field label="Email" autocomplete="false" prepend-icon="mail" v-model.trim="user.email"></v-text-field>
                           <v-file-input accept="image/*" show-size label="Avatar" v-on:change="selectFile"></v-file-input>
                           <v-text-field label="Password" autocomplete="false" prepend-icon="lock" type="password" v-model.trim="user.password"></v-text-field>
                           <v-text-field label="Password Confirmation" autocomplete="false" prepend-icon="lock" type="password"  v-model.trim="user.password_confirmation"></v-text-field>
                           <v-btn type="submit" dark color="primary" block :loading="loading">Sign up</v-btn>
                      </v-form>
                    </v-card-text>
                </v-card> 
                <v-card class="mt-2">
                    <v-card-text>
                      Already have an account? <router-link to="/login" >Sign in.</router-link> 
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
   data () {
       return {
         user: {
            username: null,
            email: null,
            avatar: null,
            password: null,
            password_confirmation: null,
         },
         loading: false,
       }
   },
   methods: {
      selectFile(files) {
        this.user.avatar = files;
      },
      signUp() {
      if (!this.user.username || !this.user.email || !this.user.password || !this.user.password_confirmation) {
        this.$swal("Fields validation", "Please fill in all required fields", "warning");
      } else {
        this.loading = true
        if (this.user.password === this.user.password_confirmation) {
          var userPayload = new FormData();
          userPayload.append("username", this.user.username);
          userPayload.append("email", this.user.email);
          userPayload.append("avatar", this.user.avatar);
          userPayload.append("password", this.user.password);
          userPayload.append("password_confirmation",this.user.password_confirmation);
          let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/users`;
          axios
            .post(pHRsAPIEndpoint, userPayload)
            .then((response) => {
              if (response.data.status === "success") {
                this.loading = false
                this.$swal("Message", response.data.message, "success").then(
                  () => {
                    this.$router.push({ path: "/login" });
                  }
                );
              } else {
                this.$swal("Error", response.data.message+", "+response.data.error+" ", "error");
                this.loading = false
              }
            })
            .catch((error) => {
              this.$swal("Error", error + ", Couldn't reach API", "error");
              this.loading = false
            });
        } else {
          this.$swal("Error", "Passwords dont match", "error");
        }
      }
    }
   },
   mounted() {
    sessionStorage.setItem("BASE_URL","https://patienthealthrecordapi.herokuapp.com/api/v1");
  },
}
</script>