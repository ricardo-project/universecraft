/*FUNÇÃO QUE CRIA UM NOVO ELEMENTO, ADICIONA NO VETOR PRINCIPAL E CRIA UM ITEM NA LISTA!!!*/
function createNewElem(index, lista, newid, condElem) {
    let newElem = newElemFunct[index](lista)
    newElem.addValores(lista)
    newElem.id = newid
    allLists[index].push(newElem)
    let newDivLine = document.createElement("div")
    newDivLine.innerHTML = '<div class="mens mensPurple mensLeft"></div><div class="tipos__tipo tipoElem"><div class=tipos__tipo__img><img src="img/' + imageFunct[index](newElem) + '.png"></div><img src="img/x-icon.png" class="iconsElem iconsElem--delete"><img src="img/uptade.png" class="iconsElem iconsElem--edit"><p>' + newElem.txtLine() + '</p></div>'
    newDivLine.className = "elemLista"
    if(condElem) {
        relationCRUD(index, (indexLista, index2) => {
            let divList = divsValoresList[indexLista][index2]
            createItemHoriz(indexLista, index2, newid, "<img src='img/" + imageFunct[index](newElem) + ".png' style='height: 100px'>", newid, divList[2], divList[3], true, index)
            if(informsList[indexLista][index2][0] == 2) {
                valoresList[indexLista][index2][1].push(newid)
            }
        })
    }
    let newDivItem = newDivLine.querySelector(".tipoElem")
    let newDivMens = newDivLine.querySelector(".mens")
    let iconDelete = newDivLine.querySelector(".iconsElem--delete")
    let iconEdit = newDivLine.querySelector(".iconsElem--edit")
    let conjMens = new classMens(newDivMens)
    newDivItem.onmouseenter = function() {
        conjMens.addDivMens(newElem.id, index)
        this.style.opacity = 1
        let maxW = newDivLine.scrollWidth - 40
        if(this.scrollWidth > maxW) {
            this.style.width = maxW + "px"
        } else {
            this.style.width = this.scrollWidth + "px"
        }
    };
    newDivItem.onmouseleave = function() {
        conjMens.removeDivMens()
        this.style.opacity = 0.4
        this.style.width = "100px"
    }; iconDelete.onclick = () => {
        marcarDelete.bind(newDivItem)(newElem.id, index)
    }; iconEdit.onclick = () => {
        functEditar(newElem.id, index, newDivItem)
    };
    Listas[index].appendChild(newDivLine)
} /*FUNÇÃO QUE ALTERA UM ELEMENTO JÁ EXISTENTE NO VETOR PRINCIPAL, ALÉM DE SEU RESPECTIVO ITEM NA LISTA*/
function updateNewElem(index, lista) {
    let newElem = newElemFunct[index](lista)
    newElem.addValores(lista)
    newElem.id = numEdit[index]
    let itemEdit = allItensLista[index][indID(numEdit[index], index)]
    itemEdit.querySelector(".tipos__tipo__img > img").src = "img/" + imageFunct[index](newElem) + ".png"
    itemEdit.querySelector("p").textContent = newElem.txtLine()
    allLists[index][indID(numEdit[index], index)] = newElem
    relationCRUD(index, (indexLista, index2) => {
        if(informsList[indexLista][index2][0] == 2) {
            existOnList(valoresList[indexLista][index2][1], numEdit[index], (indEdit) => {
                divsValoresList[indexLista][index2][1][indEdit].querySelector("img").src = "img/" + imageFunct[index](newElem) + ".png"
            }, () => {})
        } else if(informsList[indexLista][index2][0] == true) {
            divsValoresList[indexLista][index2][1][indID(numEdit[index], index)].querySelector("img").src = "img/" + imageFunct[index](newElem) + ".png"
        }
    }); returnModoAdd(index, false, true, false)
} /*FUNÇÃO QUE FAZ A EXCLUSÃO DE ITENS*/
function deleteItens(index) {
    indexDelete[index].sort(function(a, b) { return a - b})
    let valoresRlt
    let condNotDelete = false
    relationCRUD(index, (indexLista, index2) => {
        if(numEdit[indexLista] !== -1) {
            condNotDelete = true
        } valoresRlt = [informsList[indexLista][index2][0], indexLista, index2]
    }); if(condNotDelete) {
        mostrarAvisoCRUD("x-icon", "Lista dinâmica em CRUD em edição!", true)
        return
    } let itensDelete = new Array()
    forEachLista(indexDelete[index], (elem2, index2) => {
        let indice = indID(elem2, index)
        if(valoresRlt !== undefined) { //---> DELETAR ITENS NAS LISTAS RELACIONADAS AO CRUD!
            let divListRlt = divsValoresList[valoresRlt[1]][valoresRlt[2]]
            let vlrList = valoresList[valoresRlt[1]][valoresRlt[2]]
            if(valoresRlt[0] == true) { //---> A lista é dinâmica irremovível
                divListRlt[2].removeChild(divListRlt[1][indice])
                forEachLista(allLists[valoresRlt[1]], (elem3) => {
                    let listaRlt = atribArray[vlrList[2]](elem3)
                    existOnList(listaRlt, elem2, (index4) => {
                        listaRlt.splice(index4, 1)
                    }, () => {})
                })
            } else if(valoresRlt[0] == 2) { //---> A lista é dinâmica removível
                existOnList(vlrList[1], elem2, (indNotAdd) => {
                    divListRlt[2].removeChild(divListRlt[1][indNotAdd])
                    vlrList[1].splice(indNotAdd, 1)
                }, () => {
                    forEachLista(allLists[valoresRlt[1]], (elem3) => {
                        let listaRlt = atribArray[vlrList[2]](elem3)
                        existOnList(listaRlt, elem2, (index4) => {
                            listaRlt.splice(index4, 1)
                        }, () => {})
                    })
                })
            } existOnList(divListRlt[0], elem2, (indMarc) => {
                divListRlt[0].splice(indMarc, 1)
            }, () => {})
        } forEachLista(informsList[index], (elem3, index3) => {
            if(elem3[0] == 2) {
                let divList = divsValoresList[index][index3]
                let listaRlt = atribArray[valoresList[index][index3][2]](allLists[index][indID(elem2, index)])
                let originIndex = valoresList[index][index3][0]
                forEachLista(listaRlt, (elem4) => {
                    createItemHoriz(index, index3, elem4, "<img src='img/" + imageFunct[originIndex](allLists[originIndex][indID(elem4, originIndex)]) + ".png' style='height: 100px'>", elem4, divList[2], divList[3], true, originIndex)
                    valoresList[index][index3][1].push(elem4)
                });
            }
        })
        let itemLista = allItensLista[index][indice + index2]
        itensDelete.push(itemLista)
        itemLista.style.padding = "0px"
        itemLista.style.height = "0px"
        itemLista.parentNode.style.margin = "0px"
        allLists[index].splice(indice, 1)
    })
    setTimeout(function() {
        forEachLista(itensDelete, (elem2) => {
            Listas[index].removeChild(elem2.parentNode)
        })
    }, 400)
    indexDelete[index] = []
    if(allLists[index].length == 0) {
        SERIAL[index] = 0
    } pDelete[index].style.height = "0px"
    playAud("Water Drop")
} /*FUNÇÃO QUE DEFINE SE UM CRUD TEM SEUS ITENS NUMA LISTA DINÂMICA DE OUTRO CRUD!!!*/
function relationCRUD(indice, funcao) {
    forEachLista(informsList, (elem, index) => {
        forEachLista(elem, (elem2, index2) => {
            if(elem2[0] > 0 && valoresList[index][index2][0] == indice) {
                funcao(index, index2)
            }
        })
    })
} /*FUNÇÃO QUE FAZ UM CRUD RETORNAR AO MODO DE ADIÇÃO*/
function returnModoAdd(index, newcond, newcond2, newcond3) {
    if(newcond3) {
        let oldElem = allLists[index][indID(numEdit[index], index)].returnValores(true)[1]
        forEachLista(informsList[index], (elem2, index2) => { //---> Verifica a existência de listas dinâmicas removíveis
            let divList = divsValoresList[index][index2]
            if(elem2[0] == 2) {
                for(let a = 0; a < oldElem[index2].length; a++) {
                    divList[2].removeChild(divList[1][divList[1].length - 1])
                    let itensToAdd = valoresList[index][index2][1]
                    existOnList(divList[0], itensToAdd[itensToAdd.length - 1], (indice) => {
                        divList[0].splice(indice, 1)
                    }, () => {})
                    itensToAdd.splice(itensToAdd.length - 1, 1)
                }
            }
        });
    } existOnList(indexDelete[index], numEdit[index], () => { }, () => { //---> Se ele NÃO foi selecionado para ser deletado
        allItensLista[index][indID(numEdit[index], index)].style.background = "rgb(255,109,24)"
    });
    if(newcond2) {
        numEdit[index] = -1 //---> (-1) é um valor para um CRUD que indica a inexistência de elementos em edição
    } if(newcond) {
        changeSect(1)
    } setTimeout(function() {
        botaoCancelar[index].style.display = "none"
        botaoAdd[index].value = "Adicionar"
    }, newcond*600)
} /*FUNÇÃO QUE ATIVA O MODO EDIÇÃO, OU SEJA, UM ELEMENTO JÁ EXISTENTE VAI SER EDITADO!!!*/
function functEditar(newid, index, divItem) {
    if(numEdit[index] == -1) {
        numEdit[index] = newid
        botaoAdd[index].value = "Editar"
        botaoCancelar[index].style.display = "inline"
        existOnList(indexDelete[index], newid, () => {},
        function() {
            divItem.style.background = "rgb(122,187,240)"
        }); changeSect(0)
        let elemUpdate = allLists[index][indID(newid, index)]
        let valoresElem = elemUpdate.returnValores(true)
        forEachLista(valoresElem[0], (elem2, index2) => { //---> Reinserindo os textos nos campos de texto
            camposTxt[index][index2].value = elem2
        }); desmarcarListas(index) //---> Desmarcando as opções
        forEachLista(valoresElem[1], (elem2, index2) => { //---> Marcando as opções existentes no elemento
            let conjLista = divsValoresList[index][index2]
            let condTipo = informsList[index][index2][0]
            existOnList(conjLista[2].classList, "listaVerti__conj", () => {
                forEachLista(elem2, (elem3) => {
                    conjLista[1][positValor(elem3, condTipo, index, index2)].style.background = "transparent"
                    conjLista[0].push(elem3)
                })
            }, () => { })
            existOnList(conjLista[2].classList, "listaHoriz", () => {
                if(condTipo <= 1) {
                    forEachLista(elem2, (elem3) => {
                        conjLista[1][positValor(elem3, condTipo, index, index2)].style.filter = "brightness(1)"
                        conjLista[0].push(elem3)
                    })
                } else if(condTipo == 2) {
                    let divList = divsValoresList[index][index2]
                    forEachLista(elem2, (elem3) => {
                        valoresList[index][index2][1].push(elem3)
                        let indOrigin = valoresList[index][index2][0]
                        createItemHoriz(index, index2, elem3, "<img src='img/" + imageFunct[indOrigin](allLists[indOrigin][indID(elem3, indOrigin)]) + ".png' style='height: 100px'>", elem3, divList[2], divList[3], 2, indOrigin)
                        divList[0].push(elem3)
                        divList[1][divList[1].length - 1].style.filter = "brightness(1)"
                    })
                }
            }, () => { })
            existOnList(conjLista[2].classList, "color", () => {
                forEachLista(elem2, (elem3) => {
                    conjLista[1][positValor(elem3, condTipo, index, index2)].style.borderColor = "#ffe2df"
                    conjLista[0].push(elem3)
                })
            }, () => { })
        })

        functExtra[index]() //---> Função extra para o modo edição conforme cada CRUD
        /*AQUI COMO O FORMULÁRIO SE REESTRUTURÁ AO SE ATIVAR O MODO EDIÇÃO*/
    } else if(numEdit[index] == newid) {
        mostrarAvisoCRUD("interrog", "Este elemento já está sendo editado!", true)
    } else {
        mostrarAvisoCRUD("interrog", "Outro elemento está sendo editado!", true)
    }
} /*FUNÇÃO QUE FAZ A DESMARCAÇÃO DE TODAS AS LISTAS (PARA REINICIAR TUDO DE NOVO)*/
function desmarcarListas(index) {
    forEachLista(divsValoresList[index], (elem2, index2) => {
        let condTipo = informsList[index][index2][0]
        existOnList(elem2[2].classList, "listaVerti__conj", () => {
            forEachLista(elem2[0], (elem3) => {
                elem2[1][positValor(elem3, condTipo, index, index2)].style.background = "#f6867a"
            })
        }, () => { })
        existOnList(elem2[2].classList, "listaHoriz", () => {
            forEachLista(elem2[0], (elem3) => {
                elem2[1][positValor(elem3, condTipo, index, index2)].style.filter = "brightness(0.6)"
            })
        }, () => { })
        existOnList(elem2[2].classList, "color", () => {
            forEachLista(elem2[0], (elem3) => {
                elem2[1][positValor(elem3, condTipo, index, index2)].style.borderColor = "#fba69d"
            })
        }, () => { })
        elem2[0] = new Array()
    })
} /*FUNÇÃO QUE MARCA UM ELEMENTO PARA SER DELETADO*/
function marcarDelete(valor, indice) {
    existOnList(indexDelete[indice], valor, (indList) => { //---> Se ele já existe na lista, excluí-lo da mesma (não será marcado para deletar)!
        indexDelete[indice].splice(indList, 1)
        if(indexDelete[indice].length == 0) {
            pDelete[indice].style.height = "0px"
        } if(numEdit[indice] == valor) {
            this.style.background = "rgb(122,187,240)"
        } else {
            this.style.background = "rgb(255,109,24)"
        }
    }, () => { //---> Se não estiver, adicioná-lo na lista!
        if(indexDelete[indice].length == 0) {
            pDelete[indice].style.height = pDelete[indice].scrollHeight + "px"
        } indexDelete[indice].push(valor)
        this.style.background = "rgb(236,24,66)"
    })
} /*FUNÇÃO QUE CRIA UM AVISO NO CANTO INFERIOR ESQUERDO DA TELA (SEJA PARA ERRO OU PARA ADIÇÃO/ATUALIZAÇÃO DE ELEMENTO)*/
function mostrarAvisoCRUD(nomeImg, frase, newcond) {
    if(newcond) {
        playAud("Error")
    } let newDivMens = document.createElement("div")
    let newImage = document.createElement("img")
    let newP = document.createElement("p")
    newDivMens.className = "allCruds__mensagem"
    newImage.src = "img/" + nomeImg + ".png"
    newP.textContent = frase
    newDivMens.appendChild(newImage)
    newDivMens.appendChild(newP)
    artcCRUD.appendChild(newDivMens)
    setTimeout(function() {
        newDivMens.style.left = "10px"
        setTimeout(function() {
            newDivMens.style.background = "rgb(130,36,4)"
            newDivMens.style.width = (newDivMens.scrollWidth + 14) + "px"
            setTimeout(function() {
                newDivMens.style.background = "rgb(100,30,0)"
                newDivMens.style.width = "96px"
                setTimeout(function() {
                    newDivMens.style.left = "-96px"
                    setTimeout(function() {
                        artcCRUD.removeChild(newDivMens)
                    }, 300)
                }, 300)
            }, 2300)
        }, 300)
    }, 50)
} /*FUNÇÃO DE EFEITO SONORO*/
function playAud(nameAud) {
    if(condSound) {
        new Audio("sounds/" + nameAud + ".mp3").play()
    }
} /*FUNÇÃO QUE REDIMENSIONA O ELEMENTO "CANVAS" CONFORME A TELA TAMBÉM É REDIMENSIONADA!!!*/
function redimensCnv(newcond) {
    W = window.innerWidth
    H = window.innerHeight
    if(W < H) {
        maiorCompr = W*200/700
    } else {
        maiorCompr = H*200/700
    } cnv.width = W
    cnv.height = H
    clearInterval(setCnv)
    if(newcond) {
        for(let h = 0; h < 60; h++) {
            points.push([Math.random(), Math.random()])
            constAng.push(3*Math.random() - 1.5)
            velocPoint.push(15*(1 + Math.random())*(2*Math.round(Math.random()) - 1)/100)
        }
    } drawBack()
    setCnv = setInterval(() => {
        ctx.clearRect(0, 0, W, H)
        drawBack()
    }, 20)
} /*FUNÇÃO QUE FAZ O DESENHO DA REDE DE PONTOS NO ELEMENTO "CANVAS"*/
function drawBack() {
    forEachLista(points, (elem, index) => {
        for(let g = index + 1; g < points.length; g++) {
            let constDist = 0
            let valores = new Array(elem[0], elem[1], points[g][0], points[g][1])
            let dist = pot(pot(W*(valores[0] - valores[2]), 2) + pot(H*(valores[1] - valores[3]), 2), 0.5)
            if(dist < maiorCompr) {
                constDist = 1 - dist/maiorCompr
                ctx.strokeStyle = "rgb(255,255,255," + pot(alpha(index)*alpha(g)*constDist, 0.5) + ")"
                ctx.beginPath()
                ctx.lineTo(W*valores[0], H*valores[1])
                ctx.lineTo(W*valores[2], H*valores[3])
                ctx.stroke()
            }
        }
    }); ctx.fillStyle = "white"
    forEachLista(points, (elem, index) => {
        ctx.beginPath()
        ctx.arc(W*elem[0], H*elem[1], 1.5, 0, 2*Math.PI)
        ctx.fill()
        movLinear(elem, index)
    });
} /*FUNÇÃO QUE FAZ O CÁLCULO DAS NOVAS POSIÇÕES DOS PONTOS NA REDE*/
function movLinear(elem, index) {
    elem[0] += velocPoint[index]/W
    elem[1] += constAng[index]*velocPoint[index]/H
    if(elem[0] < 0) {
        elem[0] = 1
    } else if(elem[0] > 1) {
        elem[0] = 0
    } if(elem[1] < 0) {
        elem[1] = 1
    } else if(elem[1] > 1) {
        elem[1] = 0
    }
} /*FUNÇÃO QUE DETERMINA UM VALOR DE OPACIDADE DAS LINHAS ENTRE OS PONTOS CONFORME A POSIÇÃO DOS PONTOS NA TELA*/
function alpha(valor) {
    let constAlpha = 1
    let Wp = points[valor][0]
    let Hp = points[valor][1]
    if(Wp < 1/4) {
        let propW = Wp/(1/4)
        if(Hp < 1/4) {
            let propH = Hp/(1/4)
            if(propH > propW) {
                constAlpha = propW
            } else {
                constAlpha = propH
            }
        } else if(Hp > 3/4) {
            let propH = (1 - Hp)/(1/4)
            if(propH > propW) {
                constAlpha = propW
            } else {
                constAlpha = propH
            }
        } else {
            constAlpha = propW
        }
    } else if(Wp > 3/4) {
        let propW = (1 - Wp)/(1/4)
        if(Hp < 1/4) {
            let propH = Hp/(1/4)
            if(propH > propW) {
                constAlpha = propW
            } else {
                constAlpha = propH
            }
        } else if(Hp > 3/4) {
            let propH = (1 - Hp)/(1/4)
            if(propH > propW) {
                constAlpha = propW
            } else {
                constAlpha = propH
            }
        } else {
            constAlpha = propW
        }
    } else {
        if(Hp < 1/4) {
            constAlpha = Hp/(1/4)
        } else if(Hp > 3/4) {
            constAlpha = (1 - Hp)/(1/4)
        }
    } if(constAlpha < 0) {
        constAlpha = 0
    } else if(constAlpha > 1) {
        constAlpha = 1
    } return constAlpha
} /*FUNÇÃO QUE VERIFICA OS ELEMENTOS ADICIONADOS NO LOCALSTORAGE*/
function isList() {
    if(storageList !== null) {
        storageList = JSON.parse(storageList)
        forEachLista(storageList, (elem, index) => {
            forEachLista(elem, (elem2) => {
                let oldID = elem2[0]
                elem2.splice(0, 1)
                createNewElem(index, elem2, oldID, false)
            })
        })
    }
} /*FUNÇÃO QUE VERIFICA OS SERIAIS ADICIONADOS NO LOCALSTORAGE*/
function isSERIAL() {
    if(storageSERIAL !== null) {
        SERIAL = JSON.parse(storageSERIAL)
    }
} /*FUNÇÃO QUE VERIFICA OS VALORES DE LISTA ADICIONADOS NO LOCALSTORAGE*/
function isValoresList() {
    if(storageValoresList !== null) {
        valoresList = JSON.parse(storageValoresList)
    }
} /*FUNÇÃO QUE CRIA UM NOVO ITEM DE LISTA DE COR*/
function createItemColor(index, index2, valor, elems, divColor) {
    let newDiv = document.createElement("div")
    newDiv.className = "color__div"
    let divMens = document.createElement("div")
    let newDivColor = document.createElement("div")
    divMens.className = "mens mensPurple"
    newDivColor.className = "color__div__cor"
    newDivColor.style.background = elems[0]
    let conjMens = new classMens(divMens)
    newDivColor.onmouseenter = function() {
        conjMens.addDivMens(elems[1])
    }; newDivColor.onmouseleave = function() {
        conjMens.removeDivMens()
    }; newDivColor.onclick = function() {
        marcarOpt.bind(newDivColor)(index, index2, valor, false, false)
    }; newDiv.appendChild(divMens)
    newDiv.appendChild(newDivColor)
    divColor.appendChild(newDiv)
} /*FUNÇÃO QUE CRIA UM NOVO ITEM DE LISTA HORIZONTAL*/
function createItemHoriz(index, index2, valor, image, mens, divHoriz, divMensConj, newcond, indexOrigin) {
    let newDiv = document.createElement("div")
    newDiv.className = "listaHoriz__item"
    newDiv.innerHTML = image
    let conjMens = new classMens(divMensConj)
    if(newcond) { //---> Mensagem de item dinâmico
        newDiv.onmouseenter = function() {
            conjMens.addDivMens(mens, indexOrigin)
        }
    } else { //---> Mensagem de item fixo
        newDiv.onmouseleave = function() {
            conjMens.addDivMens(mens)
        }
    } newDiv.onmouseleave = function() {
        conjMens.removeDivMens()
    }; newDiv.onclick = function() {
        marcarOpt.bind(newDiv)(index, index2, valor, 2, newcond)
    }; divHoriz.appendChild(newDiv)
} /*FUNÇÃO QUE CRIA UM NOVO ITEM DE LISTA VERTICAL*/
function createItemVerti(index, index2, valor, texto, mens, conjItens, divMensConj, newcond, indexOrigin) {
    let newDiv = document.createElement("div")
    newDiv.className = "listaVerti__conj__div"
    newDiv.textContent = texto
    let conjMens = new classMens(divMensConj)
    if(newcond) { //---> Mensagem de item dinâmico
        newDiv.onmouseenter = function() {
            conjMens.addDivMens(mens, indexOrigin)
        }
    } else { //---> Mensagem de item fixo
        newDiv.onmouseenter = function() {
            conjMens.addDivMens(mens)
        }
    } newDiv.onmouseleave = function() {
        conjMens.removeDivMens()
    }; newDiv.onclick = function() {
        marcarOpt.bind(newDiv)(index, index2, valor, true, newcond)
    }; conjItens.appendChild(newDiv)
} /*FUNÇÃO QUE DEFINE AS POSIÇÕES DE VALORES DAS LISTAS*/
function positValor(valor, newcond2, index, index2) {
    if(newcond2 == false) { //---> Lista fixa
        return valor
    } else if(newcond2 == true) { //---> Lista dinâmica irremovível
        return indID(valor, valoresList[index][index2][0])
    } else if(newcond2 == 2) { //---> Lista dinâmica removível
        return indNum(valoresList[index][index2][1], valor)
    }
} /*FUNÇÃO QUE MARCA UMA OPÇÃO DE UMA LISTA*/
function marcarOpt(index, index2, valor, newcond, newcond2) {
    let vetOpt = divsValoresList[index][index2]
    let indexVet = indNum(vetOpt[0], valor)
    if(indexVet == -1) { //---> Se clicou numa opção não marcada na lista, ela DEVERÁ SER MARCADA!
        let limite = informsList[index][index2][1]
        if(vetOpt[0].length == limite) { //---> Se o limite foi atingido, a última opção marcada será desmarcada!
            let indOpt = positValor(vetOpt[0][0], newcond2, index, index2)
            if(newcond == false) { //---> Lista de cor
                vetOpt[1][indOpt].style.borderColor = "#fba69d"
            } else if(newcond == true) { //---> Lista vertical
                vetOpt[1][indOpt].style.background = "#f6867a"
            } else if(newcond == 2) { //---> Lista horizontal
                vetOpt[1][indOpt].style.filter = "brightness(0.6)"
            } vetOpt[0].shift()
        } vetOpt[0].push(valor)
        if(newcond == false) { //---> Se for uma lista de cor
            this.style.borderColor = "#ffe2df"
        } else if(newcond == true) { //---> Se for uma lista vertical
            this.style.background = "transparent"
        } else if(newcond == 2) { //---> Se for uma lista horizontal
            this.style.filter = "brightness(1)"
        }
    } else { //---> Se clicou numa opção já marcada na lista, ela será DESMARCADA!
        vetOpt[0].splice(indexVet, 1)
        if(newcond == false) { //---> Se for uma lista de cor
            this.style.borderColor = "#fba69d"
        } else if(newcond == true) { //---> Se for uma lista vertical
            this.style.background = "#f6867a"
        } else if(newcond == 2) {
            this.style.filter = "brightness(0.6)"
        }
    }
} /*FUNÇÃO QUE VALIDA UMA STRING (TIRA OS ESPAÇOS EXTRAS ENTRE AS PALAVRAS E FAZ UMA VERIFICAÇÃO)*/
function verifValue(valor, newcond, quant, space) {
    if(valor !== "") {
        let newvalor = ""
        let quantLetras = 0
        let quantSpace = -1
        let condSpace = false
        for(let h = 0; h < valor.length; h++) {
            let crct = valor.charAt(h)
            if(crct !== " ") {
                if(quantSpace == -1) {
                    quantSpace++
                } condSpace = false
                newvalor += crct
                existOnList(abc, crct.toLowerCase(), () => {
                    quantLetras++
                }, () => {})
                existOnList(number, crct, () => {
                    quantLetras++
                }, () => {})
            } else {
                if(!condSpace && quantSpace >= 0) {
                    condSpace = true
                    newvalor += " "
                    quantSpace++
                }
            }
        } if(newvalor.charAt(newvalor.length - 1) == " ") {
            newvalor = newvalor.substring(0, newvalor.length - 1)
            quantSpace--
        } if(newcond) {
            if(newvalor !== "") {
                if(quantLetras < quant) {
                    return ("Não atingiu mínimo de letras. Minímo: " + quant)
                } else {
                    if(space == true && quantSpace > 0) {
                        return "Não deve ter espaço entre as palavras!"
                    } else {
                        return [newvalor]
                    }
                }
            } else {
                return "Campo preenchido só com espaços!"
            }
        } else if(!newcond) {
            return [newvalor]
        }
    } else {
        if(newcond) {
            return "Nenhum dado inserido."
        } else if(!newcond) {
            return [""]
        }
    }
} /*VALIDAÇÃO DE UM VALOR: SE ELE É NÚMERO OU NÃO*/
function verifNumber(valor, min, max) {
    let float = Number(valor)
    if(valor !== "") {
        if(isNaN(float)) {
            return "Não consiste em um número!"
        } else {
            if(valor < min) {
                return ("Não deve ser menor que " + min + "!")
            } else if(valor > max) {
                return ("Não deve ser maior que " + max + "!")
            } else {
                return [float]
            }
        }
    } else {
        return "Vazio. Insira algo!"
    }
} function mostrarTipo(newcond) {
    iconsSct[newcond].style.display = "block"
    iconsSct[1 - newcond].style.display = "none"
    forEachLista(Forms, (elem) => {
        elem.style.display = vDisply[newcond]
    }); forEachLista(Listas, (elem) => {
        elem.style.display = vDisply[1 - newcond]
    });
} function openSects(newind) {
    if(condMR) {
        mostrarTipo(newind)
        condMR = false
        playAud("Fast Wind")
        sects[0].style.height = "100vh"
        setTimeout(() => {
            playAud("Fast Wind")
            sects[1].style.height = "100vh"
            setTimeout(() => {
                playAud("Fast Wind")
                sects[2].style.height = "100vh"
                setTimeout(() => {
                    playAud("Fast Wind")
                    sects[3].style.height = "100vh"
                    setTimeout(() => {
                        removeClass("transit1", 0, 3)
                        condMR = true
                    }, 600)
                }, 300)
            }, 300)
        }, 300)
    }
} function closeSects() {
    if(condMR) {
        condMR = false
        addClass("transit2", 0, 3)
        sects[3].style.height = "0vh"
        setTimeout(() => {
            playAud("Fast Wind")
            sects[2].style.height = "0vh"
            setTimeout(() => {
                playAud("Fast Wind")
                sects[1].style.height = "0vh"
                setTimeout(() => {
                    playAud("Fast Wind")
                    sects[0].style.height = "0vh"
                    setTimeout(() => {
                        playAud("Fast Wind")
                    }, 300)
                    setTimeout(() => {
                        removeClass("transit2", 0, 3)
                        addClass("transit1", 0, 3)
                        condMR = true
                    }, 600)
                }, 300)
            }, 300)
        }, 300)
    }
} function addClass(newclass, indIni, indFin) {
    for(let i = indIni; i <= indFin; i++) {
        sects[i].classList.add(newclass)
    }
} function removeClass(oldclass, indIni, indFin) {
    for(let i = indIni; i <= indFin; i++) {
        sects[i].classList.remove(oldclass)
    }
} /*FUNÇÃO QUE ALTERA PERIODICAMENTE A IMAGEM DE FUNDO DA PARTE INTRODUTÓRIA*/
function alterarFundo() {
    fundo.style.background = "url(" + urlsBck[indBck] + ") no-repeat center fixed"
    fundo.style.backgroundSize = "cover"
    indBck = (indBck + 1) % urlsBck.length
} /*FUNÇÃO QUE ALTERA A TELA DO CRUD PARA AS LISTAS, OU VICE-VERSA*/
function changeSect(index) {
    if(condMR) {
        condMR = false
        addClass("transit2", 3, 3)
        sects[3].style.height = "0vh"
        setTimeout(function() {
            playAud("Fast Wind")
            mostrarTipo(1 - index)
            removeClass("transit2", 3, 3)
            addClass("transit1", 3, 3)
            sects[3].scrollTo(0, 0)
            sects[3].style.height = "100vh"
            setTimeout(function() {
                removeClass("transit1", 3, 3)
                condMR = true
            }, 600)
        }, 600)
    }
} /*FUNÇÃO QUE ADICIONA EVENTOS DE MOUSE SOBRE AS DIVS DE TIPOS*/
function addFunctTipo(elem) {
    elem.onmouseenter = () => {
        elem.style.width = elem.scrollWidth + "px"
    }; elem.onmouseleave = () => {
        elem.style.width = "100px"
    };
} /*FUNÇÃO QUE ABRE A 5º SEÇÃO DO CABEÇALHO*/
function abrirMens(indice, indice2) {
    if(condMR) {
        if(indice == 0) {
            subMens[indice2].style.display = "block"
            subMens[1 - indice2].style.display = "none"
        } artcsMens[indice].style.display = "block"
        artcsMens[1 - indice].style.display = "none"
        condMR = false
        sects[4].style.height = "100vh"
        playAud("Fast Wind")
        setTimeout(function() {
            if(indice == 1) {
                imageIcons[0].onclick = function() {
                    returnModoAdd(indice2, false, false, true)
                    functIcon(indice2)
                }; imageIcons[1].onclick = function() {
                    indexDelete[indice2].splice(indNum(indexDelete[indice2], numEdit[indice2]), 1)
                    allItensLista[indice2][indID(numEdit[indice2], indice2)].style.background = "rgb(122,187,240)"
                    functIcon(indice2)
                }
            } removeClass("transit1", 4, 4)
            condMR = true
        }, 600)
    }
} /*FUNÇÃO QUE FECHA A 5º SEÇÃO DO CABEÇALHO*/
function fecharMens() {
    if(condMR) {
        condMR = false
        addClass("transit2", 4, 4)
        sects[4].style.height = "0vh"
        setTimeout(function() {
            playAud("Fast Wind")
        }, 300)
        setTimeout(function() {
            removeClass("transit2", 4, 4)
            addClass("transit1", 4, 4)
            condMR = true
        }, 600)
    }
} /*FUNÇÃO ADICIONADA PARA OS ÍCONES DA MENSAGEM DE EDIÇÃO*/
function functIcon(index) {
    deleteItens(index)
    fecharMens()
    imageIcons[0].onclick = function() {}
    imageIcons[1].onclick = function() {}
} /*FUNÇÃO QUE MOSTRA A DESCRIÇÃO DA APLICAÇÃO NA INTRODUÇÃO*/
function mostrarP() {
    setTimeout(function() {
        setInicial = setInterval(function() {
            numInicial++
            pInicial.textContent = mensInicial.substring(0, Math.floor(pot(Math.sin(numInicial*Math.PI/160), 0.65)*mensInicial.length))
            if(numInicial == 80) {
                clearInterval(setInicial)
            }
        }, 25)
    }, 600)
} /*FUNÇÃO GENÉRICA DE POTÊNCIA*/
function pot(base, exp) {
    return Math.pow(base, exp)
} /*FUNÇÃO GENÉRICA QUE RETORNA O PRIMEIRO ÍNDICE DE OCORRÊNCIA DE UM ELEMENTO EM UMA LISTA*/
function indNum(lista, valor) { //---> Para QUALQUER TIPO DE LISTA (Seja Array, Node List, HTML Collection, etc...)
    for(let k = 0; k < lista.length; k++) {
        if(lista[k] == valor) {
            return k
        }
    } return -1
} /*FUNÇÃO GENÉRICA QUE VERIFICA A EXISTÊNCIA DE UM ITEM NUMA LISTA E AS FUNÇÕES QUE SÃO ATIVADAS*/
function existOnList(lista, valor, funcao1, funcao2) {
    let indice = indNum(lista, valor)
    if(indice >= 0) {
        funcao1(indice) 
    } else {
        funcao2()
    }
}
