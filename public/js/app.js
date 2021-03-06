function storeTask() {
    let description = document.getElementById('taskDescription').value;
    let body = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: description })
    };
    fetch('/tasks', body)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          throw "Error en la llamada Ajax";
        }
      })
      .then(task => {
        document.getElementById('taskDescription').value = '';
        addTask(task);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
  }
  
  function deleteTask() {
    let description = document.getElementById('taskDescription').value;
    let body = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: description })
    };
    fetch('/tasks', body)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          throw "Error en la llamada Ajax";
        }
      })
      .then(task => {
        document.getElementById('taskDescription').value = '';
        deleteTask(task);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
  }

  function addTask(task) {
    let html =
    `
    <div class="card my-3">
      <div class="card-body">
        <p class="card-text">${task.description}</p>
        <form action="/tasks/${task.id}/done" method="POST">
          <a href="javascript:;" onclick="parentNode.submit();" class="card-link">Done</a>
        </form>
      </div>
    </div>
    `;
    let node = document.createRange().createContextualFragment(html);
    document.getElementById('tasksList').prepend(node);
  }