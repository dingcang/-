Page({
  data: {
    list: [
      {
        id: 'view',
        name: '商科',
        url: 'specific',		
        top: true
      }, {
        id: 'content',
        name: '工程',
        url: 'specific',
        top: true
      }, {
        id: 'test',
        name: '自然科学',
        url: 'specific',		
        top: true
      }, {
        id: 'view',
        name: '社会科学',
        url: 'specific',
        top: true
      }, {
        id: 'content',
        name: '教育学',
        url: 'specific',
        top: true
      }, {
        id: 'test',
        name: '法律学',
        url: 'specific',
        top: true
      }, {
        id: 'view',
        name: '公共事务',
        url: 'specific',
        top: true
      }, {
        id: 'content',
        name: '新闻传播',
        url: 'specific',
        top: true
      }, {
        id: 'test',
        name: '艺术',
        url: 'specific',
        top: true
      }, {
        id: 'view',
        name: '健康',
        url: 'specific',
        top: true
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})

