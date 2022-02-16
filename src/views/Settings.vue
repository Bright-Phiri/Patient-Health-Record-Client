<template>
  <div class="home">
    <h3 class="subheading grey--text font-weight-light">Settings</h3>
    <v-row>
      <v-col cols="12">
        <v-card shaped height="400">
          <v-card-text>
            <v-container fluid>
              <v-tabs vertical>
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
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-text-field label="Username" dense prepend-icon="person"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-text-field type="email" label="Email" dense prepend-icon="mail"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-file-input accept="image/*" show-size label="File input"></v-file-input>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-text-field type="password" label="Enter password" dense prepend-icon="lock"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn class="secondary">Cancel</v-btn>  <v-btn class="primary">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                      <v-card-title class="font-weight-light">
                      Change Password
                    </v-card-title>
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                          <v-text-field type="password" label="Enter old password" dense prepend-icon="lock"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                         <v-text-field type="password" label="New password" dense prepend-icon="lock"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="5" lg="6" sm="7" md="7">
                         <v-text-field type="password" label="Confirm password" dense prepend-icon="lock"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn class="secondary">Cancel</v-btn>  <v-btn class="primary">Save</v-btn>
                    </v-card-actions>
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
export default {
  name: "Settings",
  data() {
    return {};
  },
};
</script>
