const Main = {

    init: function() {
        this.cacheSelectors()
        this.blindEvents()
    },

    cacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    blindEvents: function() {
        const self = this

        this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button){
            button.onclick =  self.Events.removeButton_click
        })
    },


    Events: {
        checkButton_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if (isDone) {
                li.classList.remove('done')
            } else { li.classList.add('done')
            }
        },

        inputTask_keypress: function(e) {
            const key = e.key
            const value = e.target.value

            if (key === 'Enter') {
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''

                this.cacheSelectors()
                this.blindEvents()
            }
        },

        removeButton_click: function(e) {
            let li = e.target.parentElement

            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }
    }
}

Main.init()

// CONST MAIN É COMO O CONTAINER DO HTML, TUDO ESTÁ DENTRO DELE
// PARA O CODE FUNCIONAR ENTÃO, É NECESSÁRIO CHAMAR O MAIN COMO UMA FUNÇÃO
// MAIN.INIT() - VARIAVEL.FUNÇÃO_INICIAR()

// O INIT ESTÁ ARMAZENANDO AS FUNÇÕES, OU SEJA TUDO OQUE FOR ACONTECER DEVE ESTAR DENTRO DO INIT
// O cSELECTORS ESTÁ BUSCANO AS INFORMAÇÕES DO HTML, PEGANDO AS CLASSES E PORTANDO PARA  VARIAVEIS DO JS VIA QUERY SELECTOR
//bEVENTS É ONDE ESTÁ ARMAZENADO O ENDEREÇO FUNCTIONS, USANDO AS VARIAVEIS TRAZIDAS PELO cSELECTORS

//EVENTS É ONDE ESTÃO AS CONDIÇÕES DAS FUNÇÕES
//O CAMINHO USADO PARA CHAMAR ELAS SÃO:
//ESSE-OBJ_EVENTS-VARIAVEL OU
//*THIS.EVENTS.CHECKBUTTON-CLICK

//*
//AS VEZES THIS PODE APRESENTAR UM ERRO, NO CONSOLE POR EXEMPLO, ELE TRAS O OBJETO WINDOM
// UMA FORMA SE CONSERTAR ISSO É CHAMANDO DIRETAMENTE A VARIAVEL CONST
// MAIN.EVENTS.CHECKBUTTON
// PORÉM PARA EVITAR ERROS EM PROJETOS GRANDES, PODE SERA UTIL DECLARAR OUTRA CONST PARA O THIS DENTRO DA FUNCTION ONDE ELE ESTÁ DANDO ERRO.

//----------------------------------

// BOA PRATICA NO FUNCTION DENTRO DE EVENTS.
// O ! VERIFICA A NEGAÇÃO DO VALOR PROCURADO
// O RETURN FAZ PARAR O PROCESSAMENTO ALI CASO TENHA ENCONTRADO AQUILO QUE PROCURA
// COM ELSE ELE CONTINUARIA PROCESSANDO ATÉ CONCLUIR AS POSSIBILIDADES.
// CODIGO RECOMENDADO :

//* 

// checkButton_click: function(e) {
// const li = e.target.parentElement
// const isDone = li.classList.contains('done')

// if (!isDone) {
// li. classList.add('done)
// return
// }
// li classList.remove('done)
// }