<template>
  <v-layout>
    <v-flex class="text-center">
      <h1>Pixela Web UI</h1>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <a
            :href="`${urlGraphSVGDiff}.html`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>Vital Warmth Diff</h2>
            <img
              :src="urlGraphSVGDiff + '#svgView(viewBox(480, 0, 720, 135))'"
              alt="peaceiris vital warmth difference between current and nomal"
              class="pixela-graph-wrap"
            />
          </a>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <a
            :href="`${urlGraphSVGActual}.html`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>Vital Warmth Actual</h2>
            <img
              :src="urlGraphSVGActual + '#svgView(viewBox(480, 0, 720, 135))'"
              alt="peaceiris actual vital warmth"
              class="pixela-graph-wrap"
            />
          </a>
        </v-col>
      </v-row>

      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="token"
                :append-icon="token ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                type="password"
                name="input-10-2"
                label="Token"
                hint="Your Pixela Token Here"
                value=""
                class="input-group--focused"
                @click:append="token = !token"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="nomal"
                label="Normal Temperature"
                hint="Your Normal Temperature Here"
                :rules="[rules.required]"
                type="number"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="selected"
                :items="items"
                label="Current Temperature"
                hint="Your Current Temperature Here"
                menu-props="auto"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-btn
                color="primary"
                rounded
                @click="
                  createPixel(username, graph1, selected - nomal)
                  createPixel(username, graph2, selected)
                "
              >
                Submit Today
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              {{ response }}
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-btn
                color="red"
                rounded
                @click="
                  deletePixel(username, graph1)
                  deletePixel(username, graph2)
                "
              >
                Delete Today
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

const nomalTemp = 36.9
const urlUserGraphs = 'https://pixe.la/v1/users/peaceiris/graphs'
const urlGraphSVGDiff = `${urlUserGraphs}/vital-warmth`
const urlGraphSVGActual = `${urlUserGraphs}/vital-warmth-act`

function getTempItems() {
  const items = []

  for (let i = 0; i < 50; i++) {
    const j = (i * 0.1 + 35.5).toFixed(1)
    items.push(`${j}`)
  }
  return items
}

function formatDate(date, format) {
  format = format.replace(/yyyy/g, date.getFullYear())
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
  return format
}

export default {
  data() {
    return {
      username: 'peaceiris',
      token: '',
      graph1: 'vital-warmth',
      graph2: 'vital-warmth-act',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 50 || 'Min 50 characters'
      },
      nomal: `${nomalTemp}`,
      selected: `${nomalTemp}`,
      items: getTempItems(),
      response: '',
      urlGraphSVGDiff,
      urlGraphSVGActual
    }
  },
  methods: {
    createPixel(username, graph, pixel) {
      let url = ''
      if (process.env.NODE_ENV === 'production') {
        url = `https://pixe.la/v1/users/${username}/graphs/${graph}`
      } else {
        url = `/api-pixela/v1/users/${username}/graphs/${graph}`
      }
      const date = new Date()
      const content = {
        date: `${formatDate(date, 'yyyyMMdd')}`,
        quantity: `${pixel}`
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-USER-TOKEN': `${this.token}`
        },
        data: content,
        url
      }
      axios(options)
        .then((response) => {
          this.response = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    deletePixel(username, graph) {
      const date = new Date()
      const today = `${formatDate(date, 'yyyyMMdd')}`
      let url = ''
      if (process.env.NODE_ENV === 'production') {
        url = `https://pixe.la/v1/users/${username}/graphs/${graph}/${today}`
      } else {
        url = `/api-pixela/v1/users/${username}/graphs/${graph}/${today}`
      }
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-USER-TOKEN': `${this.token}`
        },
        url
      }
      axios(options)
        .then((response) => {
          this.response = response.data
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>

<style scoped>
.pixela-graph-wrap {
  width: 300%;
}
</style>
