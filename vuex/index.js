import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

//vuex store 有 state/mutations/getters/modules/actions
//state 用来存储所有的共享数据，组件只能使用，不能直接修改. 比如在任意组件，可以使用 this.$store.state.count, 但是不能直接修改它的值
//mutations 用来定义各种修改 state 的 function, user 可以在组件调用 this.$store.commit('increase') 来调用 mutation, 从而更改 state. mutation 一般逻辑很简单, 而且不能在 mutation 里写异步操作
//mutation 可以有参数，在 commit 的时候直接传入即可. 参数也可以是对象
//getter 类似于组件的 computed, 当需要对原始数据做一些操作，且该操作会被多个组件共用时，就可以对 vuex 定义 getter, 避免在多个组件写相同的code
//getter 还可以依赖于其它 getter
//actions 和 mutations很像, 不过 actions 里面提交的是 mutation，并且可以异步操作业务逻辑。 action 在组件内通过 this.$store.dispatch 触发
//modules 是当 vuex store 很庞大时，可以将它分割为不同的module. 每个module 拥有自己的 state/mutation/getters/actions, 还可以多层嵌套
//module 的 mutation/getter 的第一个参数，是自己当前module 的 state, getter 的第二个参数，是当前module 的 getters,  还可以传递第三个参数 rootState 来访问 root store 的 state

//总结：
//mutation 只关心 state, 且必须为同步操作，在 call mutation 之前和之后，可以立刻观测到 value change
//actions 只关心业务逻辑，必须通过mutation 来更改数据，且可以调用多个mutation，或者其它 action，且可以异步操作
//子module 里的 state 是局部作用域，访问子module 里的state 必须指定 module name, 比如 this.$store.state.moduleA.count
//子 module 里的 mutations/getters/actions 默认注册到全局空间，组件里可以直接调用，如果想限制到局部空间，可以加入 namespace:true, 这样在访问子 module 里的 mutations/getters/actions 也必须指定module name
//子 module 里的 mutations/getters/actions 虽然默认注册到全局空间，但是它接收的参数，还是限制在自己的 module. 比如 mutation 的参数就是自己该module 的 state，而 getters 的第一个参数是该 module 的 state, 第二个参数是该 module 的 getters, 第三个参数是 rootState, 第四个是 rootGetters
//子 module 里的 actions 第一个参数是 该module 自己的 context, 可以通过 context.rootState, context.rootGetters 来访问 root 里定义的state 和 getters. actions 的第二个参数是用户传入的值
export default new Vuex.Store({
    state: {
        count: 0,
        list: [1,2,3,4,5,6]
    },
    mutations: {
        increase(state) {
            state.count++
        },
        decrease(state, delta) {
            state.count = state.count - delta
        },
        pushToList(state) {
            state.list.push(state.count)
        }
    },
    getters: {
        oddList(state) {
            return state.list.filter(e => e % 2 != 0);
        },
        oddListCount(state, getters) {
            return getters.oddList.length;
        }
    },
    actions: {
        //context 和 store 对象有相同的方法和属性，所以可以通过 context 访问 state, getters 等， 甚至可以 invoke other action through context.dispatch
        //但是 context 和 store 不是同一个对象，因为存在 modules
        increase(context) {
            context.commit('increase')
            context.commit('pushToList')
        },
        asyncIncrease(context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increase')
                    context.commit('pushToList')
                    resolve()
                }, 1000)
            })
        }
    }
})