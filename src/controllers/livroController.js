import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor as autores, livros } from "../models/index.js";

class LivroController {

    static listarLivros = async (req, res, next) => {
        const buscaLivros = livros.find();
        req.resultado = buscaLivros;
        next();
    };

    static listarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findById(id);

            if (livroEncontrado != null) {
                res.status(200).json(livroEncontrado);
            } else {
                next(new NaoEncontrado("ID do livro não localizado"));
            }

        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            let livro = new livros(req.body);

            const livroResultado = await livro.save();
            const livroPopulado = await livroResultado;
            res.status(201).send(livroPopulado.toJSON());
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findByIdAndUpdate(id, req.body);

            if (livroEncontrado != null) {
                res.status(200).json({ message: "livro atualizado" });
            } else {
                next(new NaoEncontrado("ID do livro não localizado"));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findByIdAndDelete(id);

            if (livroEncontrado != null) {
                res.status(200).json({ message: "Livro excluído com sucesso" });
            } else {
                next(new NaoEncontrado("ID do livro não localizado"));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static listarLivrosPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const livrosPorEditora = livros.find(busca);
                req.resultado = livrosPorEditora;
                next();
            } else {
                res.status(200).send([]);
            }


        } catch (erro) {
            next(erro);
        }
    };

};

async function processaBusca(parametro) {
    const { editora, titulo, minPaginas, maxPaginas, minPreco, maxPreco, nomeAutor } = parametro;
    let busca = {};

    if (editora) busca.editora = { $regex: editora, $options: "i" };;
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

    if (minPaginas) busca.paginas = { $gte: parseInt(minPaginas) };
    if (maxPaginas) busca.paginas = { $lte: parseInt(maxPaginas) };
    if (maxPaginas && minPaginas) busca.paginas = { $lte: parseInt(maxPaginas), $gte: parseInt(minPaginas) };

    if (minPreco) busca.preco = { $gte: parseInt(minPreco) };
    if (maxPreco) busca.preco = { $lte: parseInt(maxPreco) };
    if (maxPreco && minPreco) busca.preco = { $lte: parseInt(maxPreco), $gte: parseInt(minPreco) };

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });

        if (autor != null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
    }

    return busca;
}

export default LivroController;