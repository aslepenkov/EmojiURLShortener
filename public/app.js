// const app = new Vue({
//   el: '#app',
//   data: {
//     url: '',
//     slug: '',
//     created: null,
//   },
//   methods: {
//     async createUrl() {
//       const response = await fetch('/url', {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json',
//         },
//         body: JSON.stringify(
//           {
//             url: this.url,
//             slug: this.slug,
//           },
//         ),
//       });
//       this.created = await response.json();
//     },
//   },
// });
const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    error: '',
    formVisible: true,
    created: null,
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
          slug: this.slug || undefined,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.created = `https://localhost:8001/${result.slug}`;
      } else {
        const result = await response.json();
        this.error = result.message;
      }
    },
  },
});