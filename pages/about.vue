<template>
    <div>About page {{oddList}}</div>
</template>

<script>
export default {
    computed: {
        oddList() {
            return this.$store.getters.oddList
        }
    }
}
</script>