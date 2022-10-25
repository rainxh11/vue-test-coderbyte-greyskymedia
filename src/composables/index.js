import { computed, ref } from 'vue'

export const intervalComputed = (evaluationFunction, interval = 1000) => {
    const evaluator = ref(0)
    const evaluation = computed(() => {
        if(evaluator.value) { }
        return evaluationFunction()
    })

    setInterval(() => evaluator.value = Math.random(), parseInt(interval) )
    return evaluation
}