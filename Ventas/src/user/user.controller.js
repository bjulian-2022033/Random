'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../../utils/validator.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save()

        return res.send({ message: 'Registered successfully' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registred user' })
    }
}

/*export const registerC = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save()

        return res.send({ message: 'Registered successfully' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registred user'})
    }
}*/


export const login = async (req, res) => {
    try {

        let { username, password } = req.body
        let user = await User.findOne({ username })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name
            }

            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }

        return res.status(404).send({ message: 'Invalid credentials' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const update = async (req, res) => {
    try {

        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or mising data' })

        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        return res.send({ message: 'Update user', updatedUser })

    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already token` })
        return res.status(500).send({ message: 'Error updating account' })

    }
}

export const deleteU = async (req, res) => {
    try {

        let { id } = req.params
        let userId = req.user.id

        if (userId == id) {

            let deletedUser = await User.findOneAndDelete({ _id: id })
            if (!deletedUser) return res.status(404).send({ message: 'Acount not found and not deleted' })

        }
        return res.send({ message: `Account with username ${deletedUser.username} deleted successfully` })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account', err })

    }
}