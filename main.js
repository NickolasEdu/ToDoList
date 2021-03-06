const Main = {

    tasks: [],
  
    init: function() {
      this.cacheSelectors()
      this.bindEvents()
      this.getStoraged()
      this.buildTasks()
    },
  
    cacheSelectors: function() {
      this.$checkButtons = document.querySelectorAll('.check')
      this.$inputTask = document.querySelector('#inputTask')
      this.$list = document.querySelector('#list')
      this.$removeButtons = document.querySelectorAll('.remove')
    },
  
    bindEvents: function() {
      const self = this
  
      this.$checkButtons.forEach(function(button){
        button.onclick = self.Events.checkButton_click.bind(self)
      })
  
      this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)
  
      this.$removeButtons.forEach(function(button){
        button.onclick = self.Events.removeButton_click.bind(self)
      })
    },
  
    getStoraged: function() {
      const tasks = localStorage.getItem('tasks')
  
      if (tasks) {
        this.tasks = JSON.parse(tasks)
      } else {
        localStorage.setItem('tasks', JSON.stringify([]))
      }
    },
  
    getTaskHtml: function(task, isDone) {
      return `
        <li class="${isDone ? 'done' : ''}" data-task="${task}">          
          <div class="check" ></div>
          <label class="task">
            ${task}
          </label>
          <button class="remove"></button>
        </li>
      `
    },
  
    insertHTML: function(element, htmlString) {
      element.innerHTML += htmlString
  
      this.cacheSelectors()
      this.bindEvents()
    },
  
    buildTasks: function() {
      let html = ''
  
      this.tasks.forEach(item => {
        html += this.getTaskHtml(item.task, item.done)
      })
  
      this.insertHTML(this.$list, html)
    },
  
    Events: {
      checkButton_click: function(e) {
        const li = e.target.parentElement
        const value = li.dataset['task']
        const isDone = li.classList.contains('done')
  
        const newTasksState = this.tasks.map(item => {
          if (item.task === value) {
            item.done = !isDone
          }
  
          return item
        })
  
        localStorage.setItem('tasks', JSON.stringify(newTasksState))
  
        if (!isDone) {
          return li.classList.add('done')       
        }
  
        li.classList.remove('done')
      },
  
      inputTask_keypress: function(e){      
        const key = e.key
        const value = e.target.value
        const isDone = false
  
        if (key === 'Enter') {
          const taskHtml = this.getTaskHtml(value, isDone)
  
          this.insertHTML(this.$list, taskHtml)
  
          e.target.value = ''        
  
          const savedTasks = localStorage.getItem('tasks')
          const savedTasksArr = JSON.parse(savedTasks)        
  
          const arrTasks = [
            { task: value, done: isDone },
            ...savedTasksArr,
          ]
  
          const jsonTasks = JSON.stringify(arrTasks)
  
          this.tasks = arrTasks
          localStorage.setItem('tasks', jsonTasks)
        }
      },
  
      removeButton_click: function(e){
        const li = e.target.parentElement
        const value = li.dataset['task']  
        
        console.log(this.tasks)
  
        const newTasksState = this.tasks.filter(item => {
          console.log(item.task, value)
          return  item.task !== value
        })
  
        localStorage.setItem('tasks', JSON.stringify(newTasksState))
        this.tasks = newTasksState
  
        li.classList.add('removed')
  
        setTimeout(function(){
          li.classList.add('hidden')
        },300)
      }
    }
  
  }
  
  Main.init(

// CONST MAIN ?? COMO O CONTAINER DO HTML, TUDO EST?? DENTRO DELE
// PARA O CODE FUNCIONAR ENT??O, ?? NECESS??RIO CHAMAR O MAIN COMO UMA FUN????O
// MAIN.INIT() - VARIAVEL.FUN????O_INICIAR()

// O INIT EST?? ARMAZENANDO AS FUN????ES, OU SEJA TUDO OQUE FOR ACONTECER DEVE ESTAR DENTRO DO INIT
// O cSELECTORS EST?? BUSCANO AS INFORMA????ES DO HTML, PEGANDO AS CLASSES E PORTANDO PARA  VARIAVEIS DO JS VIA QUERY SELECTOR
//bEVENTS ?? ONDE EST?? ARMAZENADO O ENDERE??O FUNCTIONS, USANDO AS VARIAVEIS TRAZIDAS PELO cSELECTORS

//EVENTS ?? ONDE EST??O AS CONDI????ES DAS FUN????ES
//O CAMINHO USADO PARA CHAMAR ELAS S??O:
//ESSE-OBJ_EVENTS-VARIAVEL OU
//*THIS.EVENTS.CHECKBUTTON-CLICK

//*
//AS VEZES THIS PODE APRESENTAR UM ERRO, NO CONSOLE POR EXEMPLO, ELE TRAS O OBJETO WINDOM
// UMA FORMA SE CONSERTAR ISSO ?? CHAMANDO DIRETAMENTE A VARIAVEL CONST
// MAIN.EVENTS.CHECKBUTTON
// POR??M PARA EVITAR ERROS EM PROJETOS GRANDES, PODE SERA UTIL DECLARAR OUTRA CONST PARA O THIS DENTRO DA FUNCTION ONDE ELE EST?? DANDO ERRO.

//----------------------------------

// BOA PRATICA NO FUNCTION DENTRO DE EVENTS.
// O ! VERIFICA A NEGA????O DO VALOR PROCURADO
// O RETURN FAZ PARAR O PROCESSAMENTO ALI CASO TENHA ENCONTRADO AQUILO QUE PROCURA
// COM ELSE ELE CONTINUARIA PROCESSANDO AT?? CONCLUIR AS POSSIBILIDADES.