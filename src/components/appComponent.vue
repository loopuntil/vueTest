
<template src="./appComponent.html"></template>

<script>
const baseUrl = 'http://localhost:3000/api/hero'

export default {
  data () {
    // return物件裡面的變數會與view繫結，當變數值改變時，view也會跟著改變
    return {
      heroId: '',
      heroName: '',
      data: [],
      paginationDef: {
        pageSize: 10,
        pageSizes: [10, 20, 30],
        currentPage: 1
      },
      loading: false,
      titles: [{
        prop: 'id',
        label: 'ID'
      }, {
        prop: 'name',
        label: 'NAME'
      }],
      tableProps: {
        defaultSort: {
          prop: 'id',
          order: 'asc'
        }
      },
      actionColDef: {
        label: 'Action',
        tableColProps: {
          align: 'center'
        },
        def: [{
          handler: row => {
            // this.$message('Edit clicked')
            // row.name = 'hello word'
            this.dialogFormVisible = true
            this.form.id = row.id
            this.form.name = row.name
          },
          buttonProps: {
            type: 'primary'
          },
          name: 'Edit'
        }, {
          buttonProps: {
            type: 'primary'
          },
          handler: row => {
            this.confirmRemove(row.id)
          },
          name: 'Remove'
        }]
      },
      dialogFormVisible: false,
      form: {
        id: '',
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  created: function () {
    // 當vue實體化後，先執行的方法，這邊只是印出版本資訊跟執行查詢
    // 要保存this不然在執行axios api時this會跑掉
    let self = this
    // 印出版本資訊
    console.log('version:' + this.service.getVersion())
    // 新增request攔截器
    this.axios.interceptors.request.use(function (config) {
      // 在送出請求前先載入動畫
      self.loading = true
      return config
    }, function (error) {
      // 錯誤處理，可以將全域的錯誤處理集中在一個地方
      self.loading = false
      self.$message('request error!')
      return Promise.reject(error)
    })
    // 增加 response攔截器，無論成功或失敗都取消動畫，但是失敗會送出error message，
    this.axios.interceptors.response.use(function (response) {
      self.loading = false
      return response
    }, function (error) {
      self.loading = false
      self.$message('response error!')
      return Promise.reject(error)
    })

    this.query()
  },
  methods: {
    query () {
      this.loading = true
      // 因為main前面有加Vue.use(VueAxios, axios)，所以axios可以直接使用，否則要import
      this.axios.get(baseUrl).then(response => {
        this.data = response.data
      })
    },
    dataValidationFailed () {
      let message = ''
      if (this.heroId.trim() === '') {
        message += 'ID not entered! '
      }
      if (this.heroName.trim() === '') {
        message += 'NAME not entered! '
      }
      if (message !== '') {
        this.$message(message)
        return true
      }
      return false
    },
    add () {
      if (this.dataValidationFailed()) {
        return
      }
      this.axios.post(baseUrl, {id: this.heroId, name: this.heroName}).then(success => {
        let message = 'Insert success!'
        let type = 'success'
        if (!success) {
          message = 'Insert Error!'
          type = 'warning'
        }
        this.$message({message: message, type: type})
        this.heroId = ''
        this.heroName = ''
        this.query()
      })
    },
    save () {
      if (this.form.id && this.form.name) {
        const id = this.form.id
        const name = this.form.name
        this.axios.put(baseUrl + '/' + id, {name: name}).then(success => {
          if (!success) {
            this.$message('Edit Error')
          }
          this.form.id = ''
          this.form.name = ''
          this.dialogFormVisible = false
          this.query()
        })
      }
    },
    confirmRemove (id) {
      this.$confirm('Do you want to remove the hero?')
          .then(_ => {
            this.remove(id)
          })
          .catch(_ => {})
    },
    remove (id) {
      this.axios.delete(baseUrl + '/' + id).then(success => {
        if (!success) {
          this.$message('Edit Error')
        }
        this.query()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-input-label {
  width: 300px;
}
.left {
  text-align: left;
}
</style>
