<template>
    <div>
        <nav>
        <v-navigation-drawer color="primary" app v-model="drawer">
        <div class="d-flex flex-column align-center mt-5">
          <v-avatar color="white" size="75">
            <v-img :src="avatar"></v-img>
          </v-avatar>
          <p class="white--text subheading mt-1 mr-6">{{username}}</p>
        </div>

      <v-divider class="mt-1"></v-divider>

      <v-list dense shaped>
        <v-list-item v-for="item in items" :key="item.title" link router :to="item.route"
        >
          <v-list-item-icon>
            <v-icon dense color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text font-weight-regular">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      flat
    >
    <v-app-bar-nav-icon class="grey--text" v-on:click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">HRecord</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
       <div class="d-xs-none">
       <v-badge
          bordered
          bottom
          color="green accent-4"
          dot
          offset-x="10"
          offset-y="10"
        >
        <v-avatar size="35" color="white">
        <v-img :src="avatar"></v-img>
        </v-avatar>
      </v-badge>
      </div>
      <v-btn class="ml-2 grey--text" depressed v-on:click="logout"><span>Sign Out</span> <v-icon right>mdi-logout-variant</v-icon></v-btn>
    </v-app-bar>
        </nav>
         <router-view/>
    </div>
</template>

<script>

export default {
  name: 'Navbar',
  data () {
     return{
       drawer: false,
       items: [
          { title: 'Home', icon: 'mdi-home-city', route: '/' },
          { title: 'Providers', icon: 'mdi-account-group-outline', route: '/providers'},
          { title: 'Patients', icon: 'mdi-account-group-outline', route: '/patients' },
        ],
        avatar: null,
        username: null
     }
  },
  methods: {
    loadUserProfile() {
      this.avatar = sessionStorage.getItem("avatar");
      const user = JSON.parse(sessionStorage.getItem("user"));
      this.username = user.username
    },
    logout() {
        sessionStorage.removeItem("Authorization");
        sessionStorage.removeItem("avatar");
        this.$router.push({ path: "/login" });
    }
  },
  mounted(){
      this.loadUserProfile()
  }
};
</script>