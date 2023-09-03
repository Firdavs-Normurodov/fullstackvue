<template>
<div>
    <div class="container">
        <Navbar />
        <RouterView />
        <div class="box">

        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex';
import {
    Navbar
} from '@/components';
import {
    RouterView
} from 'vue-router'
export default {
    components: {
        Navbar
    },
    mounted() {
        this.$store.dispatch('getUser')
        // console.log('mounted')
    },
}
</script>

<style>
  
</style>
