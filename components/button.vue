<template>
    <button @click="handleClick" :style="styles"><slot>Click</slot></button>
</template>

<script>
import EventBus from '../event-bus/index.js'

export default {
    props: {
        color: {
            type: String,
            default: '#00cc66'
        }
    },
    computed: {
        styles() {
            return {
                'background-color': this.color
            }
        }
    },
    methods: {
        handleClick() {
            this.$emit('on-click')
            //emit event through event bus
            EventBus.$emit('event-bus')
            this.$store.dispatch('asyncIncrease')
            //emit event through event bus plugin
            this.$bus.emit('event-bus-plugin')
        }
    }
}
</script>

<style scoped>
button {
    border: 0;
    outline: none;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px
}
/* 往下press的时候，有一个往右下偏移的效果 */
button:active {
    position: relative;
    top: 1px;
    left: 1px;
}
</style>