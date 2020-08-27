const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    error: '',
    formVisible: true,
    created: null,
    rand: '😋😋😋',
  },
  async  beforeMount() {
    // `this` указывает на экземпляр vm
    const response = await fetch('/api/rand', {
      method: 'GET',
    });
    const result = await response.json();
    this.rand = result.rand;
  },
  methods: {
    async createUrl() {
      this.error = '';
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.formVisible = false;
        this.created = `${window.location.href}${result.slug}`;
      } else {
        const result = await response.json();
        this.error = result.message;
        console.log(error);
      }
    },
  },
});
