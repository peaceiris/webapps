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
              <v-text-field label="Username" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :append-icon="token ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="token ? 'text' : 'password'"
                name="input-10-2"
                label="Token"
                hint="Your Pixela Token Here"
                value=""
                class="input-group--focused"
                @click:append="token = !token"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      token: false,
      password: 'Password',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 50 || 'Min 50 characters'
      }
    }
  }
}
</script>
