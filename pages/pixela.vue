<template>
  <v-layout>
    <v-flex class="text-center">
      <h1>Pixela Web UI</h1>
      <a
        href="https://pixe.la/v1/users/peaceiris/graphs/vital-warmth.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vital Warmth
        <img
          src="https://pixe.la/v1/users/peaceiris/graphs/vital-warmth"
          alt="peaceiris Vital Warmth"
        />
      </a>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="pixela-username" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :append-icon="token ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="'password'"
                name="input-10-2"
                label="pixela-token"
                hint="Your Pixela Token Here"
                value=""
                class="input-group--focused"
                @click:append="token = !token"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Normal Temperature"
                hint="Your Normal Temperature Here"
                :value="nomal"
                :rules="[rules.required]"
                :type="'number'"
                @change="setNomal"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="defaultSelected"
                :items="items"
                item-text="label"
                item-value="value"
                label="Current Temperature"
                hint="Your Current Temperature Here"
                menu-props="auto"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
const nomalTemp = 36.9

function getTempItems() {
  const items = []

  for (let i = 0; i < 50; i++) {
    const j = (i * 0.1 + 35.5).toFixed(1)
    items.push({label: `${j}`, value: `${j}`})
  }
  return items
}

export default {
  data() {
    return {
      token: false,
      password: 'Password',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 50 || 'Min 50 characters'
      },
      nomal: `${nomalTemp}`,
      defaultSelected: {label: `${nomalTemp}`, value: `${nomalTemp}`},
      items: getTempItems()
    }
  },
  methods: {
    setNomal(nomal) {
      this.nomal = nomal
    }
  }
}
</script>
