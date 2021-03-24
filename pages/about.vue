<template>
    <div>About page {{oddList}}</div>
</template>

<script>
export default {
    computed: {
        oddList() {
            return this.$store.getters.oddList
        }
    },
    methods: {
        handleEventBusPlugin() {
            console.log('receive event bus plugin')
        }
    },
    created() {
        //need to listen on event in created hook instead of mounted in case that other component emit event in its created hook
        this.$bus.on('event-bus-plugin', this.handleEventBusPlugin)
    },
    beforeDestroy() {
        this.$bus.off('event-bus-plugin', this.handleEventBusPlugin)
    }
}
</script>