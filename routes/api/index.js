try {
    require('dotenv').config();
} catch (error) {
    console.log('.env module not needed');
}
const controller = require('../../controller')
const router = require('express').Router();



function routerSetup(io) {

    router.post('/login', async (req, res) => {
        console.log('login attempt', req.body, !req.body.number || !req.body.password)
        if (!req.body.number || !req.body.password) { res.sendStatus(400); return }

        try {
            const result = await controller.login(req.body)
            console.log(result)
            res.send(JSON.stringify(result))
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }

    })
    router.post('/signup', async (req, res) => {

        if (!req.body.number || !req.body.password || !req.body.username) { res.sendStatus(400); return }

        try {
            const result = await controller.signup(req.body)
            res.send(JSON.stringify(result))
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }

    })

    return router

}


module.exports = routerSetup;