<template>
  <div id="app">
    <md-toolbar>

      <h2 class="md-title" style="flex: 1">Travel Mæker</h2>

      <md-button @click="goTo('/list')">List</md-button>
      <md-button @click="goTo('/add')">Add</md-button>
    </md-toolbar>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    goTo (target) {
      this.$router.push(target)
    }
  }
}
</script>

<style>
</style>
