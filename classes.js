class NaoEstrela {
    constructor(id, nome, massaTerrestre, descricao, idade, rotacao) {
        this.id = id
        this.nome = nome
        this.massaTerrestre = massaTerrestre
        this.descricao = descricao
        this.idade = idade
        this.rotacao = rotacao
    }

    txtLine() {
        return this.nome
    }
    naoEstrelaMens() {
        return "<ul><li><b>Identificador</b>: " + this.id + "</li><hr><li><b>Nome</b>: " + this.nome + "</li><li><b>Massa (em massas terrestres)</b>: " + this.massaTerrestre + "</li><li><b>Descrição</b>:" + this.descricao + "</li><li><b>Idade</b>: " + this.idade + "</li><li><b>Rotação (em dias terrestres)</b>: " + this.rotacao + "</b></li>"
    }
}
class Planeta extends NaoEstrela {
    constructor(id, nome, massaTerrestre, descricao, idade, rotacao, constit, existAneis, cor) {
        super(id, nome, massaTerrestre, descricao, idade, rotacao)
        this.constit = constit
        this.existAneis = existAneis
        this.cor = cor
    }

    addValores(dados) {
        this.nome = dados[0]
        this.massaTerrestre = dados[1]
        this.descricao = dados[2]
        this.idade = dados[3]
        this.rotacao = dados[4]
        this.constit = dados[5]
        this.existAneis = dados[6]
        this.cor = dados[7]
    }
    returnValores(newcond) {
        if(newcond) { //---> Retornar valores para edição
            return new Array([this.nome, this.massaTerrestre, this.descricao, this.idade, this.rotacao], [[0], this.constit, this.existAneis, this.cor, []])
        } else if(!newcond) { //---> Retornar valores para armazenar no navegador
            return new Array(this.id, this.nome, this.massaTerrestre, this.descricao, this.idade, this.rotacao, this.constit, this.existAneis, this.cor)
        }
    }
    txtMens() {
        let constitui = "indefinido"
        if(this.constit.length > 0) {
            constitui = valoresList[0][1][this.constit[0]][0]
        } return (this.naoEstrelaMens() + "<li><b>Constituição da superfície</b>: " + constitui + "</li><li><b>Existência de anéis</b>: " + valoresList[0][2][this.existAneis[0]][0] + "</li><li><b>Cor do planeta</b>: " + valoresList[0][3][this.cor[0]][1] + "</li></ul>")
    }
}
class Asteroide extends NaoEstrela {
    constructor(id, nome, massaTerrestre, descricao, idade, rotacao, tipoSolido) {
        super(id, nome, massaTerrestre, descricao, idade, rotacao)
        this.tipoSolido = tipoSolido
    }

    addValores(dados) {
        this.nome = dados[0]
        this.massaTerrestre = dados[1]
        this.descricao = dados[2]
        this.idade = dados[3]
        this.rotacao = dados[4]
        this.tipoSolido = dados[5]
    }
    returnValores(newcond) {
        if(newcond) {
            return new Array([this.nome, this.massaTerrestre, this.descricao, this.idade, this.rotacao], [[1], [], [], [], this.tipoSolido])
        } else if(!newcond) {
            return new Array(this.id, this.nome, this.massaTerrestre, this.descricao, this.idade, this.rotacao, this.tipoSolido)
        }
    }
    txtMens() {
        return (this.naoEstrelaMens() + "<li><b>Tipo do sólido</b>: " + valoresList[0][4][this.tipoSolido[0]][0] + "</li></ul>")
    }
}
class Estrela {
    constructor(id, nome, descricao, massaJup, magnitudeAbs, tipo, cor) {
        this.id = id
        this.nome = nome
        this.descricao = descricao
        this.massaJup = massaJup
        this.magnitudeAbs = magnitudeAbs
        this.tipo = tipo
        this.cor = cor
    }

    addValores(dados) {
        this.nome = dados[0]
        this.descricao = dados[1]
        this.magnitudeAbs = dados[2]
        this.massaJup = dados[3]
        this.tipo = dados[4]
        this.cor = dados[5]
    }
    returnValores(newcond) {
        if(newcond) { //---> Retornar valores para edição
            let cor1 = []
            let cor2 = []
            let cor3 = []
            let cor4 = []
            let Tipo = this.tipo[0]
            if(Tipo == 0) {
                cor1 = this.cor
            } else if(Tipo == 1) {
                cor2 = this.cor
            } else if(Tipo == 2) {
                cor3 = this.cor
            } else if(Tipo == 3) {
                cor4 = this.cor
            } return new Array([this.nome, this.descricao, this.magnitudeAbs, this.massaJup], [this.tipo, cor1, cor2, cor3, cor4])
        } else if(!newcond) { //---> Retornar valores para armazenar no navegador
            return new Array(this.id, this.nome, this.descricao, this.magnitudeAbs, this.massaJup, this.tipo, this.cor)
        }
    }
    txtLine() {
        return this.nome
    }
    txtMens() {
        return "<ul><li><b>Identificador</b>: " + this.id + "</li><hr><li><b>Nome</b>: " + this.nome + "</li><li><b>Descrição</b>: " + this.descricao + "</li><li><b>Magnitude absoluta</b>: " + this.magnitudeAbs + "</li><li><b>Massa (em massas jupiterianas)</b>: " + this.massaJup + "</li><li><b>Tipo de estrela</b>: " + valoresList[1][0][this.tipo[0]][0] + "</li><li><b>Cor da estrela</b>: " + valoresList[1][this.tipo[0] + 1][this.cor[0]][1] + "</li></ul>"
    }
}
class Sistema {
    constructor(id, nome, descricao, naoEstrelas, estrelas) {
        this.id = id
        this.nome = nome
        this.descricao = descricao
        this.naoEstrelas = naoEstrelas
        this.estrelas = estrelas
    }

    addValores(dados) {
        this.nome = dados[0]
        this.descricao = dados[1]
        this.naoEstrelas = dados[2]
        this.estrelas = dados[3]
    }
    returnValores(newcond) {
        if(newcond) { //---> Retornar valores para edição
            return new Array([this.nome, this.descricao], [this.naoEstrelas, this.estrelas])
        } else if(!newcond) { //---> Retornar valores para armazenar no navegador
            return new Array(this.id, this.nome, this.descricao, this.naoEstrelas, this.estrelas)
        }
    }
    txtLine() {
        return this.nome
    }
    txtMens() {
        let result = "<ul><li><b>Identificador</b>: " + this.id + "</li><hr><li><b>Nome do sistema</b>: " + this.nome + "</li><li><b>Descrição</b>: " + this.descricao + "</li><li><b>Corpos não-estelares</b>: "
        if(this.naoEstrelas.length == 0) {
            result += "Não existe estes corpos aqui!"
        } else {
            forEachLista(this.naoEstrelas, (elem, index) => {
                result += allLists[0][indID(elem, 0)].txtLine() + " (Id: " + elem + ")"
                if(index !== this.naoEstrelas.length - 1) {
                    result += ", "
                }
            })
        } result += "</li><li><b>Estrelas</b>: "
        forEachLista(this.estrelas, (elem, index) => {
            result += allLists[1][indID(elem, 1)].txtLine() + " (Id: " + elem + ")"
            if(index !== this.estrelas.length - 1) {
                result += ", "
            }
        }); return result
    }
}
class Galaxia {
    constructor(id, nome, descricao, sistemas) {
        this.id = id
        this.nome = nome
        this.descricao = descricao
        this.sistemas = sistemas
    }

    addValores(dados) {
        this.nome = dados[0]
        this.descricao = dados[1]
        this.sistemas = dados[2]
    }
    returnValores(newcond) {
        if(newcond) { //---> Retornar valores para edição
            return new Array([this.nome, this.descricao], [this.sistemas])
        } else if(!newcond) { //---> Retornar valores para armazenar no navegador
            return new Array(this.id, this.nome, this.descricao, this.sistemas)
        }
    }
    txtLine() {
        return this.nome
    }
    txtMens() {
        let result = "<ul><li><b>Identificador</b>: " + this.id + "</li><hr><li><b>Nome da galáxia</b>: " + this.nome + "</li><li><b>Descrição</b>: " + this.descricao + "</li><li><b>Sistemas</b>: "
        forEachLista(this.sistemas, (elem, index) => {
            result += allLists[2][indID(elem, 2)].txtLine() + " (Id: " + elem + ")"
            if(index !== this.sistemas.length - 1) {
                result += ", "
            }
        }); result += "</li></ul>"
        return result
    }
}
class classMens {
    constructor(mensdiv1) {
        this.mensdiv1 = mensdiv1 //---> Variáviel que recebe a "div" de mensagem (onde a mensagem será adicionada)
        this.setMens = false //---> Varíável para a função temporizadora "setTimeout"
        this.condMens = false //---> Condição relacionada à existÊncia de uma mensagem ou não
    }

    addDivMens(content, index) { //---> Adicionar uma mensagem na "div" de mensagem
        if(this.condMens == false) {
            this.div1 = document.createElement("div")
            let divPrinc1 = document.createElement("div")
            let condFlex = false
            if(index !== undefined) {
                divPrinc1.innerHTML = allLists[index][indID(content, index)].txtMens()
            } else {
                divPrinc1.innerHTML = content
            } this.div1.appendChild(divPrinc1)
            this.div2 = document.createElement("div")
            this.mensdiv1.appendChild(this.div1)
            this.mensdiv1.appendChild(this.div2)
            this.setMens = setTimeout(function() {
                this.condMens = true
                this.div1.style.bottom = "20px"
                this.div1.style.opacity = 1
                if(condFlex) {
                    this.div1.style.display = "flex"
                } this.div2.style.bottom = "0px"
                this.div2.style.opacity = 1
            }.bind(this), 50)
        } else {
            clearTimeout(this.setMens)
            this.div1.style.bottom = "20px"
            this.div1.style.opacity = 1
            this.div2.style.bottom = "0px"
            this.div2.style.opacity = 1
        }
    }; removeDivMens() { //---> Remover uma mensagem na "div" de mensagem
        if(!this.condMens) {
            clearTimeout(this.setMens)
            this.mensdiv1.removeChild(this.div1)
            this.mensdiv1.removeChild(this.div2)
        } else {
            this.div1.style.bottom = "0px"
            this.div1.style.opacity = 0
            this.div2.style.bottom = "-20px"
            this.div2.style.opacity = 0
            this.setMens = setTimeout(function() {
                this.condMens = false
                this.mensdiv1.removeChild(this.div1)
                this.mensdiv1.removeChild(this.div2)
            }.bind(this), 200)
        }
    }
}