<template>
  <div>
    <section>
      <h2 class="text-xl md:text-3xl leading-normal">
        <b>Info Praktikal</b>
        <br>
        <p class="text-base opacity-75">
          Info yang memuat infografis terkait COVID-19
        </p>
      </h2>
      <br>
      <div class="infographic-list">
        <figure
          v-for="(item, index) in infographics"
          :key="index"
          class="relative w-full"
        >
          <div class="img-container relative overflow-hidden">
            <img
              :src="item.images[0] || null"
              class="cursor-pointer infographic-list__item-image w-full object-cover object-left-top rounded-lg shadow-lg"
              @click.prevent="$router.push(item.route)"
            >
            <div
              class="action-overlay rounded-lg absolute inset-0 hidden lg:flex flex-row justify-center items-center text-white"
              style="background-color: rgba(0,0,0,0.75)"
            >
              <button
                class="px-2 py-2 mr-1 rounded-md hover:bg-gray-800"
                @click="beforeDownload(item)"
              >
                <FontAwesomeIcon :icon="icon.faDownload" class="mr-1" />
                <span>
                  Unduh
                </span>
              </button>
              <button
                class="px-2 py-2 rounded-md hover:bg-gray-800"
                @click="beforeShare(item)"
              >
                <FontAwesomeIcon :icon="icon.faShare" class="mr-1" />
                <span>
                  Bagikan
                </span>
              </button>
            </div>
          </div>
          <caption class="mt-4 text-left block w-full font-bold opacity-75 hover:underline">
            <nuxt-link :to="item.route">
              {{ item.title }}
            </nuxt-link>
          </caption>
        </figure>
      </div>
      <br>
      <div class="flex justify-center">
        <button
          class="w-full lg:w-1/3 px-6 py-2 rounded-lg bg-brand-blue hover:bg-blue-400 text-white font-bold uppercase tracking-wider"
          @click="onLoadMore"
        >
          Load More
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons'
import { mapState, mapActions } from 'vuex'
import { analytics } from '~/lib/firebase'
import { onDownload, onShare } from '~/lib/download-and-share-firestore-doc'
export default {
  data () {
    return {
      icon: {
        faDownload,
        faShare
      },
      isPending: true
    }
  },
  computed: {
    ...mapState('infographics', {
      infographics: 'items'
    })
  },
  mounted () {
    this.isPending = true
    this.getItems({ perPage: 9, fresh: true })
      .finally(() => {
        if (process.browser) {
          analytics.logEvent('infographic_list_view')
        }
        this.isPending = false
      })
  },
  methods: {
    ...mapActions('infographics', {
      getItems: 'getItems'
    }),
    async onLoadMore () {
      this.isPending = true
      await this.getItems({ perPage: 9, fresh: true })
      this.isPending = false
    },
    beforeDownload (item) {
      onDownload(item.downloadURL, item.title)
    },
    beforeShare (item) {
      onShare(item.shareText)
    }
  },
  head () {
    const title = 'Infografis - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
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
.infographic-list {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1.5rem;
  row-gap: 3rem;

  &__item-image {
    height: 256px;
  }

  @screen md {
    grid-template-columns: 1fr 1fr;
  }

  @screen lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.img-container {
  > img {

    &:hover {
      opacity: 0.5;

      @screen lg {
        opacity: 1;
      }
    }
  }
  > .action-overlay {
    cursor: pointer;
    pointer-events: none;
    opacity: 0;
    transform: translateY(1rem);
    transition-property: opacity, transform;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
  }
  &:hover {

    > .action-overlay {
      pointer-events: all;
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
