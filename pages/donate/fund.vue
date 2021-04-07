
<template>
  <div class="container mx-auto">
    <section class="m-4 md:m-8">
      <DonationBanners />
    </section>
    <section id="table-logistik" class="m-4 mt-8 md:m-8 md:mt-16">
      <div class="p-5 md:p-8 rounded-lg border border-solid border-gray-300 bg-white">
        <h4 class="p-4 text-center text-lg md:text-2xl">
          <b>Bantu Kebutuhan Tunai</b>
        </h4>
        <p class="mb-4 opacity-75 text-center">
          Ikut berpartisipasi untuk memenuhi kebutuhan tunai di sini
        </p>
      </div>
    </section>
    <section id="donate-now" class="m-4 mt-8 md:m-8 md:mt-16">
      <div class="p-5 md:p-8 rounded-lg border border-solid border-gray-300 bg-white" />
    </section>
    <section class="m-4 md:m-8 rounded-lg border border-solid border-gray-300 bg-white">
      <KPBMContact />
    </section>
  </div>
</template>
<script>
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { analytics } from '~/lib/firebase'

export default {
  validate ({ redirect }) {
    return redirect('/')
  },
  components: {
    DonationBanners: () => import('../../components/_pages/donate/Banner'),
    KPBMContact: () => import('../../components/_pages/donate/KPBMContact')
  },
  data () {
    return {
      icon: {
        faArrowCircleRight
      },
      tableTabs: [
        {
          id: 'medic',
          title: 'Logistik Medis'
        }
        // {
        //   id: 'non-medic',
        //   title: 'Logistik Non Medis'
        // }
      ],
      activeTabId: 'medic'
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('donate_view')
      }
    })
  }
}

</script>

<style lang="scss" scoped>
</style>
