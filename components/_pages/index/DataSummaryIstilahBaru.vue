<template>
  <div class="container mx-auto">
    <div>
      <section class="flex flex-row flex-wrap">
        <!-- Terkonfirmasi -->
        <CounterCardLoader
          :is-pending="isLoadingJabar || isLoadingNasional"
          :is-main="true"
          class="mb-8 border border-solid digital-signage"
          style="background: #2C347C;"
          label="Total Terkonfirmasi"
        >
          <div class="flex flex-row text-white text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md">Jawa Barat</b>
              <div class="text-3xl">
                {{ formatNumber(dataIstilahBaru.confirmation_total) }}
              </div>
              <div>
                <span class="rounded-full bg-white px-custom-1 mr-1" style="">
                  <FontAwesomeIcon class="text-xs cursor-pointer" style="color:#2C347C" :icon="iconPlusMinus(dataIstilahBaru.confirmation_total_pertumbuhan)" />
                </span>
                {{ dataIstilahBaru.confirmation_total_pertumbuhan }}
              </div>
            </div>
            <div class="w-1/2">
              <b class="text-md">Indonesia</b>
              <div class="text-3xl">
                {{ formatNumber(dataNational.update.total.jumlah_positif) }}
              </div>
              <div>
                <span class="rounded-full bg-white px-custom-1 mr-1" style="">
                  <FontAwesomeIcon class="text-xs cursor-pointer" style="color:#2C347C" :icon="iconPlusMinus(dataNational.update.penambahan.jumlah_positif)" />
                </span>
                {{ dataNational.update.penambahan.jumlah_positif }}
              </div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Isolasi -->
        <CounterCardLoader
          :is-pending="isLoadingJabar || isLoadingNasional"
          :is-main="false"
          class="mb-8 border border-solid digital-signage bg-white text-title"
          label="Isolasi/Dalam Perawatan"
        >
          <div class="flex flex-row color-confirmation-diisolasi text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl">
                {{ formatNumber(dataIstilahBaru.confirmation_diisolasi) }}
              </div>
              <div>
                <span class="rounded-full bg-confirmation-diisolasi px-custom-1 mr-1" style="">
                  <FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(dataIstilahBaru.confirmation_diisolasi_pertumbuhan)" />
                </span>
                {{ dataIstilahBaru.confirmation_diisolasi_pertumbuhan }}
              </div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl">
                {{ formatNumber(dataNational.update.total.jumlah_dirawat) }}
              </div>
              <div>
                <span class="rounded-full bg-confirmation-diisolasi px-custom-1 mr-1" style="">
                  <FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(dataNational.update.penambahan.jumlah_dirawat)" />
                </span>
                {{ dataNational.update.penambahan.jumlah_dirawat }}
              </div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Selesai -->
        <CounterCardLoader
          :is-pending="isLoadingJabar || isLoadingNasional"
          :is-main="false"
          class="mb-8 border border-solid digital-signage bg-white text-title"
          label="Selesai Isolasi/Sembuh"
        >
          <div class="flex flex-row color-confirmation-selesai text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl">
                {{ formatNumber(dataIstilahBaru.confirmation_selesai) }}
              </div>
              <div>
                <span class="rounded-full bg-confirmation-selesai px-custom-1 mr-1" style="">
                  <FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(dataIstilahBaru.confirmation_selesai_pertumbuhan)" />
                </span>
                {{ dataIstilahBaru.confirmation_selesai_pertumbuhan }}
              </div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl">
                {{ formatNumber(dataNational.update.total.jumlah_sembuh) }}
              </div>
              <div>
                <span class="rounded-full bg-confirmation-selesai px-custom-1 mr-1" style="">
                  <FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(dataNational.update.penambahan.jumlah_sembuh)" />
                </span>
                {{ dataNational.update.penambahan.jumlah_sembuh }}
              </div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Meninggal -->
        <CounterCardLoader
          :is-pending="isLoadingJabar || isLoadingNasional"
          :is-main="false"
          class="mb-8 border border-solid digital-signage bg-white text-title"
          label="Meninggal"
        >
          <div class="flex flex-row color-confirmation-meninggal text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl">
                {{ formatNumber(dataIstilahBaru.confirmation_meninggal) }}
              </div>
              <div>
                <span class="rounded-full bg-confirmation-meninggal px-custom-1 mr-1" style="">
                  <FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(dataIstilahBaru.confirmation_meninggal_pertumbuhan)" />
                </span>
                {{ dataIstilahBaru.confirmation_meninggal_pertumbuhan }}
              </div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl">
                {{ formatNumber(dataNational.update.total.jumlah_meninggal) }}
              </div>
              <div>
                <span class="rounded-full bg-confirmation-meninggal px-custom-1 mr-1" style="">
                  <FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(dataNational.update.penambahan.jumlah_meninggal)" />
                </span>
                {{ dataNational.update.penambahan.jumlah_meninggal }}
              </div>
            </div>
          </div>
        </CounterCardLoader>
      </section>

      <section class="flex flex-row flex-wrap">
        <!-- Kontak Erat -->
        <CounterCardLoader
          :is-pending="isLoadingJabar"
          :is-main="false"
          :is-tooltip-closecontact="true"
          :is-tooltip-suspect="false"
          :is-tooltip-probable="false"
          class="border border-solid digital-signage2 bg-white text-title"
          label="Kontak Erat"
        >
          <div class="flex flex-col text-white text-center mt-3 font-bold">
            <div class="w-full color-title">
              <div class="text-3xl">
                {{ formatNumber(dataIstilahBaru.closecontact_total) }}
              </div>
              <span class="text-md">Total Kontak Erat</span>
            </div>
            <div class="w-full flex mt-3">
              <div class="w-1/2 color-closecontact-dikarantina">
                <div class="text-2xl">
                  {{ formatNumber(dataIstilahBaru.closecontact_dikarantina) }}
                </div>
                <div class="text-sm">
                  ({{ formatNumberPercent((dataIstilahBaru.closecontact_dikarantina / dataIstilahBaru.closecontact_total) * 100) }}%)
                </div>
                <span class="text-sm color-title">Masih Dikarantina</span>
              </div>
              <div class="w-1/2 color-closecontact-discarded">
                <div class="text-2xl">
                  {{ formatNumber(dataIstilahBaru.closecontact_discarded) }}
                </div>
                <div class="text-sm">
                  ({{ formatNumberPercent((dataIstilahBaru.closecontact_discarded / dataIstilahBaru.closecontact_total) * 100) }}%)
                </div>
                <span class="text-sm color-title">Discarded</span>
                <div class="tooltip pl-1">
                  &#9432;
                  <span class="tooltiptext text-xs">Kasus dikatakan discarded apabila orang dengan status kontak erat telah menyelesaikan masa karantina selama 14 hari.</span>
                </div>
              </div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Suspect -->
        <CounterCardLoader
          :is-pending="isLoadingJabar"
          :is-main="false"
          :is-tooltip-closecontact="false"
          :is-tooltip-suspect="true"
          :is-tooltip-probable="false"
          class="mb-8 border border-solid digital-signage2 bg-white text-title"
          label="Suspek"
        >
          <div class="flex flex-col text-white text-center mt-3 font-bold">
            <div class="w-full color-title">
              <div class="text-3xl">
                {{ formatNumber(dataIstilahBaru.suspect_total) }}
              </div>
              <span class="text-md">Total Suspek</span>
            </div>
            <div class="w-full flex mt-3">
              <div class="w-1/2 color-suspect-diisolasi">
                <div class="text-2xl">
                  {{ formatNumber(dataIstilahBaru.suspect_diisolasi) }}
                </div>
                <div class="text-sm">
                  ({{ formatNumberPercent((dataIstilahBaru.suspect_diisolasi / dataIstilahBaru.suspect_total) * 100) }}%)
                </div>
                <span class="text-sm color-title">Isolasi/Dalam Perawatan</span>
              </div>
              <div class="w-1/2 color-suspect-discarded">
                <div class="text-2xl">
                  {{ formatNumber(dataIstilahBaru.suspect_discarded) }}
                </div>
                <div class="text-sm">
                  ({{ formatNumberPercent((dataIstilahBaru.suspect_discarded / dataIstilahBaru.suspect_total) * 100) }}%)
                </div>
                <span class="text-sm color-title">Discarded</span>
                <div class="tooltip pl-1">
                  &#9432;
                  <span class="tooltiptext text-xs">Kasus dikatakan discarded apabila orang dengan status kasus suspek memiliki hasil pemeriksaan RT-PCR 2 kali negatif selama 2 hari berturut-turut dengan selang waktu > 24 jam.</span>
                </div>
              </div>
              <!-- <div class="w-1/3 color-suspect-meninggal">
                <div class="text-2xl">
                  {{ formatNumber(dataIstilahBaru.suspect_meninggal) }}
                </div>
                <div class="text-sm">
                  ({{ formatNumberPercent((dataIstilahBaru.suspect_meninggal / dataIstilahBaru.suspect_total) * 100) }}%)
                </div>
                <span class="text-sm color-title">Meninggal</span>
              </div> -->
            </div>
          </div>
        </CounterCardLoader>

        <!-- Probable -->
        <CounterCardLoader
          :is-pending="isLoadingJabar"
          :is-main="false"
          :is-tooltip-closecontact="false"
          :is-tooltip-suspect="false"
          :is-tooltip-probable="true"
          class="mb-8 border border-solid digital-signage2 bg-white text-title"
          label="Probable"
        >
          <div class="flex flex-col text-white text-center mt-3 font-bold">
            <div class="w-full color-title">
              <div class="text-3xl">
                {{ formatNumber(dataIstilahBaru.probable_total) }}
              </div>
              <span class="text-md">Total Probable</span>
            </div>
            <div class="w-full flex mt-3">
              <div class="w-1/2 color-probable-diisolasi">
                <div class="text-2xl">
                  {{ formatNumber(dataIstilahBaru.probable_diisolasi) }}
                </div>
                <div class="text-sm">
                  ({{ formatNumberPercent((dataIstilahBaru.probable_diisolasi / dataIstilahBaru.probable_total) * 100) }}%)
                </div>
                <span class="text-sm color-title">Isolasi/Dalam Perawatan</span>
              </div>
              <div class="w-1/2 color-probable-discarded">
                <div class="text-2xl">
                  {{ formatNumber(dataIstilahBaru.probable_discarded) }}
                </div>
                <div class="text-sm">
                  ({{ formatNumberPercent((dataIstilahBaru.probable_discarded / dataIstilahBaru.probable_total) * 100) }}%)
                </div>
                <span class="text-sm color-title">Selesai Isolasi/Sembuh</span>
              </div>
              <div class="w-1/3 color-probable-meninggal">
                <div class="text-2xl">
                  {{ formatNumber(dataIstilahBaru.probable_meninggal) }}
                </div>
                <div class="text-sm">
                  ({{ formatNumberPercent((dataIstilahBaru.probable_meninggal / dataIstilahBaru.probable_total) * 100) }}%)
                </div>
                <span class="text-sm color-title">Meninggal</span>
              </div>
            </div>
          </div>
        </CounterCardLoader>
      </section>
    </div>
  </div>
</template>

<script>
import _round from 'lodash/round'
import { faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import CounterCardLoader from './CounterCardLoader'
import { formatNumber, formatNumberPercent } from '~/lib/number'

export default {
  components: {
    CounterCardLoader
  },
  data () {
    return {
      dataNational: {
        update: {
          penambahan: {
            jumlah_positif: 0,
            jumlah_meninggal: 0,
            jumlah_sembuh: 0,
            jumlah_dirawat: 0,
            tanggal: '',
            created: ''
          },
          total: {
            jumlah_positif: 0,
            jumlah_meninggal: 0,
            jumlah_sembuh: 0,
            jumlah_dirawat: 0
          }
        }
      },
      dataIstilahBaru: {
        kode_prov: '32',
        nama_prov: 'Provinsi Jawa Barat',
        closecontact_total: 0,
        closecontact_total_pertumbuhan: 0,
        closecontact_dikarantina: 0,
        closecontact_dikarantina_pertumbuhan: 0,
        closecontact_discarded: 0,
        closecontact_discarded_pertumbuhan: 0,
        confirmation_total: 0,
        confirmation_total_pertumbuhan: 0,
        confirmation_diisolasi: 0,
        confirmation_diisolasi_pertumbuhan: 0,
        confirmation_meninggal: 0,
        confirmation_meninggal_pertumbuhan: 0,
        confirmation_selesai: 0,
        confirmation_selesai_pertumbuhan: 0,
        suspect_total: 0,
        suspect_total_pertumbuhan: 0,
        suspect_diisolasi: 0,
        suspect_diisolasi_pertumbuhan: 0,
        suspect_discarded: 0,
        suspect_discarded_pertumbuhan: 0,
        suspect_meninggal: 0,
        suspect_meninggal_pertumbuhan: 0,
        probable_total: 0,
        probable_total_pertumbuhan: 0,
        probable_diisolasi: 0,
        probable_diisolasi_pertumbuhan: 0,
        probable_discarded: 0,
        probable_discarded_pertumbuhan: 0,
        probable_meninggal: 0,
        probable_meninggal_pertumbuhan: 0
      },
      icons: {
        faAngleDoubleUp,
        faAngleDoubleDown
      }
    }
  },
  computed: {
    covidCasesNational () {
      return this.$store.getters['covid-cases-national/itemsMap']
    },
    isLoadingNasional () {
      return this.$store.getters['covid-cases-national/isLoading']
    },
    dataKasusTotalV2 () {
      return this.$store.getters['data-kasus-total-v2/itemsMap']
    },
    isLoadingJabar () {
      return this.$store.getters['data-kasus-total-v2/isLoading']
    }
  },
  watch: {
    covidCasesNational (val) {
      this.dataNational = val
    },
    dataKasusTotalV2 (val) {
      this.dataIstilahBaru = val[0]
    }
  },
  mounted () {
    this.getCovidCasesNational()
    this.getDataKasusTotalV2()
  },
  methods: {
    _round,
    formatNumber,
    formatNumberPercent,
    iconPlusMinus (val) {
      if (val > 0) {
        return this.icons.faAngleDoubleUp
      } else {
        return this.icons.faAngleDoubleDown
      }
    },

    // GET
    getCovidCasesNational () {
      this.$store.dispatch('covid-cases-national/getItems')
    },
    getDataKasusTotalV2 () {
      this.$store.dispatch('data-kasus-total-v2/getItems')
    }
  }
}
</script>
<style lang="scss" scoped>
.px-custom-1 {
  padding-left:0.325rem;
  padding-right:0.325rem
}
.text-white {
  color: white;
}
.text-title {
  color: #5B5B5B;
}
.text-bold {
  font-weight: bold;
}

.color-title {
  color: #575757;
}
.color-confirmation-diisolasi {
  color: #CEB546;
}
.color-confirmation-selesai {
  color: #27AE60;
}
.color-confirmation-meninggal {
  color: #A20E0E;
}
.color-closecontact-dikarantina {
  color: #BE8228;
}
.color-closecontact-discarded {
  color: #828282;
}
.color-suspect-diisolasi {
  color: #BEAB8D;
}
.color-suspect-discarded {
  color: #828282;
}
.color-suspect-meninggal {
  color: #A20E0E;
}
.color-probable-diisolasi {
  color: #D7C368;
}
.color-probable-discarded {
  color: #27AE60;
}
.color-probable-meninggal {
  color: #A20E0E;
}

.bg-confirmation-diisolasi {
  background: #CEB546;
}
.bg-confirmation-selesai {
  background: #27AE60;
}
.bg-confirmation-meninggal {
  background: #A20E0E;
}
.bg-closecontact-dikarantina {
  background: #F2994A;
}
.bg-closecontact-discarded {
  background: #828282;
}
.bg-suspect-diisolasi {
  background: #CEB546;
}
.bg-suspect-discarded {
  background: #828282;
}
.bg-suspect-meninggal {
  background: #A20E0E;
}
.bg-probable-diisolasi {
  background: #D7C368;
}
.bg-probable-discarded {
  background: #27AE60;
}
.bg-probable-meninggal {
  background: #A20E0E;
}

.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}
.div-only-mobile {
    display: none !important;
}
.div-no-mobile {
    display: flex !important;
}
@media screen and (max-width: 549px) {

  .div-no-mobile {
      display:none !important;
  }

  .div-only-mobile {
      display: flex !important;
  }

}
</style>
<style>
@media screen and (min-width: 1080px) {
  .digital-signage {
    width: 24% !important;
    margin: 0.5%;
    margin-bottom: 20px;
  }
  .digital-signage2 {
    width: 31% !important;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1080px) {
  .digital-signage {
    width: 48% !important;
    margin: 1%;
    margin-bottom: 20px;
  }
  .digital-signage2 {
    width: 31% !important;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 576px) {
  .digital-signage {
    width: 100% !important;
    margin-bottom: 20px;
  }
  .digital-signage2 {
    width: 100% !important;
    margin-bottom: 20px;
  }
}
</style>

<style scoped>
  /* Tooltip container */
  .tooltip {
    position: absolute;
    display: inline-block;
    font-weight: normal !important;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 280px;
    background-color: white;
    color:#000;
    text-align: left;
    padding: 10px;
    border-radius: 6px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -230px; /* Use half of the width (120/2 = 60), to center the tooltip */
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
    font-weight: normal;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
