<template>
  <div id="list">
    <md-button @click="getList()">Refresh List</md-button>
    <div>
      <md-radio v-model="filter.type" id="radioTypeAll" name="radioType" md-value="all">All</md-radio>
      <md-radio v-model="filter.type" id="radioTypeOffer" name="radioType" md-value="offer">Offers</md-radio>
      <md-radio v-model="filter.type" id="radioTypeDemand" name="radioType" md-value="demand">Demands</md-radio>
    </div>
    <md-table @sort="onSort">
      <md-table-header>
        <md-table-row>
          <md-table-head md-sort-by="type">Type</md-table-head>
          <md-table-head>Matched</md-table-head>
          <md-table-head md-sort-by="from">From</md-table-head>
          <md-table-head md-sort-by="to">To</md-table-head>
          <md-table-head md-sort-by="date">Date</md-table-head>
          <md-table-head md-sort-by="from_acc">Provider</md-table-head>
          <md-table-head md-sort-by="capacity">Capacity</md-table-head>
          <md-table-head md-sort-by="travel_time">Travel Time</md-table-head>
          <md-table-head md-sort-by="price">Price</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="item in displayItems" :key="item.signature" :class="{ highlight: item.isHighlighted }">
          <md-table-cell>{{item.data.type}}</md-table-cell>
          <md-table-cell><md-button @click="highlightMatches(item)">{{item.matches.length > 0 ? item.matches.length : 'no'}}</md-button></md-table-cell>
          <md-table-cell>{{item.data.from}}</md-table-cell>
          <md-table-cell>{{item.data.to}}</md-table-cell>
          <md-table-cell>{{item.data.date | humanDate}}</md-table-cell>
          <md-table-cell>{{item.data.from_acc | startAndEnd(3, 3)}}</md-table-cell>
          <md-table-cell>{{item.data.capacity}}</md-table-cell>
          <md-table-cell>{{item.data.travel_time}}</md-table-cell>
          <md-table-cell>{{item.data.price}}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <md-button @click="getList()">Refresh List</md-button>
  </div>
</template>

<script>
import api from './api'
import moment from 'moment'

export default {
  name: 'list',
  data () {
    return {
      filter: {
        type: 'all'
      },
      sort: {
        name: 'date',
        type: 'asc'
      },
      items: [],
      matchedItems: []
    }
  },
  filters: {
    startAndEnd (str, start = 6, end = 6) {
      return str.substr(0, start + 2) +
        '…' +
        str.substr(str.length - end, str.length)
    },
    humanDate (input) {
      return moment(input * 1000).format('DD.MM.YYYY HH:mm')
    }
  },
  computed: {
    displayItems () {
      // filter the list
      let filtered = this.items.filter((item) => {
        if (!item.data.type) {
          return false
        }
        if (this.filter.type === 'all') {
          return true
        }
        return item.data.type === this.filter.type
      })
      // sort the list
      filtered.sort((a, b) => {
        if (a.data[this.sort.name] < b.data[this.sort.name]) {
          return this.sort.type === 'asc' ? -1 : 1
        }
        if (a.data[this.sort.name] > b.data[this.sort.name]) {
          return this.sort.type === 'asc' ? 1 : -1
        }

        return 0
      })

      filtered.forEach(item => {
        item.matches = this.findMatches(item)
      })

      filtered.forEach(item => {
        item.isHighlighted = false
        this.matchedItems.forEach(matchItem => {
          if (item.hash === matchItem.data.demand_hash || item.hash === matchItem.data.offer_hash) {
            item.isHighlighted = true
          }
        })
      })

      return filtered
    },
    matchItems () {
      return this.items.filter((item) => {
        return !item.data.type && item.data.to_acc
      })
    }
  },
  methods: {
    highlightMatches (item) {
      this.matchedItems = item.matches
    },
    findMatches (item) {
      if (item.data.type === 'offer') {
        return this.matchItems.filter((matchItem) => {
          return matchItem.data.offer_hash === item.hash
        })
      } else if (item.data.type === 'demand') {
        return this.matchItems.filter((matchItem) => {
          return matchItem.data.demand_hash === item.hash
        })
      }
      return []
    },
    onSort (sort) {
      this.sort.name = sort.name
      this.sort.type = sort.type
    },
    getList () {
      api.getMarket()
        .then((response) => {
          if (response.data) {
            this.items = response.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    shortAccount (input) {
      return input
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style>
#list {
  padding: 15px;
}

tr.highlight {
  background-color: #5998C5;
}
</style>
