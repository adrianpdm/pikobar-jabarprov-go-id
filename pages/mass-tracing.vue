<template>
  <div class="container h-screen flex flex-col mx-auto p-5">
    <header class="flex-none flex flex-row justify-start md:justify-center items-center">
      <img
        class="w-20 mr-4 lg:mr-6 h-full object-contain object-center"
        src="/logo.jpg"
      >
      <h3 class="text-xl lg:text-2xl leading-none">
        <b>Pikobar</b>
        <br>
        <small class="opacity-75">
          Pusat Informasi dan Koordinasi COVID-19 Jawa Barat
        </small>
      </h3>
    </header>
    <section class="flex-1 w-full max-w-3xl mx-auto my-8 md:p-8 md:bg-white md:rounded-lg md:shadow-xl md:border md:border-solid md:border-gray-300">
      <iframe src="https://www.masstracing.com/companyNoMenu/" class="w-full h-full" />
    </section>
  </div>
</template>

<script>
import { useNoIndexMeta } from '~/lib/metainfo'

export default {
  layout: 'blank',
  data () {
    return {
      status: null
    }
  },
  head () {
    return useNoIndexMeta()
  }
}
</script>
