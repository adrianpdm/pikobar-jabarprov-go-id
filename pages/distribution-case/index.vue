<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="lg:w-2/3 md:auto sm:w-auto">
          <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
            Sebaran Kasus Covid-19 di Jawa Barat
          </h3>
        </div>
        <div class="lg:w-1/3 md:auto sm:w-auto">
          <div class="flex">
            <div class="w-full mr-2">
              <multiselect
                v-model="selectedKota"
                :options="optionsKota"
                track-by="value"
                label="label"
                select-label=""
                deselect-label=""
                selected-label=""
                @input="setSelectedKota"
              />
            </div>
            <div class="w-full">
              <multiselect
                v-model="selectedKecamatan"
                :options="optionsKecamatan"
                track-by="value"
                label="label"
                select-label=""
                deselect-label=""
                selected-label=""
                :disabled="selectedKota.value === '32' ? true : false"
                @input="setSelectedKecamatan"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="m-4 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-full mb-6 lg:w-3/5 lg:mr-6 lg:mb-0 bg-white rounded-lg mb-8 shadow-lg">
          <div>
            <h3 class="p-5 text-lg md:text">
              <b>Peta Kasus Covid-19 di Jawa Barat</b>
            </h3>
            <hr>
          </div>
          <div class="p-6">
            <div class="flex flex-col lg:flex-row lg:items-stretch mb-3">
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeMap === 'polygon'"
                @click="enableMap('polygon')"
              >
                <img v-if="activeMap === 'polygon'" src="/img/icon-sebaran-active.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                <img v-if="activeMap !== 'polygon'" src="/img/icon-sebaran-inactive.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                Sebaran Polygon
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeMap === 'titik'"
                @click="enableMap('titik')"
              >
                <img v-if="activeMap === 'titik'" src="/img/icon-sebaran-active.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                <img v-if="activeMap !== 'titik'" src="/img/icon-sebaran-inactive.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                Sebaran Titik
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeMap === 'timeslider'"
                @click="enableMap('timeslider')"
              >
                <img v-if="activeMap === 'timeslider'" src="/img/icon-data-positif-active.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                <img v-if="activeMap !== 'timeslider'" src="/img/icon-data-positif-inactive.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                Timeslider - Data Terkonfirmasi
              </button>
            </div>
            <MapV3SebaranPolygonIstilahBaru v-if="activeMap === 'polygon'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
            <MapV3SebaranTitikIstilahBaru v-if="activeMap === 'titik'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
            <MapV3SebaranTimeSliderIstilahBaru v-if="activeMap === 'timeslider'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
          </div>
        </div>
        <div class="w-full mb-6 lg:w-2/5 lg:mb-0 bg-white rounded-lg mb-8 shadow-lg">
          <RasioConfirmedCaseIstilahBaru :active-region-id="activeRegionId" :active-region-category="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
        </div>
      </div>
    </section>
    <section class="m-4 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-full mb-6 lg:mb-0 bg-white rounded-lg mb-8 shadow-lg">
          <div>
            <h3 class="p-5 text-lg md:text">
              <b>Tabel Kasus Covid-19 di Jawa Barat</b>
            </h3>
            <hr>
          </div>
          <div class="p-6">
            <div class="mb-2">
              Data yang ditampilkan berdasarkan: <b>{{ parentLabel[activeRegionCategory].label }} di {{ activeParentRegionName }}</b> <br>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-stretch">
              <button
                class="button-selector mr-1 mt-1 mb-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'confirmed'"
                @click="enableTable('confirmed')"
              >
                Terkonfirmasi
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'suspect'"
                @click="enableTable('suspect')"
              >
                Suspek
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'closecontact'"
                @click="enableTable('closecontact')"
              >
                Kontak Erat
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'probable'"
                @click="enableTable('probable')"
              >
                Probable
              </button>
            </div>
          </div>
          <ConfirmedCaseListIstilahBaru v-if="activeTable === 'confirmed'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <SuspectCaseListIstilahBaru v-if="activeTable === 'suspect'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <CloseContactCaseListIstilahBaru v-if="activeTable === 'closecontact'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <ProbableCaseListIstilahBaru v-if="activeTable === 'probable'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
        </div>
      </div>
    </section>
    <section class="m-4 md:m-8 flex flex-col xl:flex-row rounded-lg overflow-hidden shadow-md" style="background:#e6e6e6">
      <div class="w-full xl:w-1/2 m-1 p-5">
        <b>Disclaimer :</b>
        <p>
          Data Suspek, Probable dan Kontak Erat diterima Pikobar berdasarkan laporan harian Dinas Kesehatan Kab/Kota per 5 Agustus 2020,
          sehingga terlihat penumpukan kasus pada Chart Harian dan Kumulatif untuk Suspek, Probable, dan Kontak Erat pada tanggal tersebut.
        </p>
      </div>
      <div class="w-full xl:w-1/2 m-1 p-5">
        <b>&#9432; Sumber Data :</b>
        <ul style="list-style: inherit; margin-left: 20px;">
          <li>Konfirmasi (Total, Dalam Perawatan, Sembuh, Meninggal): Laporan Harian Kemenkes</li>
          <li>Suspek (Total, Dalam Perawatan, Discarded): Laporan Harian Dinkes Kab/Kota di Jawa Barat</li>
          <li>Kontak Erat (Total, Karantina, Discarded): Laporan Harian Dinkes Kab/Kota di Jawa Barat</li>
          <li>Probable (Total, Dalam Perawatan, Sembuh, Meninggal): Laporan Harian Dinkes Kab/Kota di Jawa Barat</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
// import { faChevronUp, faChevronDown, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
// import { analytics } from '~/lib/firebase'
export default {
  components: {
    MapV3SebaranPolygonIstilahBaru: () => import('~/components/MapV3SebaranPolygonIstilahBaru'),
    MapV3SebaranTitikIstilahBaru: () => import('~/components/MapV3SebaranTitikIstilahBaru'),
    MapV3SebaranTimeSliderIstilahBaru: () => import('~/components/MapV3SebaranTimeSliderIstilahBaru'),
    RasioConfirmedCaseIstilahBaru: () => import('~/components/RasioConfirmedCaseIstilahBaru'),
    ConfirmedCaseListIstilahBaru: () => import('~/components/ConfirmedCaseListIstilahBaru'),
    SuspectCaseListIstilahBaru: () => import('~/components/SuspectCaseListIstilahBaru'),
    CloseContactCaseListIstilahBaru: () => import('~/components/CloseContactCaseListIstilahBaru'),
    ProbableCaseListIstilahBaru: () => import('~/components/ProbableCaseListIstilahBaru')
  },
  data () {
    return {
      activeRegionId: '32',
      activeRegionCategory: 'kota',
      activeParentRegionName: 'Jawa Barat',
      activeMap: 'polygon',
      activeTable: 'confirmed',
      activeCaseCategory: 'confirmation_diisolasi',

      // data
      parentLabel: {
        kota: {
          label: 'Kota/Kabupaten'
        },
        kecamatan: {
          label: 'Kecamatan'
        },
        kelurahan: {
          label: 'Kelurahan/Desa'
        }
      },

      optionsKota: [
        { value: '32', label: 'JAWA BARAT' },
        { value: '3201', label: 'KAB. BOGOR' },
        { value: '3202', label: 'KAB. SUKABUMI' },
        { value: '3203', label: 'KAB. CIANJUR' },
        { value: '3204', label: 'KAB. BANDUNG' },
        { value: '3205', label: 'KAB. GARUT' },
        { value: '3206', label: 'KAB. TASIKMALAYA' },
        { value: '3207', label: 'KAB. CIAMIS' },
        { value: '3208', label: 'KAB. KUNINGAN' },
        { value: '3209', label: 'KAB. CIREBON' },
        { value: '3210', label: 'KAB. MAJALENGKA' },
        { value: '3211', label: 'KAB. SUMEDANG' },
        { value: '3212', label: 'KAB. INDRAMAYU' },
        { value: '3213', label: 'KAB. SUBANG' },
        { value: '3214', label: 'KAB. PURWAKARTA' },
        { value: '3215', label: 'KAB. KARAWANG' },
        { value: '3216', label: 'KAB. BEKASI' },
        { value: '3217', label: 'KAB. BANDUNG BARAT' },
        { value: '3218', label: 'KAB. PANGANDARAN' },
        { value: '3271', label: 'KOTA BOGOR' },
        { value: '3272', label: 'KOTA SUKABUMI' },
        { value: '3273', label: 'KOTA BANDUNG' },
        { value: '3274', label: 'KOTA CIREBON' },
        { value: '3275', label: 'KOTA BEKASI' },
        { value: '3276', label: 'KOTA DEPOK' },
        { value: '3277', label: 'KOTA CIMAHI' },
        { value: '3278', label: 'KOTA TASIKMALAYA' },
        { value: '3279', label: 'KOTA BANJAR' }
      ],
      selectedKota: { value: '32', label: 'JAWA BARAT' },

      optionsKecamatan: [{ label: 'Pilih Kecamatan', value: '' }],
      selectedKecamatan: { label: 'Pilih Kecamatan', value: '' }
    }
  },
  computed: {
    dataKecamatan () {
      return this.$store.getters['data-kecamatan/itemsMap']
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) {
      if (this.activeRegionCategory === 'kelurahan') {
        this.selectedKecamatan = this.optionsKecamatan.find(x => x.value === parseInt(newVal))
      } else if (this.activeRegionCategory === 'kecamatan') {
        this.selectedKota = this.optionsKota.find(x => x.value === newVal)
        this.selectedKecamatan = { label: 'Pilih Kecamatan', value: '' }
        this.getDataKecamatan(newVal)
      } else {
        this.selectedKota = { value: '32', label: 'JAWA BARAT' }
        this.selectedKecamatan = { label: 'Pilih Kecamatan', value: '' }
      }
    },
    dataKecamatan (val) {
      const optionsKecamatan = [{
        label: 'Pilih Kecamatan',
        value: ''
      }]
      val.forEach((element) => {
        optionsKecamatan.push({
          label: element.bps_kecamatan_nama,
          value: element.bps_kecamatan_kode
        })
      })

      this.optionsKecamatan = optionsKecamatan
    }
  },
  mounted () {
    this.$nextTick(() => {
      Promise.all([
        this.$store.dispatch('data-kasus-total-v2/getItems')
      ]).then(() => {
      })
    })

    this.getDataKecamatan()
  },
  methods: {
    enableMap (type) {
      this.activeMap = type
      this.activeCaseCategory = 'confirmation_diisolasi'
    },
    enableTable (type) {
      this.activeTable = type
    },
    setSelectedKota () {
      const val = this.selectedKota.value
      this.activeParentRegionName = this.selectedKota.label
      if (val === '32') {
        this.getDataSebaranPolygon('kota', this.activeCaseCategory)
        this.activeRegionId = val
        this.activeRegionCategory = 'kota'
      } else {
        this.selectedKecamatan = ''
        this.getDataKecamatan(val)

        this.getDataSebaranPolygon('kecamatan', this.activeCaseCategory, val)

        this.activeRegionId = val
        this.activeRegionCategory = 'kecamatan'
      }
    },
    setSelectedKecamatan () {
      const val = this.selectedKecamatan.value
      const kodeKec = val.toString()
      this.activeParentRegionName = this.selectedKecamatan.label
      if (val === '') {
        this.getDataKecamatan(this.selectedKota.value)
        this.getDataSebaranPolygon('kecamatan', this.activeCaseCategory, this.selectedKota.value)
        this.activeRegionId = this.selectedKota.value
        this.activeRegionCategory = 'kecamatan'
      } else {
        this.getDataSebaranPolygon('kelurahan', this.activeCaseCategory, kodeKec)
        this.activeRegionId = kodeKec
        this.activeRegionCategory = 'kelurahan'
      }
    },

    // GET
    getDataKecamatan (kodeKab = '') {
      let where = {
        bps_provinsi_kode: '32'
      }

      if (kodeKab) {
        where = {
          bps_kabupaten_kode: kodeKab
        }
      }

      const params = {
        where,
        exclude: 'polygon_json'
      }
      this.$store.dispatch('data-kecamatan/getItems', params)
    },
    getDataSebaranPolygon (region, category, regionCode = '') {
      let parentKeyCode = ''
      let query = 'wilayah=' + region

      if (category) {
        query += '&category=' + category
      }

      switch (region) {
        case 'kecamatan' : {
          parentKeyCode = 'kode_kab'
          break
        }
        case 'kelurahan' : {
          parentKeyCode = 'kode_kec'
          break
        }
        default : parentKeyCode = ''
      }

      query += `&${parentKeyCode}=${regionCode}`

      this.$store.dispatch('data-sebaran-polygon-v2/getItem', query)
    }
  },
  head () {
    const title = 'Sebaran Kasus - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$vs-dropdown-z-index: -1 !default;
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}

  .style-chooser .vs__dropdown-menu {
    z-index: -10000 !important;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
