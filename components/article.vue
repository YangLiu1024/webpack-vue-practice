<template>
    <div v-if="articleId">
        <div class="daily-article-title">{{article.title}}</div>
        <div class="daily-article-content" v-html="article.body"></div>
        <div class="daily-comments" v-if="comments.length">
            <span>Comments ({{comments.length}})</span>
            <div class="daily-comment" v-for="comment in comments" :key="comment.id">
                <div class="daily-comment-avatar"><img :src="comment.avatar"></div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">{{comment.author}}</div>
                    <div class="daily-comment-time-like">
                        <div class="daily-comment-time" v-timespan="comment.time"></div>
                        <div class="daily-comment-like">Likes {{comment.likes}}</div>
                    </div>
                    <div class="daily-comment-text">{{comment.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Request, {IMAGE_URL} from '../util/request'
import Timespan from '../directives/timespan'

export default {
    directives: {
        Timespan
    },
    props: {
        articleId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            article: {},
            comments: []
        }
    },
    methods: {
        loadArticle(id) {
            Request.get('news/' + id).then(res => {
                res.body = res.body.replace(/src="http/g, 'src="' + IMAGE_URL + 'http')
                this.article = {
                    body: res.body,
                    title: res.title
                }
                window.scrollTo(0, 0)
            }) 
        },
        loadComments(id) {
            Request.get('story/' + id + '/short-comments').then(res => {
                this.comments = res.comments.map(comment => {
                    comment.avatar = IMAGE_URL + comment.avatar
                    comment.time = comment.time * 1000
                    return comment
                })
            })
        }
    },
    watch: {
        articleId(id) {
            this.loadArticle(id)
            this.loadComments(id)
        }
    }
}
</script>

<style lang="css" scoped>
.daily-article-title {
    font-size: 28px;
    font-weight: bold;
    color: #222;
    padding: 10px 0;
}

.daily-comments {
    margin: 10px 0;
}

.daily-comments span {
    display: block;
    margin: 10px 0;
    font-size: 20px;
}

.daily-comment {
    overflow: hidden;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e3e8ee
}

.daily-comment-avatar {
    width: 80px;
    height: 80px;
    float: left;
}

.daily-comment-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
}

.daily-comment-content {
    margin-left: 95px;
}

.daily-comment-name {
    font-weight: bold
}

.daily-comment-time-like {
    display: flex;
    justify-content: left
}

.daily-comment-time {
    color: #9ea7b4;
    font-size: 14px;
    margin-top: 5px;
}
.daily-comment-like {
    color: #9ea7b4;
    font-size: 14px;
    margin: 5px 0 0 10px
}

.daily-comment-text {
    margin-top: 10px;
}
</style>