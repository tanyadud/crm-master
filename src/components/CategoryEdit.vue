<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{ c.title }}
            </option>
          </select>
          <label>{{ 'SelectCategory' | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{ 'NameCategory' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            {{ 'Message_InputNameCategory' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{ 'MinValue' | localize }} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Refresh' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {minValue, required} from "vuelidate/lib/validators";

  export default {
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      title: '',
      limit: 100,
      select: null,
      current: null
    }),
    validations: {
      title: {required},
      limit: {minValue: minValue(10)}
    },
    watch: {
      current(catId) {
        const {title, limit} = this.categories.find(c => c.id === catId)
        this.title = title
        this.limit = limit
      }
    },
    created() {
      const {id, title, limit} = this.categories[0]
      this.current = id
      this.title = title
      this.limit = limit
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }

        try {
          await this.$store.dispatch('updateCategory', categoryData)
          this.$message('Категория успешно обновлена')
          this.$emit('updated', categoryData)
        } catch (e) {

        }
      }
    },
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>
