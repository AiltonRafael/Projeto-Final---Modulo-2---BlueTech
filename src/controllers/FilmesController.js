import { Filmes } from '../models/Filmes.js';
import Sequelize from 'sequelize';
import { connection } from '../database/db.js';

const Op = Sequelize.Op

export const getAll = async (req, res) => {
    try {
        const filmes = await Filmes.findAll({
            order: [["nome", "ASC"]]
        })
        res.status(200).render('index.ejs', {
            filmes
        })
    } catch (err) {
        res.status(500).send({
            err: err.message
        })
    }
}

export const getDetalhes = async (req, res) => {
    try {
        const filme = await Filmes.findByPk(req.params.id)
        res.render('detalhes.ejs', {
            filme
        })
    } catch (err) {
        res.status(500).send({
            err: err.message
        })
    }
}
let modal = false

export const getCriar = (req, res) => {
    res.render('criar.ejs', {
        modal
    })
}

export const postCriar = async (req, res) => {
    try {
    const { nome, ano, img, duracao, diretores, iframe } = req.body
    if(!nome || !diretores || !img || !duracao || !diretores || !iframe){
        res.redirect('/error')
    }
    await Filmes.create({
        nome, ano, img, duracao, diretores, iframe
    })
    modal = true
    setTimeout(() => {modal = false}, 2000)
    res.redirect('/criar')
    }
    catch(err) {
        res.status(500).send({
            err: err.message
        })
    }
}

export const getAllDelete = async (req, res) => {
    try {
        const filmes = await Filmes.findAll()
        res.status(200).render('deletar', {
            filmes
        })
    }
    catch(err) {
        res.status(500).send({err: err.message})
    }
}

export const getApagar = async (req, res) => {
    try {
        await Filmes.destroy({
            where: {
            id: req.params.id
        }})
        res.status(200).redirect("/")
    }
    catch(err){
        res.status(500).send({err: err.message})
    }
}

export const getFormEdit = async (req, res) => {
    const filme = await Filmes.findByPk(req.params.id)
    res.status(200).render('editar.ejs', {filme})
}

export const getPut = async (req, res) => {
    const { nome, ano, img, duracao, diretores, iframe } = req.body
    try {
        await Filmes.update({
            nome: nome,
            ano: ano,
            img: img,
            duracao: duracao,
            diretores: diretores,
            iframe: iframe
        }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).redirect('/')
        
    }

    catch(err) {
        res.status(500).send({err: err.message})
    }
}

export const getSucess = (req, res) => {
    res.render('sucess.ejs')
}

export const postSearch = async (req, res) => {
    try {
        const filmes = await Filmes.findAll({
            where: {
                nome: {
                    [Op.iLike]: `%${req.body.search}%`
                }
            }
        })
        // const filmes = await connection.query(`SELECT * FROM filmes WHERE nome LIKE '%${req.body.search}%'`, {
        //     Filmes
        // })
        res.render('index.ejs', {
            filmes
        })
    }
    catch(err) {
        res.send(err.message)
    }
}

export const getError = (req, res) => {
    res.render('error.ejs')
}