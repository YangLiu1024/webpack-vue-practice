<template>
    <button @click="handleClick" :style="styles"><slot>Click</slot></button>
</template>

<script>
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