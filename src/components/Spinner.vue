<template>
    <transition>
        <svg :class="{ show: show }" class="spinner" height="44px" v-show="show" viewBox="0 0 44 44" width="44px">
            <circle class="path" cx="22" cy="22" fill="none" r="20" stroke-linecap="round" stroke-width="4"></circle>
        </svg>
    </transition>
</template>

<script>
  export default {
    name: 'spinner',
    props: ['show'],
    serverCacheKey: props => props.show
  };
</script>

<style lang="stylus">
    $offset = 126
    $duration = 1.4s

    .spinner
        transition opacity .15s ease
        animation rotator $duration linear infinite
        animation-play-state paused

        &.show
            animation-play-state running

        &.v-enter, &.v-leave-active
            opacity 0

        &.v-enter-active, &.v-leave
            opacity 1

    @keyframes rotator
        0%
            transform scale(0.5) rotate(0deg)
        100%
            transform scale(0.5) rotate(270deg)

    .spinner .path
        stroke #ff6600
        stroke-dasharray $offset
        stroke-dashoffset 0
        transform-origin center
        animation dash $duration ease-in-out infinite

    @keyframes dash
        0%
            stroke-dashoffset $offset
        50%
            stroke-dashoffset ($offset/ 2)
            transform rotate(135deg)
        100%
            stroke-dashoffset $offset
            transform rotate(450deg)
</style>
