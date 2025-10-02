const app = Vue.createApp({
    data () {
        return {
            project: []
        }
    },
    created() {
        axios.get('project.json').then((response) => {this.project = response.data })
    },
});
app.mount('#app');