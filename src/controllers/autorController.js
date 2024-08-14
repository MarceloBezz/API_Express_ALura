import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = autor.find();
            req.resultado = autoresResultado;
            next();
        } catch (erro) {
            next(erro);
        }
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findById(id);

            if (autorResultado != null) {
                res.status(200).send(autorResultado);
            } else {
                next(new NaoEncontrado("Id do Autor não localizado."));
            }

        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({
                message: "criado com sucesso",
                autor: novoAutor
            });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findByIdAndUpdate(id, req.body);

            if(autorResultado != null) {
                res.status(200).json({message: "Autor atualizado"});
            } else {
                next(new NaoEncontrado("ID do autor não localizado"));
            }

        } catch (erro) {
            next(erro);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findByIdAndDelete(id);

            if(autorResultado != null) {
                res.status(200).json({message: "Autor excluído com sucesso"});
            } else {
                next(new NaoEncontrado("ID do autor não localizado"));
            }
        } catch (erro) {
            next(erro);
        }
    };

};

export default AutorController;