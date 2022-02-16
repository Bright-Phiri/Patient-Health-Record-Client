<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="6" xs="12" md="4" lg="3">
                <div class="text-center">
                     <v-avatar size="90" class="text-center">
                        <v-img src="../assets/logo.jpg"></v-img>
                    </v-avatar>
                </div>
                <p class="text-center font-weight-light">Sign in to HealthRecord</p> 
                <v-card>
                    <v-card-text>
                      <v-form v-on:submit.prevent="signIn">
                           <v-text-field label="Username" autocomplete="false" prepend-icon="person" v-model.trim="user.username"></v-text-field>
                           <v-text-field label="Password" autocomplete="false" prepend-icon="mdi-lock-open" type="password" v-model.trim="user.password"></v-text-field>
                           <v-btn type="submit" dark color="primary" block :loading="loading">Sign in</v-btn>
                      </v-form>
                    </v-card-text>
                </v-card> 
                <v-card class="mt-2">
                    <v-card-text>
                      New to HRecord? <router-link to="/signup" >Create an account.</router-link> 
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
             password: null
         },
         loading: false,
       }
   },
   methods: {
      signIn(){
          if(!this.user.username || !this.user.password){
            this.$swal("Fields validation", "Please fill in all required fields", "warning")
          }else{
            this.loading = true
            let userPayload = {
                username: this.user.username,
                password: this.user.password
            }
            let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/login`;
            axios
               .post(pHRsAPIEndpoint,userPayload)
               .then(response=>{
                   if (response.data.status === "success"){
                       sessionStorage.setItem("Authorization", response.data.token);
                       sessionStorage.setItem("avatar", response.data.avatar);
                       sessionStorage.setItem("user",JSON.stringify(response.data.user));
                       this.$router.push({path: '/'})
                       this.loading = false
                   } else {
                       this.$swal(response.data.status, response.data.message, response.data.status)
                       this.loading = false
                   }
               })
               .catch(error=>{
                 this.$swal("Error", error + ", Couldn't reach API", "error")
                 this.loading = false
               })
          }
       }
   },
   mounted() {
    sessionStorage.setItem("BASE_URL", "https://patienthealthrecordapi.herokuapp.com/api/v1");
  },
}
</script>