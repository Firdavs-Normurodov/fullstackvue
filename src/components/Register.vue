<template>
<div>
  <main class="form-signin w-25 m-auto mt-5">
    <form>
      <img :src="logo" @click="toHomeHandler" alt="" style="width: 100px;">
      <ValidationError v-if="validationErrors" :validationErrors="validationErrors"/>
      <h1 class="h3 mb-3 fw-normal mt-3">Register</h1>
      <Input :label="'Name'" :type="'text'" v-model="username"/>
      <Input :label="'Email address'" :type="'email'" v-model="email"/>
      <Input :label="'Password'" :type="'password'" v-model="password"/>
      <Button type="submit" :disabled="isLoading" @click="submitHandler">Register</Button>
    </form>
  </main>
</div>
</template>

<script>
import {mapState}from'vuex'

import {
  logo
} from '@/contstans';
import ValidationError from"@/components/ValidationError.vue"
export default {
  data() {
    return {
      logo,
      username:'',
      email:'',
      password:''
    }
  },
  components:{
    ValidationError
  },
  //1-usul
  // computed:{
  //   isLoading(){
  //     return this.$store.state.auth.isLoading
  //   },
  //   validationErrors(){
  //     return this.$store.state.auth.errors
  //   }
  // },
  //2 -usul professiolnal usul
  computed:{
    ...mapState({
      isLoading:state=>state.auth.isLoading,
      validationErrors:state=>state.auth.errors
    })
  },
  methods:{
    submitHandler(e){
      e.preventDefault();
      const data={
        username:this.username,
        email:this.email,
        password:this.password
      }
      this.$store.dispatch("register",data)
      .then(user=>{
        console.log("USER",user)
        this.$router.push({name:'home'})
      })
      .catch(err=>console.log("ERROR",err))
    }
  }

}
</script>

<style>

</style>
