/*eslint-disable */
const app = require('../utils/globalData');

module.exports = {
  showEdit(e) {
    const { name } = e.currentTarget.dataset;
    if (!this.data.isEditing || this.data.editLayer[name]) return;
    this.setData({
      editLayer: {}
    })

    this.setData({
      ["editLayer." + name]: !this.data.editLayer[name]
    })
  },
  cancelClick() {
    this.setData({
      editLayer: {},
      isEditing:false,
    })
  },
  editClick(e) {
    this.setData({
      isEditing: !this.data.isEditing
    })
    if (this.data.isEditing) {
      console.log('编辑')
      console.log(this.data.page_data)
      const name = this.data.page_data[0].id;
      if (this.data.page_data.length > 0) {
        this.setData({
          ["editLayer." + name]: true
        })
      }
    } else {
      this.setData({
        editLayer: {}
      })
      console.log('保存')
    }
  },
  goEdit(e) {
    const { id,name } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../edit/${name}?id=${id}`
    })
  }
};
