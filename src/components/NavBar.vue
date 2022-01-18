<template>
    <div>
        <nav>
            <v-navigation-drawer color="primary" app v-model="drawer">
        <v-list-item class="px-2">
        <v-list-item-avatar color="white">
          <v-img :src="avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="white--text">Bright Issah</v-list-item-title>

  
      </v-list-item>

      <v-divider class="mt-2"></v-divider>

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
      <v-avatar size="35" color="white">
          <v-img :src="avatar"></v-img>
      </v-avatar>
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
        avatar: null
     }
  },
  methods: {
    loadAvatar() {
      this.avatar = sessionStorage.getItem("avatar");
    },
    logout() {
        sessionStorage.removeItem("Authorization");
        sessionStorage.removeItem("avatar");
        this.$router.push({ path: "/login" });
    }
  },
  mounted(){
      this.loadAvatar()
  }
};
</script>