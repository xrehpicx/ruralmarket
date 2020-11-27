const { UserModel, ProductModel } = require('./model')

const controller = {
    login: async ({ number, password }) => {
        if (!number || !password) { return }
        return await UserModel.findOne({ number, password })
    },
    signup: async ({ number, password, username }) => {
        if (!number || !password) { return }
        if (await controller.login({ number, password })) { return }

        const user = new UserModel({ number, password, username })
        return await user.save()
    },

}

module.exports = controller