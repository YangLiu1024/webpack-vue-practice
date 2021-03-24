<template>
    <div>Help page{{count}}</div>
</template>

<script>
import EventBus from '../event-bus'

export default {
    computed: {
        count() {
            return this.$store.state.count
        }
    },
    created() {
        console.log('Help component mounted')
        function handleEventBus() {
            console.log('Help component handle event bus')
        }
        EventBus.$on('event-bus', handleEventBus)
        this.__handle_event_bus__ = handleEventBus
    },
    beforeDestroy() {
        if (this.__handle_event_bus__) {
            console.log('Clear the event bus listener for Help component')
            EventBus.$off('event-bus', this.__handle_event_bus__)
            delete this.__handle_event_bus__
        }
    }    
}
</script>