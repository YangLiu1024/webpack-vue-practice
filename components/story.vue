<template>
    <a class="daily-list-item">
        <div class="daily-list-item-img" v-if="data.images">
            <img :src="imageUrl + data.images[0]">
        </div>
        <div  class="daily-list-item-title" :class="{noImg: !data.images}">{{data.title}}</div>
    </a>
</template>

<script>
import {IMAGE_URL} from '../util/request'

export default {
    props: ['data'],
    data() {
        return {
            imageUrl: IMAGE_URL
        }
    }
}
</script>
<style scoped lang="css">
.daily-list-item {
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all .3s ease-in-out
}
.daily-list-item:hover {
    background: #e3e8ee;
}
.daily-list-item-img {
    width: 120px;
    height: 120px;
    float: left;
}

.daily-list-item-img img{
    width: 100%;
    height: 100%;
    border-radius: 3px;
}

.daily-list-item-title {
    padding: 10px 5px 10px 130px;
}

.daily-list-item-title.noImg {
    padding-left: 5px;
}

</style>