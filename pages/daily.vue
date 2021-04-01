<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item" :class="{on: selectedMenuItem === MenuItem.DailyRecommended}" @click="selectDailyRecommended">每日推荐</div>
            <div class="daily-menu-item" :class="{on: selectedMenuItem === MenuItem.DailyTopic}" @click="selectDailyTopic">主题日报</div>
            <ul v-show="showTopics">
                <li v-for="topic in topics" :key="topic.id">
                    <a :class="{on: selectedTopicId === topic.id}" @click.stop="selectTopic(topic.id)">{{topic.name}}</a>
                </li>
            </ul>
        </div>
        <div class="daily-list" ref="list" @scroll="autoLoadDailyRecommended">
            <h2 v-if="!showTopics">{{recommenedDay}}</h2>
            <Story v-for="story in stories" :data="story" :key="story.id" @click.native="selectStory(story.id)"></Story>
        </div>
        <div class="daily-article"><Article :articleId="selectedStoryId"></Article></div>
    </div>
</template>

<script>
import Request from '../util/request'
import Time from '../util/time'

import Story from '../components/story.vue'
import Article from '../components/article.vue'

export default {
    data() {
        return {
            MenuItem: {
                "DailyRecommended": 0,
                "DailyTopic": 1
            },
            selectedMenuItem: 0,
            showTopics: false,
            selectedTopicId: -1,
            selectedStoryId: 0,
            recommendedStories: [],
            isLoadingDailyRecommended: false,
            currentDay: Time.getTodayTimestamp(),
            topics: [],//{id: Number, name: String}
            topicStories: []//{type: Number, id: Number, title: String, images: Array, url: String}
        }
    },
    components: {
        Story,
        Article
    },
    computed: {
        stories() {
            return this.showTopics ? this.topicStories : this.recommendedStories
        },
        recommenedDay() {
            return Time.getYearMonthDay(this.currentDay, '-')
        }
    },
    methods: {
        selectDailyRecommended() {
            this.showTopics = false;
            this.selectedMenuItem = this.MenuItem.DailyRecommended;
        },
        selectDailyTopic() {
            this.selectedMenuItem = this.MenuItem.DailyTopic;
            this.showTopics = true
        },
        selectTopic(topicId) {
            this.selectedTopicId = topicId
            Request.get('theme/' + topicId).then(res => this.topicStories = res.stories).catch(error => console.log('fail to load topic stories'))
        },
        selectStory(storyId) {
            console.log('select story', storyId)
            this.selectedStoryId = storyId
        },
        preDay() {
            this.currentDay = Time.getPredayTimestamp(this.currentDay)
            this.loadDailyRecommended()
        },
        nextDay() {
            this.currentDay = Time.getNextDayTimestamp(this.currentDay)
            this.loadDailyRecommended()
        },

        loadDailyRecommended() {
            this.isLoadingDailyRecommended = true
            Request.get('news/before/' + Time.getYearMonthDay(Time.getNextDayTimestamp(this.currentDay))).then(res => {
                this.recommendedStories = res.stories;
                this.isLoadingDailyRecommended = false
            }).catch(error => console.log('fail to load daily news'))
        },
        loadTopics() {
            Request.get('themes').then(res => {
                this.topics = res.others;
                if (this.topics && this.topics.length > 0) {
                    this.selectTopic(this.topics[0].id)
                }
            }).catch(error => console.log('fail to load topics'))
        },

        autoLoadDailyRecommended() {
            const $list = this.$refs.list
            if (this.selectedMenuItem === this.MenuItem.DailyTopic || this.isLoadingDailyRecommended) {
                return
            }
            //sometimes, the $list.scrollTop + $list.clientHeight is almost equal to $list.scrollHeight
            //so add "-1" to aviod inaccuracy
            if ($list.scrollTop + $list.clientHeight >= $list.scrollHeight - 1) {
                this.preDay()
            }
            if ($list.scrollTop === 0) {
                this.nextDay()
            }
        }
    },
    mounted() {
        this.loadTopics()
        this.loadDailyRecommended()
    }
}
</script>

<style scoped>

</style>