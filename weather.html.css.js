<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App with Weather</title>
    <style>
        /* Basic Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            line-height: 1.6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        #app-container {
            width: 80%;
            max-width: 1200px;
            background: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        header {
            background: #0078D7;
            color: white;
            padding: 1rem;
            text-align: center;
        }

        main {
            display: flex;
            flex-direction: column;
        }

        aside {
            width: 25%;
            background: #f4f4f4;
            padding: 1rem;
            border-right: 1px solid #ddd;
        }

        #projects-container h2, #todos-container h2 {
            margin-bottom: 1rem;
        }

        #projects-list {
            list-style: none;
            margin-bottom: 1rem;
        }

        #projects-list li {
            padding: 0.5rem;
            margin-bottom: 0.5rem;
            background: #e2e2e2;
            border-radius: 4px;
            cursor: pointer;
        }

        #projects-list li:hover {
            background: #d0d0d0;
        }

        button {
            display: block;
            width: 100%;
            padding: 0.5rem;
            margin-top: 1rem;
            background: #0078D7;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background: #005FA3;
        }

        #todos-container {
            padding: 1rem;
        }

        #todos-list {
            list-style: none;
        }

        #todos-list li {
            padding: 0.5rem;
            margin-bottom: 0.5rem;
            background: #e2e2e2;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #todos-list li span {
            flex: 1;
        }

        #weather-container {
            padding: 1rem;
            background: #f0f8ff;
            border-top: 1px solid #ddd;
            text-align: center;
        }

        #weather-form {
            margin-bottom: 1rem;
        }

        footer {
            text-align: center;
            padding: 1rem;
            background: #f4f4f4;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div id="app-container">
        <header>
            <h1>Todo List with Weather</h1>
        </header>
        <main>
            <aside id="projects-container">
                <h2>Projects</h2>
                <ul id="projects-list"></ul>
                <button id="add-project-btn">Add Project</button>
            </aside>
            <section id="todos-container">
                <h2 id="current-project-title">Default Project</h2>
                <ul id="todos-list"></ul>
                <button id="add-todo-btn">Add Todo</button>
            </section>
            <section id="weather-container">
                <h2>Check Weather</h2>
                <form id="weather-form">
                    <input type="text" id="location-input" placeholder="Enter location" required>
                    <button type="submit">Get Weather</button>
                </form>
                <div id="weather-result"></div>
            </section>
        </main>
        <footer>
            <p>Todo App &copy; 2024</p>
        </footer>
    </div>
    <script>
        const projects = [{ name: 'Default Project', todos: [] }];
        let currentProjectIndex = 0;

        function renderProjects() {
            const projectsList = document.getElementById('projects-list');
            projectsList.innerHTML = '';
            projects.forEach((project, index) => {
                const li = document.createElement('li');
                li.textContent = project.name;
                li.addEventListener('click', () => {
                    currentProjectIndex = index;
                    renderTodos();
                });
                projectsList.appendChild(li);
            });
        }

        function renderTodos() {
            const todosList = document.getElementById('todos-list');
            const currentProjectTitle = document.getElementById('current-project-title');

            currentProjectTitle.textContent = projects[currentProjectIndex].name;
            todosList.innerHTML = '';
            projects[currentProjectIndex].todos.forEach((todo, index) => {
                const li = document.createElement('li');
                const span = document.createElement('span');
                span.textContent = `${todo.title} - Due: ${todo.dueDate}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    projects[currentProjectIndex].todos.splice(index, 1);
                    renderTodos();
                });

                li.appendChild(span);
                li.appendChild(deleteBtn);
                todosList.appendChild(li);
            });
        }

        document.getElementById('add-project-btn').addEventListener('click', () => {
            const projectName = prompt('Enter project name:');
            if (projectName) {
                projects.push({ name: projectName, todos: [] });
                renderProjects();
            }
        });

        document.getElementById('add-todo-btn').addEventListener('click', () => {
            const title = prompt('Enter todo title:');
            const dueDate = prompt('Enter due date (YYYY-MM-DD):');
            if (title && dueDate) {
                projects[currentProjectIndex].todos.push({ title, dueDate });
                renderTodos();
            }
        });

        async function getWeather(location) {
            const apiKey = 'YOUR_API_KEY'; // Replace with your API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Location not found');

                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                document.getElementById('weather-result').textContent = error.message;
            }
        }

        function displayWeather(data) {
            const weatherContainer = document.getElementById('weather-result');
            weatherContainer.innerHTML = `
                <p><strong>Location:</strong> ${data.name}</p>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            `;
        }

        document.getElementById('weather-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const location = document.getElementById('location-input').value;
            getWeather(location);
        });

        renderProjects();
        renderTodos();
    </script>
</body>
</html>
