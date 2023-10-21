export default {
  login: (data) =>
    // 模拟登录
    new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          token: data.username,
        })
      }, 1000)
    ),
}
