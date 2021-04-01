import Time from '../util/time'

export default {
    bind(el, binding) {
        el.innerHTML = Time.getRelativeTimeSpan(binding.value)
        el.__time_out__ = setInterval(() => {
            el.innerHTML = Time.getRelativeTimeSpan(binding.value)
        }, 60000)
    },
    unbind(el) {
        clearInterval(el.__time_out__)
        delete el.__time_out__
    }
}
