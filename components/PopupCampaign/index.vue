<template>
  <div
    :class="['popup-campaign', isActive && 'is-active']"
    @click.self="isActive = false"
  >
    <template v-if="isActive">
      <div
        class="popup-campaign__container"
        :style="campaignStyle"
      >
        <img
          :src="campaign.imageURL"
          :alt="campaign.imageAlt"
          class="popup-campaign__image"
          @click="onCampaignClicked"
        >
        <button
          class="popup-campaign__btn-close"
          @click.prevent.stop="isActive = false"
        >
          <FontAwesomeIcon class="absolute" :icon="icon.faTimes" color="white" />
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      icon: {
        faTimes
      },
      isActive: false
    }
  },
  computed: {
    ...mapState('remote-config', {
      campaign: state => state.config ? state.config.pikobarWebPopupCampaign : {}
    }),
    campaignStyle () {
      if (this.campaign) {
        const { width, height } = this.campaign
        return {
          maxWidth: width ? `${width}px` : 'unset',
          maxHeight: height ? `${height}px` : 'unset'
        }
      }
      return {}
    }
  },
  watch: {
    campaign: {
      immediate: true,
      deep: true,
      handler (v) {
        if (v && typeof v === 'object') {
          this.isActive = v.enabled
        }
      }
    }
  },
  methods: {
    onCampaignClicked () {
      const { backlink = '' } = this.campaign || {}
      if (typeof backlink !== 'string' || !backlink.length) {
        return
      }
      const isExternalLink = [
        'http',
        'tel',
        'mailto'
      ].some(prefix => backlink.startsWith(prefix))

      if (isExternalLink) {
        window.open(backlink, '_blank')
      } else if (backlink.startsWith('/')) {
        this.$router.push({
          path: this.backlink
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-campaign {
  display: none;
  top: 0;
  left: 0;
  @apply fixed z-50
  w-screen h-screen
  flex-row justify-center items-center;

  &.is-active {
    display: flex;
    background-color: rgba(0,0,0,0.333);
  }

  &__container {
    width: 75%;
    max-width: 80vw;
    max-height: 80vh;
    @apply relative shadow-lg;
  }

  &__image {
    @apply w-full h-auto object-center object-contain
    rounded-lg
    cursor-pointer;
  }

  &__btn-close {
    width: 1.5rem;
    height: 1.5rem;
    top: -0.75rem;
    right: -0.75rem;
    @apply absolute
    flex flex-row justify-center items-center
    rounded-full
    bg-black;

    &:hover {
      @apply bg-gray-800;
    }
  }
}
</style>
