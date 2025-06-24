# MY BLOG MANAGER
## DESCRIPTION:
This project is a simple, client-side Blog Manager application designed to help users view, add, and update blog posts. It offers a straightforward interface for managing blog content directly within the browser, using a local JSON server to simulate a backend API. This setup makes it easy to test and demonstrate front-end interactions without a full-fledged server infrastructure.

## FEATURES:
1. View Blog Posts: See a dynamic list of all available blog posts on the sidebar.
2. Post Details: Click on any post title to display its full content, including the title, author, content, and an associated avatar (if provided).
3. Add New Post: Easily create and submit new blog entries with fields for Blog Heading, Content, Author, and an optional Avatar URL.
4. Edit Existing Post: Update the Title and Content of any selected blog post directly from its detail view.
5. Responsive Design: The application's layout adapts seamlessly to different screen sizes, ensuring usability across various devices.
## TECHNOLOGIES USED:
1. HTML5: Provides the foundational structure and semantic layout of the web page.
2. CSS3: Styles the application, delivering a clean, modern, and responsive user interface.
3. JavaScript (ES6+): Powers all interactive elements and dynamic content management, including:
4. Fetching and displaying data from the JSON server.
5. Handling form submissions for adding new posts.
6. Managing updates to existing posts.
7. Controlling UI visibility (e.g., showing/hiding the edit form).
8. JSON Server: A lightweight, command-line tool used to create a fake REST API quickly, serving as the "backend" for this project.
## HOW TO RUN THIS PROJECT:
To get this Blog Manager up and running on your machine, follow these steps:

1. Project Setup
Save Files: Ensure you have index.html, index.js, style.css, and a db.json file (as provided below) all in the same directory.

Create db.json: In your project's root directory, create a file named db.json and paste the following content into it. This will be your initial blog post data.

## JSON
```bash
{
  "Posts": [
    {
      "id": 1,
      "title": "My First Ever Blog Post",
      "content": "Welcome to my blog!",
      "author": "Amelie",
      "avatar": "https://imgs.search.brave.com/f-qoUm-0ms8P2kds4jKqB7byEwuCtK-AbB7RnC3ScgA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/YWJsZXQtd2hpY2gt/eW91LWNhbi1yZWFk/LWJsb2dfMTEzNC0y/MjYuanBnP3NlbXQ9/YWlzX2l0ZW1zX2Jv/b3N0ZWQmdz03NDA"
    },
    {
      "id": 2,
      "title": "Classic Safari Rally",
      "content": "This is the most amazing event and sports- the Classic Safari Rally",
      "author": "Franfurt",
      "avatar": "https://imgs.search.brave.com/ic8xKaJNqupGkBSvMI2nAc5uUpNXdctVecRNwFwU4BU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHV0aGlsbC51ay9f/bmV4dC9pbWFnZT91/cmw9aHR0cHM6Ly9h/LnN0b3J5Ymxvay5j/b20vZi8zMTQ2NTkv/NTAwMHgzMzMzLzVj/YzdmZGZiMDkvZHNj/Xzc4Mzkud2VicCZ3/PTM4NDAmcT0xMDA"
    },
    {
      "id": 3,
      "title": "chocolate cake",
      "content": "my very first recipe",
      "author": "ash parker",
      "avatar":"https://imgs.search.brave.com/d2vrA-8X9T6hoXNKZBY64qxlagpThNYbdDYZJXB8sYk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaW1tZWRpYXRl/LmNvLnVrL3Byb2R1/Y3Rpb24vdm9sYXRp/bGUvc2l0ZXMvMzAv/MjAyMC8wOC9yZWNp/cGUtaW1hZ2UtbGVn/YWN5LWlkLTEwNDM0/NTFfMTEtNDcxMzk1/OS5qcGc_cXVhbGl0/eT05MCZyZXNpemU9/NDQwLDQwMA"
    }
  ]
}
```
2. Install JSON Server
Open your terminal or command prompt.

Install json-server globally using npm (Node Package Manager). If you don't have Node.js and npm installed, you'll need to do that first.

Bash

npm install -g json-server
3. Start the JSON Server
Navigate to your project's root directory in the terminal (where db.json is located).

Run the following command to start the JSON server on port 3000:

Bash

json-server --watch db.json --port 3000
You should see output indicating that your db.json file is being served, typically at http://localhost:3000/Posts. Your index.js file is configured to fetch data from this exact endpoint.

4. Open the Application
- Simply open the index.html file in your preferred web browser.
- The application will load, and you'll see your blog posts displayed, fetched directly from the running json-server.
## MY CODE STRUCTURE:
A. index.html: The foundational HTML document that structures the entire application. It defines the main layout, including the header, sections for post lists, post details, the "Add New Post" form, and the "Update Post" form.
B. style.css: Contains all the styling rules for the application. It covers general resets, defines the layout for responsiveness, styles various UI elements like buttons and forms, and includes utility classes.
C. index.js: The core JavaScript file responsible for all dynamic functionalities. It manages:
D. Data Fetching: Communicates with the json-server to retrieve and update blog post data.
E. DOM Manipulation: Dynamically creates and updates HTML elements to display posts and their details.
F. Event Handling: Listens for user interactions such as clicking on posts, submitting forms, and handling edits.
G. Application Logic: Contains the functions (displayPosts, handlePostClick, addNewPostListener, setUpEditForm) that control the flow and behavior of the blog manager.
H. db.json: (User-provided, not part of the codebase but essential for running) This file acts as the "database" for json-server, storing the blog post data in a JSON format.
## CONTRIBUTIONS:
Feel free to explore the code, suggest improvements, or submit pull requests. Any contributions that enhance functionality or user experience are welcome!

## LICENSE:
This project is open-source and available under the MIT License.

