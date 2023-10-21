const users = {
  admin: {
    id: 1,
    username: 'Admin',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    role: {
      code: 'admin',
      name: '管理员',
    },
  },
  test: {
    id: 2,
    username: 'Test',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    role: {
      code: 'test',
      name: '测试员',
    },
  },
}
export default {
  getUserInfo: async (token) =>
    // 模拟获取用户信息，注意真实接口中最好把 token 放到请求头中
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token in users) {
          resolve({ code: 0, data: users[token] })
        }
        reject({ code: -1, message: '无此用户' })
      }, 1000)
    }),
}
