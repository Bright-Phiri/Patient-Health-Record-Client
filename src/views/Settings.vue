<template>
  <div class="home">
    <h3 class="subheading grey--text font-weight-light">Settings</h3>
    <v-row>
      <v-col cols="12">
        <v-card shaped height="470">
          <v-card-text>
            <v-container fluid>
              <v-tabs>
                <v-tab>
                  <v-icon left> mdi-account </v-icon>
                  User Info
                </v-tab>
                <v-tab>
                  <v-icon left> mdi-lock </v-icon>
                  Password
                </v-tab>
                <v-tab-item>
                  <v-card flat>
                    <v-card-title class="font-weight-light">
                      Update User Info
                    </v-card-title>
                    <v-card-text>
                      <v-form v-on:submit.prevent="updateUser">
                        <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-text-field v-model.trim="user.username" label="Username" dense prepend-icon="person"></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-text-field type="email" v-model.trim="user.email" label="Email" dense prepend-icon="mail"></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-file-input accept="image/*" show-size label="Avatar" v-on:change="selectFile" v-model="user.avatar"></v-file-input>
                        </v-col>
                        </v-row>
                        <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-text-field type="password" v-model.trim="user.password" label="Enter password" dense prepend-icon="lock"></v-text-field>
                        </v-col>
                        </v-row>
                        <v-btn class="secondary">Cancel</v-btn>  <v-btn type="submit" class="primary">Save</v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                      <v-card-title class="font-weight-light">
                      Change Password
                    </v-card-title>
                    <v-card-text>
                      <v-form ref="passwordForm" v-on:submit.prevent="changePassword">
                        <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-text-field type="password" v-model.trim="user.oldPassword" label="Enter old password" dense prepend-icon="lock"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                         <v-text-field type="password" v-model.trim="user.newPassword" label="New password" dense prepend-icon="lock"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                         <v-text-field type="password" v-model.trim="user.confirmPassword" label="Confirm new password" dense prepend-icon="lock"></v-text-field>
                        </v-col>
                      </v-row>
                       <v-btn class="secondary">Cancel</v-btn>  <v-btn type="submit" class="primary">Save</v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Settings",
  data() {
    return {
      user: {
        username: null,
        email: null,
        avatar: null,
        password: null,
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
      }
    };
  },
  methods:{
    selectFile(files) {
      this.user.avatar = files;
    },
    updateUser(){
      if (!this.user.username || !this.user.email || !this.user.avatar || !this.user.password){
        this.$swal("Fields validation","Please fill in all required fields","warning");
      } else{
         let pass = sessionStorage.getItem("temp_pass")
         const user = JSON.parse(sessionStorage.getItem("user"));
         if (pass === this.user.password){
            var userPayload = new FormData();
            userPayload.append("username", this.user.username);
            userPayload.append("email", this.user.email);
            userPayload.append("avatar", this.user.avatar);
            userPayload.append("password", this.user.password);
            userPayload.append("password_confirmation",this.user.password);
            let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/users/${user.id}`;
            axios
               .put(pHRsAPIEndpoint,userPayload, {
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
                    },
               })
               .then((response)=>{
                 this.$swal("Message", response.data.message, "success")
               })
               .catch((error)=>{
                 this.$swal("Error", error + ", Couldn't reach API", "error");
               })
         }else{
           this.$swal("Error","Old password is incorrect","error");
         }
      }
    },
    changePassword(){
       if (!this.user.oldPassword || !this.user.newPassword || !this.user.confirmPassword){
        this.$swal("Fields validation","Please fill in all required fields","warning");
       }
    },
    setUser(){
      const user = JSON.parse(sessionStorage.getItem("user"));
      let avatar = sessionStorage.getItem("avatar")
      this.user.username = user.username
      this.user.email = user.email
      this.user.avatar = avatar
      
    }
  },
  mounted(){
    this.setUser()
  }
};
</script>
