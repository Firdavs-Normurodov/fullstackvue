<template>
<div class="d-flex flex-column flex-md-row align-items-center py-3 mb-4 border-bottom">
  <a @click="toHomeHandler" class="d-flex align-items-center link-body-emphasis text-decoration-none">
    <!-- <h3 class="logo__text">Firdavs</h3> -->
    <img :src="logo" @click="toHomeHandler" alt="" style="width: 100px;">
  </a>

  <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
    <template v-if="isLogged">
      <RouterLink class="me-3 py-2 link-body-emphasis text-decoration-none" :to="{name:'home'}">
        {{ currentUser.username }}
      </RouterLink>
      <a href="#" @click="logout" class="me-3 py-2 link-body-emphasis text-decoration-none">
        Logout
      </a>
    </template>
    <template v-if="isAnonymous">
      <RouterLink class="me-3 py-2 link-body-emphasis text-decoration-none" :to="{name:'login'}">Login</RouterLink>
      <RouterLink class="me-3 py-2 link-body-emphasis text-decoration-none" :to="{name:'regester'}">Regester</RouterLink>
    </template>
  </nav>
</div>
</template>

<script>
import {
  mapGetters
} from "vuex"
import {
  gettersTypes
} from "@/modules/types"
import {
  logo
} from '@/contstans';
export default {
  data() {
    return {
      logo
    }
  },
  computed: {
    //2-usul
    ...mapGetters({
      currentUser: gettersTypes.currentUser,
      isLogged: gettersTypes.isLogged,
      isAnonymous: gettersTypes.isAnonymous
    })
    //1-usul
    // currentUser(){
    //   return this.$store.getters[gettersTypes.currentUser]
    // },
    // isLogged(){
    //   return this.$store.getters[gettersTypes.isLogged]
    // },
    // isAnonymous(){
    //   return this.$store.getters[gettersTypes.isAnonymous]
    // }
  },
  methods: {
    toHomeHandler() {
      return this.$router.push({
        name: 'home'
      })
    },
    logout() {
      return this.$store.dispatch('logout')
    },
  },
}
</script>

<style scoped>
.logo__text {
  outline: 2px solid #000;
  padding: 0.2rem 0.2rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
